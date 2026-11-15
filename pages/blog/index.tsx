import { GetStaticProps } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import BlogPageComponent from '@/pages/BlogPage';
import retiredPosts from '@/lib/retiredPosts.json';

const BASE_URL = 'https://www.appointpanda.ae';

interface BlogIndexPageProps {
  posts: any[];
  featuredPosts: any[];
  popularStates: { name: string; slug: string }[];
  popularTreatments: { name: string; slug: string }[];
}

export default function BlogIndexPage(props: BlogIndexPageProps) {
  return (
    <>
      {/* Title, description, canonical and Open Graph come from SEOHead in BlogPage */}
      <BlogPageComponent {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async () => {
  const supabase = createServerSupabaseAdmin();

  if (!supabase) {
    return {
      props: {
        posts: [],
        featuredPosts: [],
        popularStates: [],
        popularTreatments: [],
      },
      revalidate: 86400,
    };
  }

  const [postsResult, featuredResult, statesResult, treatmentsResult] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, tags, author_name, featured_image_url, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false }),
    (supabase as any)
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, tags, author_name, featured_image_url, published_at, created_at')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3),
    supabase
      .from('states')
      .select('name, slug')
      .eq('is_active', true)
      .order('display_order')
      .limit(5),
    supabase
      .from('treatments')
      .select('name, slug')
      .eq('is_active', true)
      .order('display_order')
      .limit(8),
  ]);

  return {
    props: {
      posts: (postsResult.data || []).filter((p: any) => !(p.slug in retiredPosts)),
      featuredPosts: (featuredResult.data || []).filter((p: any) => !(p.slug in retiredPosts)),
      popularStates: statesResult.data || [],
      popularTreatments: treatmentsResult.data || [],
    },
    revalidate: 86400,
  };
};
