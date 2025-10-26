import { Progress } from "@/components/ui/progress";

interface XPProgressProps {
  currentXP: number;
  requiredXP: number;
  level: number;
}

export default function XPProgress({ currentXP, requiredXP, level }: XPProgressProps) {
  const percentage = (currentXP / requiredXP) * 100;
  
  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {currentXP} / {requiredXP} XP до уровня {level + 1}
      </p>
    </div>
  );
}
