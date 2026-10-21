import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LICENSE_URLS, type SiteImage } from '@/content/images';

/**
 * A photo with its licence credit. CC BY and CC BY-SA require attribution
 * wherever the image is shown, so the credit is always rendered with it.
 */
export function CreditedImage({
  image, className, imgClassName, sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, showCaption = false, creditPosition = 'overlay',
}: {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  creditPosition?: 'overlay' | 'below';
}) {
  const credit = (
    <>
      {showCaption && <span className="font-medium">{image.caption}. </span>}
      Photo: {image.credit.author},{' '}
      <a href={LICENSE_URLS[image.credit.license]} target="_blank" rel="noopener noreferrer license" className="underline">
        {image.credit.license}
      </a>
      , via{' '}
      <a href={image.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
        {image.credit.sourceName}
      </a>
    </>
  );

  return (
    <figure className={cn('relative overflow-hidden', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
      {creditPosition === 'overlay' ? (
        <figcaption className="absolute bottom-2 right-2 max-w-[85%] rounded-full bg-black/55 px-2.5 py-1 text-[10px] leading-tight text-white/90 backdrop-blur-sm [&_a]:text-white">
          {credit}
        </figcaption>
      ) : (
        <figcaption className="mt-2 text-xs leading-snug text-zinc-500">{credit}</figcaption>
      )}
    </figure>
  );
}
