import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  newsId: string;
  title: string;
}

export default function ShareButton({ newsId, title }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = `${window.location.origin}/news/${newsId}`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Ссылка скопирована!",
        description: "Теперь вы можете поделиться новостью в социальных сетях",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-2"
      data-testid="button-share"
    >
      <Share2 className="h-4 w-4" />
      Поделиться
    </Button>
  );
}
