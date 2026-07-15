/** Client-safe Cloudinary delivery URLs (no API secrets). */

const CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "osgt7obm";

const HERO_PUBLIC_ID = "mufat/hero/hero-start";

/**
 * Plain delivery keeps Accept-Ranges for scroll scrubbing.
 * Avoid q_auto here — it can disable byte-range seeking.
 */
export const HERO_VIDEO_SRC = `https://res.cloudinary.com/${CLOUD}/video/upload/${HERO_PUBLIC_ID}.mp4`;

/** First-frame poster while video buffers. */
export const HERO_VIDEO_POSTER = `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_1280,q_auto,f_jpg/${HERO_PUBLIC_ID}.jpg`;
