import { unstable_noStore as noStore } from "next/cache";
import { getContent } from "@/lib/admin/store";
import type { ContentStore } from "@/lib/admin/types";

/** Canlı içerik — admin panelinden kaydedilen data/content.json */
export function liveContent(): ContentStore {
  noStore();
  return getContent();
}

export function liveSite() {
  return liveContent().site;
}

export function liveServices() {
  return liveContent().services;
}

export function liveProjects() {
  return liveContent().projects;
}

export function liveProjectFilters() {
  return liveContent().projectFilters;
}

export function livePosts() {
  return liveContent().posts;
}

export function liveJobs() {
  return liveContent().jobs;
}

export function liveTestimonials() {
  return liveContent().testimonials;
}

export function liveReferences() {
  return liveContent().references;
}

export function liveProcessSteps() {
  return liveContent().processSteps;
}

export function liveValues() {
  return liveContent().values;
}

export function liveMilestones() {
  return liveContent().milestones;
}

export function liveTeam() {
  return liveContent().team;
}

export function liveSeo() {
  return liveContent().seo;
}
