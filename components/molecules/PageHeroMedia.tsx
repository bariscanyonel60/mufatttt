"use client";

import Image from "next/image";
import Reveal from "@/components/atoms/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  /** Kept for API compatibility; unused when showing full uncropped image. */
  imagePosition?: string;
};

/**
 * Stacked entrance: copy first, then full uncropped media.
 */
export default function PageHeroMedia({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: Props) {
  return (
    <section className="bg-ink pt-36 md:pt-48">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow !text-gold justify-center before:!hidden">
              <span className="mr-3 inline-block h-px w-8 bg-gold" aria-hidden />
              {eyebrow}
              <span className="ml-3 inline-block h-px w-8 bg-gold" aria-hidden />
            </span>
            <h1 className="h-display mt-7 text-4xl text-white sm:text-5xl md:text-6xl">{title}</h1>
            {lead ? (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
                {lead}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-12 overflow-hidden rounded-feature border border-white/10 bg-[#121212] md:mt-14">
            <Image
              src={image}
              alt={imageAlt}
              width={1600}
              height={1067}
              priority
              sizes="100vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>

      <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent md:mt-16" aria-hidden />
    </section>
  );
}
