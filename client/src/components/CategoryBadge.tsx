import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
  variant?: "default" | "secondary";
}

export default function CategoryBadge({ category, variant = "default" }: CategoryBadgeProps) {
  return (
    <Badge variant={variant} className="rounded-full px-3 py-1 text-xs font-semibold">
      {category}
    </Badge>
  );
}
