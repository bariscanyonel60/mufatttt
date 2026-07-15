import { unstable_noStore as noStore } from "next/cache";
import { getContent } from "@/lib/admin/store";
import type { ContentStore } from "@/lib/admin/types";

/** Canlı içerik — MySQL (DB_*) veya data/content.json */
export async function liveContent(): Promise<ContentStore> {
  noStore();
  return getContent();
}

export async function liveSite() {
  return (await liveContent()).site;
}

export async function liveServices() {
  return (await liveContent()).services;
}

export async function liveProjects() {
  return (await liveContent()).projects;
}

export async function liveProjectFilters() {
  return (await liveContent()).projectFilters;
}

export async function livePosts() {
  return (await liveContent()).posts;
}

export async function liveJobs() {
  return (await liveContent()).jobs;
}

export async function liveTestimonials() {
  return (await liveContent()).testimonials;
}

export async function liveReferences() {
  return (await liveContent()).references;
}

export async function liveProcessSteps() {
  return (await liveContent()).processSteps;
}

export async function liveValues() {
  return (await liveContent()).values;
}

export async function liveMilestones() {
  return (await liveContent()).milestones;
}

export async function liveTeam() {
  return (await liveContent()).team;
}

export async function liveSeo() {
  return (await liveContent()).seo;
}
