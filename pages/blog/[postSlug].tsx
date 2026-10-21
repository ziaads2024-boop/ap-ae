import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import BlogPostPageComponent from '@/pages/BlogPostPage';
import { liveImage } from '@/lib/liveImage';
import { displayTitle } from '@/lib/displayTitle';

const BASE_URL = 'https://www.appointpanda.ae';

const BlogPostPageWithSEO = ({ postSlug, postData, seoData, authorData }: {
    postSlug: string;
    postData: any;
    seoData: { title: string; description: string; canonical: string; ogImage?: string | null; author?: string; publishedAt?: string | null; modifiedAt?: string | null };
    authorData?: { name: string; slug: string; bio?: string; avatar_url?: string } | null;
}) => {
    // Title, description, canonical and Open Graph tags come from SEOHead in the
    // page component; this wrapper adds the Article and breadcrumb schema once.
    const headline = displayTitle(postData?.title) || seoData.title;
    const image = liveImage(seoData.ogImage) || `${BASE_URL}/og-image.png`;
    const articleSchema: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "description": seoData.description,
        "image": image,
        "author": authorData
            ? { "@type": "Person", "name": authorData.name, ...(authorData.bio ? { "description": authorData.bio } : {}) }
            : { "@type": "Organization", "name": "AppointPanda", "url": BASE_URL },
        "publisher": {
            "@type": "Organization",
            "name": "AppointPanda",
            "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 512, "height": 512 },
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}${seoData.canonical}` },
        "articleSection": postData?.category || 'Dental Health',
    };
    if (seoData.publishedAt) articleSchema.datePublished = seoData.publishedAt;
    if (seoData.modifiedAt || seoData.publishedAt) articleSchema.dateModified = seoData.modifiedAt || seoData.publishedAt;

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
                            { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog/` },
                            { "@type": "ListItem", position: 3, name: headline || postSlug, item: `${BASE_URL}${seoData.canonical}` },
                        ]
                    }) }}
                />
            </Head>
            <BlogPostPageComponent
                postSlugProp={postSlug}
                postDataProp={postData}
                seoDataProp={seoData}
            />
        </>
    );
};

export default BlogPostPageWithSEO;

// Generate static paths - use fallback blocking to avoid build timeouts
export const getStaticPaths: GetStaticPaths = async () => {
    try {
const supabase = createServerSupabaseAdmin();
        
        if (!supabase) {
            return { paths: [], fallback: 'blocking' };
        }
        
        const { data: posts } = await supabase
            .from('blog_posts')
            .select('slug');
        
        const paths = (posts || []).map((post) => ({
            params: { postSlug: post.slug }
        }));
        
        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Error generating blog paths:', error);
        return { paths: [], fallback: 'blocking' };
    }
};

// Convert to Static Site Generation
export const getStaticProps: GetStaticProps = async (ctx) => {
    const supabase = createServerSupabaseAdmin();
    const postSlug = ctx.params?.postSlug as string;

    if (!postSlug) {
        return { notFound: true };
    }

    if (!supabase) {
        return {
            props: {
                postSlug,
                postData: null,
                seoData: {
                    title: 'Blog Post',
                    description: 'Read dental health articles from AppointPanda',
                    canonical: `/blog/${postSlug}/`,
                },
            },
            revalidate: 60,
        };
    }

    // Direct query instead of React Query for faster build
    const postData = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", postSlug)
        .eq("status", "published")
        .maybeSingle()
        .then(r => r.data);
    
    if (!postData) {
        return { notFound: true };
    }

    const metaTitle = postData.meta_title || postData.title || 'Blog Post';
    const metaDescription = postData.meta_description || postData.excerpt || postData.content?.slice(0, 160) || 'Read our blog post';
    const canonical = `/blog/${postSlug}/`;
    const ogImage = postData.featured_image_url || null;

    // Fetch author data if author_id exists
    let authorData = null;
    if (postData.author_id) {
        authorData = await supabase
            .from('blog_authors')
            .select('name, slug, bio, avatar_url')
            .eq('id', postData.author_id)
            .eq('is_active', true)
            .maybeSingle()
            .then(r => r.data);
        
        // Merge author data into postData for the component
        if (authorData) {
            (postData as any).author_name = authorData.name;
            (postData as any).author_bio = authorData.bio;
            (postData as any).author_avatar_url = authorData.avatar_url;
        }
    }

    return { 
        props: {
            postSlug,
            postData,
            seoData: {
                title: metaTitle,
                description: metaDescription,
                canonical,
                ogImage,
                author: postData.author_name || 'AppointPanda Team',
                publishedAt: postData.published_at || null,
                modifiedAt: postData.updated_at || null,
            },
            authorData,
        },
        revalidate: 600
    };
};
