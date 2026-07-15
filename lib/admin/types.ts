export type SiteStat = { value: number; suffix: string; label: string };

export type SiteContent = {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  url: string;
  founded: number;
  mapEmbedUrl: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  stats: SiteStat[];
};

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  icon: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  location: string;
  type: string;
  year: number;
  area: string;
  services: string[];
  cover: string;
  gallery: string[];
  summary: string;
  body: string;
};

export type PostItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  date: string;
  readMin: number;
  cover: string;
  body: string[];
};

export type JobItem = {
  id: string;
  title: string;
  type: string;
  location: string;
  desc: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export type ReferenceItem = { name: string; logo?: string };

export type ProcessStep = { no: string; title: string; desc: string };
export type ValueItem = { title: string; desc: string };
export type MilestoneItem = { year: string; title: string; desc: string };

export type TeamMember = { name: string; role: string; phone?: string };

export type SeoSettings = {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
};

export type ContentStore = {
  site: SiteContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  projectFilters: string[];
  posts: PostItem[];
  jobs: JobItem[];
  testimonials: TestimonialItem[];
  references: ReferenceItem[];
  processSteps: ProcessStep[];
  values: ValueItem[];
  milestones: MilestoneItem[];
  team: TeamMember[];
  seo: SeoSettings;
  updatedAt: string;
};

export type SubmissionStatus = "new" | "read" | "archived" | "replied";

export type ContactSubmission = {
  id: string;
  type: "contact";
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
  note?: string;
};

export type CareerSubmission = {
  id: string;
  type: "career";
  name: string;
  phone: string;
  email: string;
  jobId: string;
  jobTitle: string;
  message: string;
  cvUrl?: string;
  status: SubmissionStatus;
  createdAt: string;
  note?: string;
};

export type Submission = ContactSubmission | CareerSubmission;

export type SubmissionsStore = {
  items: Submission[];
};

export type ActivityItem = {
  id: string;
  action: string;
  entity: string;
  detail: string;
  at: string;
  user: string;
};

export type ActivityStore = {
  items: ActivityItem[];
};

export type CollectionKey =
  | "services"
  | "projects"
  | "posts"
  | "jobs"
  | "testimonials"
  | "references"
  | "processSteps"
  | "values"
  | "milestones"
  | "team";
