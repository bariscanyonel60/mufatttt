import {
  DraftingCompass, Building2, Frame, ShieldCheck, Activity,
  Compass, FileCheck2, Calculator, Home, Landmark, HardHat,
  Factory, TreePine, FileBadge, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  DraftingCompass, Building2, Frame, ShieldCheck, Activity, Compass, FileCheck2, Calculator,
  Home, Landmark, HardHat, Factory, TreePine, FileBadge,
};

export default function ServiceIcon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const Icon = map[name] ?? Building2;
  return <Icon size={size} className={className} aria-hidden />;
}
