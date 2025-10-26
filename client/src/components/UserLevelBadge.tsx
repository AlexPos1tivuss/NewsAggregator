import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface UserLevelBadgeProps {
  level: number;
  compact?: boolean;
}

export default function UserLevelBadge({ level, compact = false }: UserLevelBadgeProps) {
  return (
    <Badge className="rounded-full bg-primary text-primary-foreground font-semibold">
      {!compact && <TrendingUp className="h-3 w-3 mr-1" />}
      Ур. {level}
    </Badge>
  );
}
