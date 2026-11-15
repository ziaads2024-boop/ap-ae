import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHero } from "@/components/layout/PageHero";
import { GuideCta } from "@/components/guide/GuideBlocks";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData } from "@/components/seo/StructuredData";
import { useRealCounts } from "@/hooks/useRealCounts";
import { Calendar, User, ArrowRight, Clock, MapPin, Search, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { liveImage } from '@/lib/liveImage';
import { displayTitle } from '@/lib/displayTitle';

interface BlogPageProps {
  posts?: any[];
  featuredPosts?: any[];
  popularStates?: { name: string; slug: string }[];
  popularTreatments?: { name: string; slug: string }[];
}

const PAGE_SIZE = 10;

const BlogPage = ({
  posts: postsProp = [],
  featuredPosts: featuredPostsProp = [],
  popularStates: popularStatesProp = [],
  popularTreatments: popularTreatmentsProp = [],
}: BlogPageProps) => {
  const { data: counts } = useRealCounts();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false });
      return data || [];
    },
    initialData: postsProp,
  });

  const { data: featuredPosts } = useQuery({
    queryKey: ["featured-posts"],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("is_featured", true)
        .order("published_at", { ascending: false })
        .limit(3);
      return data || [];
    },
    initialData: featuredPostsProp,
  });

  const { data: popularStates } = useQuery({
    queryKey: ["popular-states-blog"],
    queryFn: async () => {
      const { data } = await supabase
        .from("states")
        .select("name, slug")
        .eq("is_active", true)
        .order("display_order")
        .limit(5);
      return data || [];
    },
    initialData: popularStatesProp,
  });

  const { data: popularTreatments } = useQuery({
    queryKey: ["popular-treatments-blog"],
    queryFn: async () => {
      const { data } = await supabase
        .from("treatments")
        .select("name, slug")
        .eq("is_active", true)
        .order("display_order")
        .limit(8);
      return data || [];
    },
    initialData: popularTreatmentsProp,
  });

  // Category filters come from the published posts, so every filter returns results
  const categories = useMemo(
    () => Array.from(new Set((posts || []).map((p: any) => p.category).filter(Boolean))) as string[],
    [posts]
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const filteredPosts = (posts || []).filter((p: any) => !activeCategory || p.category === activeCategory);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Articles" },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="Dental Health Blog - Tips, Advice & News"
        description="Articles on dental care in the UAE: treatment costs in AED, insurance, oral hygiene and how to choose a dentist in Dubai."
        canonical="/blog/"
        keywords={['dental health blog', 'oral hygiene tips', 'dental advice', 'dentist blog', 'dental care tips']}
      />
      <StructuredData
        data={{
          type: 'breadcrumb',
          items: breadcrumbs.map(b => ({ name: b.label, url: b.href })),
        }}
      />

      <PageHero
        badge="Articles"
        title="Dental health"
        highlight="guides & articles"
        description="Articles on dental care, treatment costs, oral hygiene and finding a dentist in Dubai and the UAE."
        breadcrumbs={breadcrumbs}
        tone="sand"
      />

      {/* Featured Posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-10">
          <h2 className="heading-section">Featured</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}/`}
                className={`block-card group flex flex-col overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden bg-tone-sand ${i === 0 ? "aspect-[16/9] md:aspect-auto md:min-h-[18rem] md:flex-1" : "aspect-[16/9]"}`}>
                  {liveImage(post.featured_image_url) && (
                    <img
                      src={liveImage(post.featured_image_url)!}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{post.category || "Dental Health"}</p>
                  <h3 className={`mt-1 font-semibold leading-snug text-ink group-hover:underline ${i === 0 ? "text-xl md:text-2xl" : "text-lg"}`}>
                    {displayTitle(post.title)}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
                    {post.author_name && (
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.author_name}
                      </span>
                    )}
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {format(new Date(post.published_at), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Posts Grid */}
          <div className="min-w-0 lg:col-span-2">
            <h2 className="heading-section">Latest articles</h2>

            {categories.length > 1 && (
              <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
                <button type="button" className="chip" aria-pressed={activeCategory === null} onClick={() => { setActiveCategory(null); setVisible(PAGE_SIZE); }}>
                  All articles
                </button>
                {categories.map((cat) => (
                  <button key={cat} type="button" className="chip" aria-pressed={activeCategory === cat} onClick={() => { setActiveCategory(cat); setVisible(PAGE_SIZE); }}>
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6">
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="block-card-static overflow-hidden">
                    <Skeleton className="h-48 rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPosts.slice(0, visible).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}/`}
                    className="block-card group flex flex-col overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden bg-tone-sand">
                      {liveImage(post.featured_image_url) ? (
                        <img
                          src={liveImage(post.featured_image_url)!}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center">
                          <BookOpen className="h-10 w-10 text-ink/30" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
                        {post.category && (
                          <span className="font-semibold uppercase tracking-wider">{post.category}</span>
                        )}
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {format(new Date(post.published_at), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                      <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-ink group-hover:underline">
                        {displayTitle(post.title)}
                      </h3>
                      <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-ink">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="block-card-static py-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-ink/30" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold text-ink">No posts yet</h3>
                <p className="text-zinc-600">
                  We're working on bringing you great dental content. Check back soon!
                </p>
              </div>
            )}

            {filteredPosts.length > visible && (
              <div className="mt-8 text-center">
                <button type="button" className="btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Load more articles
                </button>
              </div>
            )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.25rem] bg-tone-lemon p-6">
              <Search className="h-6 w-6 text-ink" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-ink">Find a dentist</h2>
              <p className="mt-1 text-sm text-ink/80">
                Compare {counts?.clinics ? `${counts.clinics.toLocaleString()} ` : ''}listed dental clinics and request an appointment.
              </p>
              <Link prefetch={false} href="/find-clinics/" className="btn-ink mt-4 w-full">
                Search now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="block-card-static p-6">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Find by location
              </h2>
              <ul className="mt-3 space-y-1">
                {popularStates?.map((state) => (
                  <li key={state.slug}>
                    <Link
                      href={`/${state.slug}/`}
                      className="flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-medium text-ink hover:bg-paper"
                    >
                      {state.name}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link prefetch={false} href="/find-clinics/" className="btn-ghost mt-3 w-full">
                View all locations
              </Link>
            </div>

            {popularTreatments && popularTreatments.length > 0 && (
              <div className="block-card-static p-6">
                <h2 className="font-semibold text-ink">Popular treatments</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {popularTreatments.map((treatment) => (
                    <Link key={treatment.slug} href={`/services/${treatment.slug}/`} className="chip">
                      {treatment.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="block-card-static p-6">
              <h2 className="text-lg font-semibold text-ink">Stay updated</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Get the latest dental health tips and news delivered to your inbox.
              </p>
              <Link prefetch={false} href="/contact/" className="btn-ghost mt-4 w-full">Subscribe</Link>
            </div>
          </aside>
        </div>
      </section>

      <GuideCta
        title="Find your dentist"
        text="Browse listed dental clinics in Dubai by area, treatment and insurance."
        href="/find-clinics/"
        cta="Find a dentist"
      />
    </PageLayout>
  );
};

export default BlogPage;
