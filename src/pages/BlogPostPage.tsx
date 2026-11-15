import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { GuideCta } from "@/components/guide/GuideBlocks";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/seo/SEOHead";
import { getContentBody, calculateReadingTime } from "@/lib/blogContent";
import { sanitizeCmsHtml } from "@/lib/security/sanitizeCmsHtml";
import { BlogDentistList } from "@/components/blog/BlogDentistList";
import { BlogFAQList } from "@/components/blog/BlogFAQList";
import {
  Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin,
  MapPin, Search, Phone, ArrowRight, BookOpen
} from "lucide-react";
import { format } from "date-fns";
import { liveImage, stripBlockedImages } from '@/lib/liveImage';
import { displayTitle } from '@/lib/displayTitle';
import { matchService } from '@/lib/searchUrl';
import { urls } from '@/content';

type BlogContentBlock = {
  id: string;
  type: "heading" | "image" | "dentist-list" | "faq-list";
  headingLevel?: "h1" | "h2" | "h3";
  headingText?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  clinicIds?: string[];
  clinicSlugs?: string[];
  locationLabel?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

const BlogPostPage = ({ postSlugProp, postDataProp, seoDataProp, dehydratedStateProp }: {
    postSlugProp?: string;
    postDataProp?: any;
    seoDataProp?: { title: string; description: string; canonical: string };
    dehydratedStateProp?: any;
}) => {
  const routerQuery = useRouter().query;
  const slug = postSlugProp || routerQuery.postSlug as string || "";

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      return data;
    },
    initialData: postDataProp || undefined,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.category],
    queryFn: async () => {
      if (!post?.category) return [];
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("category", post.category)
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(3);
      return data || [];
    },
    enabled: !!post?.category,
  });

  // Fetch popular states for sidebar
  const { data: popularStates } = useQuery({
    queryKey: ["popular-states-sidebar"],
    queryFn: async () => {
      const { data } = await supabase
        .from("states")
        .select("name, slug")
        .eq("is_active", true)
        .order("display_order")
        .limit(5);
      return data || [];
    },
  });

  // Fetch popular treatments for sidebar
  const { data: popularTreatments } = useQuery({
    queryKey: ["popular-treatments-sidebar"],
    queryFn: async () => {
      const { data } = await supabase
        .from("treatments")
        .select("name, slug")
        .eq("is_active", true)
        .order("display_order")
        .limit(6);
      return data || [];
    },
  });

  // Signal prerender when data is ready
  const isDataReady = !isLoading && !!post;

  if (isLoading) {
    return (
      <PageLayout>
        <SEOHead
          title="Loading..."
          description="Loading blog post..."
        />
        <div className="mx-auto max-w-6xl px-5 py-8">
          <Skeleton className="h-96 rounded-3xl mb-8" />
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <section className="mx-auto max-w-6xl px-5">
          <div className="text-center py-20">
            <h1 className="heading-section mb-4">Post not found</h1>
            <p className="text-zinc-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link prefetch={false} href="/blog/" className="btn-ink">Back to articles</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: displayTitle(post.title) },
  ];

  const extractBlocksFromContent = (content: unknown): BlogContentBlock[] | null => {
    if (!content) return null;
    if (Array.isArray(content)) return content as BlogContentBlock[];
    if (typeof content === "object" && content !== null) {
      const obj = content as any;
      if (Array.isArray(obj.blocks)) return obj.blocks as BlogContentBlock[];
      if (obj.type === "json" && Array.isArray(obj.body)) return obj.body as BlogContentBlock[];
    }
    return null;
  };

  const contentBlocks = extractBlocksFromContent(post.content);
  const contentStringForReading = contentBlocks
    ? contentBlocks
      .map((b) => [b.headingText, b.content, b.imageAlt].filter(Boolean).join(" "))
      .join("\n")
    : getContentBody(post.content);
  const readingTime = calculateReadingTime(contentStringForReading);
  const featuredImage = liveImage(post.featured_image_url);
  // The treatment guide this post is about, for "read next" links
  const guide = matchService([post.title, ...(post.tags || [])].join(' '));

  // Check if content contains HTML tags (from n8n) or markdown
  const isHtmlContent = (content: string) => {
    return /<[a-z][\s\S]*>/i.test(content) && !content.includes('<!-- DENTIST_LIST:') && !content.includes('<!-- FAQ_LIST:');
  };

  // Parse special block markers from content
  const parseSpecialBlocks = (content: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    const lines = content.split('\n');
    let currentTextBlock: string[] = [];
    let elementKey = 0;

    const flushTextBlock = () => {
      if (currentTextBlock.length > 0) {
        const textContent = currentTextBlock.join('\n');
        if (textContent.trim()) {
          elements.push(
            <div key={`text-${elementKey++}`}>
              {renderTextContent(textContent)}
            </div>
          );
        }
        currentTextBlock = [];
      }
    };

    for (const line of lines) {
      // Check for dentist list marker
      const dentistMatch = line.match(/<!-- DENTIST_LIST:(.+?) -->/);
      if (dentistMatch) {
        flushTextBlock();
        try {
          const data = JSON.parse(dentistMatch[1]);
          elements.push(
            <BlogDentistList
              key={`dentist-${elementKey++}`}
              clinicIds={data.clinicIds || []}
              locationLabel={data.locationLabel}
            />
          );
        } catch (e) {
          console.error('Failed to parse dentist list data:', e);
        }
        continue;
      }

      // Check for FAQ list marker
      const faqMatch = line.match(/<!-- FAQ_LIST:(.+?) -->/);
      if (faqMatch) {
        flushTextBlock();
        try {
          const data = JSON.parse(faqMatch[1]);
          elements.push(
            <BlogFAQList
              key={`faq-${elementKey++}`}
              faqs={data.faqs || []}
            />
          );
        } catch (e) {
          console.error('Failed to parse FAQ list data:', e);
        }
        continue;
      }

      currentTextBlock.push(line);
    }

    flushTextBlock();
    return elements;
  };

  // Render text content (markdown-like format with link support)
  const renderTextContent = (content: string): React.ReactNode[] => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h2 key={i}>{renderInlineContent(line.slice(2))}</h2>;
        } else if (line.startsWith('## ')) {
          return <h2 key={i}>{renderInlineContent(line.slice(3))}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={i}>{renderInlineContent(line.slice(4))}</h3>;
        } else if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
          if (match) {
            return (
              <li key={i} className="ml-6 list-disc">
                <strong>{match[1]}</strong>
                {match[2] && <span>: {renderInlineContent(match[2])}</span>}
              </li>
            );
          }
        } else if (line.startsWith('- ')) {
          return <li key={i} className="ml-6 list-disc">{renderInlineContent(line.slice(2))}</li>;
        } else if (line.match(/^\d+\.\s/)) {
          return <li key={i} className="ml-6 list-decimal">{renderInlineContent(line.replace(/^\d+\.\s/, ''))}</li>;
        } else if (line.match(/^!\[.*?\]\(.*?\)$/)) {
          // Image markdown: ![alt](url)
          const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch && !liveImage(imgMatch[2])) return null;
          if (imgMatch) {
            return (
              <figure key={i} className="my-6">
                <img
                  src={imgMatch[2]}
                  alt={imgMatch[1]}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
                {imgMatch[1] && (
                  <figcaption className="mt-2 text-center text-sm text-zinc-600">
                    {imgMatch[1]}
                  </figcaption>
                )}
              </figure>
            );
          }
        } else if (line.trim() === '') {
          return null;
        } else {
          return <p key={i}>{renderInlineContent(line)}</p>;
        }
        return <p key={i}>{line}</p>;
      });
  };

  // Render inline content with links and bold text
  const renderInlineContent = (text: string): React.ReactNode => {
    // Parse markdown links [text](url) and bold **text**
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[2] && match[3]) {
        // It's a link [text](url)
        const linkUrl = match[3];
        const isExternal = linkUrl.startsWith('http');
        parts.push(
          isExternal ? (
            <a
              key={`link-${match.index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {match[2]}
            </a>
          ) : (
            <Link
              key={`link-${match.index}`}
              href={linkUrl}
            >
              {match[2]}
            </Link>
          )
        );
      } else if (match[4]) {
        // It's bold text **text**
        parts.push(<strong key={`bold-${match.index}`}>{match[4]}</strong>);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Main render content function
  const renderBlocks = (blocks: BlogContentBlock[]) => {
    return blocks.map((b, i) => {
      if (b.type === "dentist-list") {
        return (
          <BlogDentistList
            key={b.id || `dentist-${i}`}
            clinicIds={b.clinicIds || []}
            clinicSlugs={b.clinicSlugs || []}
            locationLabel={b.locationLabel}
            headingText={b.headingText}
          />
        );
      }

      if (b.type === "faq-list") {
        return <BlogFAQList key={b.id || `faq-${i}`} faqs={b.faqs || []} headingText={b.headingText} />;
      }

      if (b.type === "image" && liveImage(b.imageUrl)) {
        return (
          <figure key={b.id || `img-${i}`} className="my-6 not-prose">
            <img
              src={b.imageUrl}
              alt={b.imageAlt || "Blog image"}
              className="w-full rounded-xl"
              loading="lazy"
            />
            {b.imageAlt && (
              <figcaption className="mt-2 text-center text-sm text-zinc-600">
                {b.imageAlt}
              </figcaption>
            )}
          </figure>
        );
      }

      if (b.type === "heading") {
        // Never use h1 for content headings - only h2 and h3 (main title is already h1)
        const HTag = (b.headingLevel === "h3" ? "h3" : "h2") as "h2" | "h3";

        return (
          <div key={b.id || `heading-${i}`}>
            {b.headingText ? <HTag>{renderInlineContent(b.headingText)}</HTag> : null}
            {b.content ? <div>{renderTextContent(b.content)}</div> : null}
          </div>
        );
      }

      return null;
    });
  };

  const renderContent = (rawContent: unknown) => {
    // Prefer structured blocks if present (prevents raw JSON from rendering as text)
    const blocks = extractBlocksFromContent(rawContent);
    if (blocks?.length) {
      return renderBlocks(blocks);
    }

    const content = getContentBody(rawContent);

    // If content contains HTML tags (and no special markers), render as HTML directly
    if (isHtmlContent(content)) {
      // Replace all H1 tags with H2 tags to avoid duplicate H1s (main title is already H1)
      const contentWithoutH1 = stripBlockedImages(sanitizeCmsHtml(
        content.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>')
      ));
      return (
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: contentWithoutH1 }}
        />
      );
    }

    // Parse content with special block markers
    return parseSpecialBlocks(content);
  };

  return (
    <PageLayout>
      <SEOHead
        title={seoDataProp?.title || post.seo_title || post.title}
        description={seoDataProp?.description || post.seo_description || post.excerpt || `Read "${post.title}" on AppointPanda's dental health blog.`}
        canonical={seoDataProp?.canonical || `/blog/${post.slug}/`}
        ogType="article"
        ogImage={featuredImage || undefined}
        author={post.author_name || 'AppointPanda Team'}
        publishedAt={post.published_at || undefined}
        modifiedAt={post.updated_at || undefined}
        keywords={post.tags || ['dental health', 'oral care']}
      />
      {/* Article and breadcrumb schema are rendered once by pages/blog/[postSlug].tsx */}

      <div className="mx-auto max-w-6xl px-5 pb-6 pt-8 lg:pt-12">
        {/* Breadcrumb: the current title is truncated so it never wraps to two lines on phones */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex min-w-0 items-center gap-1 text-xs font-medium text-zinc-600">
            {breadcrumbs.map((b, i) => (
              <li key={`${b.label}-${i}`} className={i === breadcrumbs.length - 1 ? 'flex min-w-0 items-center gap-1' : 'flex shrink-0 items-center gap-1'}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {b.href
                  ? <Link prefetch={false} href={b.href} className="inline-flex min-h-6 items-center hover:text-ink hover:underline">{b.label}</Link>
                  : <span aria-current="page" className="truncate text-ink">{b.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Article */}
          <article className="min-w-0 lg:col-span-2">
            <header>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {post.category && <span className="chip-label">{post.category}</span>}
                <span className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {readingTime} min read
                </span>
              </div>

              <h1 className="display text-[clamp(2.1rem,5vw,3.5rem)] text-ink">
                {displayTitle(post.title)}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-black/10 pb-6">
                <div className="flex min-w-0 items-center gap-3">
                  {post.author_avatar_url ? (
                    <img
                      src={post.author_avatar_url}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-tone-sky" aria-hidden="true">
                      <User className="h-5 w-5 text-ink" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{post.author_name || "AppointPanda Team"}</p>
                    {/* Job title only: no credential line, which could imply a clinical review we have not documented */}
                    {post.author_title && (
                      <p className="text-sm text-zinc-600">{post.author_title}</p>
                    )}
                    {post.author_bio && (
                      <p className="line-clamp-1 text-xs text-zinc-600">{post.author_bio}</p>
                    )}
                  </div>
                </div>
                {post.published_at && (
                  <p className="flex items-center gap-2 text-sm text-zinc-600 sm:ml-auto">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.published_at}>{format(new Date(post.published_at), "MMMM d, yyyy")}</time>
                  </p>
                )}
              </div>
            </header>

            {featuredImage && (
              <div className="mt-8 overflow-hidden rounded-[1.25rem] bg-white">
                <img
                  src={featuredImage}
                  alt={post.title}
                  className="aspect-video h-full w-full object-cover"
                />
              </div>
            )}

            <div className="blog-content mt-8">
              {post.content ? (
                renderContent(post.content)
              ) : (
                <p className="text-zinc-600">No content available.</p>
              )}
            </div>

            {guide && (
              <div className="mt-10 rounded-[1.25rem] bg-tone-sky p-6 text-ink">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/80">Treatment guide</p>
                <p className="mt-1 text-lg font-semibold">{guide.name}: cost, steps and what to ask</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{guide.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link prefetch={false} href={urls.service(guide.slug)} className="btn-ink">Read the guide</Link>
                  <Link prefetch={false} href={`/find-clinics/?specialty=${guide.slug}`} className="btn-ghost">Find clinics in Dubai</Link>
                </div>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-black/10 pt-6">
                <span className="mr-1 text-sm font-medium text-zinc-600">Tags:</span>
                {post.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm text-ink">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* General references */}
            <div className="block-card-static mt-8 p-5">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Sources &amp; references
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-700">
                <li>Dubai Health Authority (DHA). <em>Dental Health Guidelines</em>. Available at: dha.gov.ae</li>
                <li>World Health Organization (WHO). <em>Oral Health</em>. Available at: who.int</li>
                <li>American Dental Association (ADA). <em>Clinical Recommendations</em>. Available at: ada.org</li>
              </ol>
              <p className="mt-3 border-t border-black/10 pt-3 text-[13px] text-zinc-600">
                Last updated: {post.updated_at ? new Date(post.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}.{' '}
                <Link prefetch={false} href="/editorial-policy/" className="underline">How we write our articles</Link>
              </p>
            </div>

            {/* Share */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share this article
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Share on Facebook"
                  className="grid size-11 place-items-center rounded-full border border-black/15 bg-white text-ink hover:border-ink"
                  onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Share on X (Twitter)"
                  className="grid size-11 place-items-center rounded-full border border-black/15 bg-white text-ink hover:border-ink"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Share on LinkedIn"
                  className="grid size-11 place-items-center rounded-full border border-black/15 bg-white text-ink hover:border-ink"
                  onClick={() => window.open(`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <Link prefetch={false} href="/blog/" className="btn-ghost mt-8">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to articles
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.25rem] bg-tone-lemon p-6">
              <Search className="h-6 w-6 text-ink" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-ink">Find a dentist</h2>
              <p className="mt-1 text-sm text-ink/80">
                Looking for a dentist? Compare listed clinics in Dubai and request an appointment.
              </p>
              <Link prefetch={false} href="/find-clinics/" className="btn-ink mt-4 w-full">
                Browse dentists <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {popularStates && popularStates.length > 0 && (
              <div className="block-card-static p-6">
                <h2 className="flex items-center gap-2 font-semibold text-ink">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> Browse by location
                </h2>
                <ul className="mt-3 space-y-1">
                  {popularStates.map((state) => (
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
              </div>
            )}

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
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <Phone className="h-4 w-4" aria-hidden="true" /> Need help?
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Our team can help you find the right dentist for your needs.
              </p>
              <Link prefetch={false} href="/contact/" className="btn-ghost mt-4 w-full">Contact us</Link>
            </div>
          </aside>
        </div>
      </div>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <h2 className="heading-section">Related articles</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}/`}
                className="block-card group overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden bg-tone-sand">
                  {liveImage(relatedPost.featured_image_url) && (
                    <img
                      src={liveImage(relatedPost.featured_image_url)!}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  {relatedPost.category && <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{relatedPost.category}</p>}
                  <h3 className="mt-1 line-clamp-2 font-semibold text-ink group-hover:underline">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <GuideCta
        title="Find your dentist"
        text="Browse listed dental clinics in Dubai by area, treatment and insurance."
        href="/find-clinics/"
        cta="Find a dentist"
      />
    </PageLayout>
  );
};

export default BlogPostPage;
