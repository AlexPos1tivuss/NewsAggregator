import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  newsId: string;
  onCommentSubmit?: (content: string) => void;
}

export default function CommentForm({ newsId, onCommentSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    setIsSubmitting(true);
    console.log("Отправка комментария:", { newsId, content });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Комментарий добавлен!",
      description: "Вы получили +5 XP",
    });

    onCommentSubmit?.(content);
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Написать комментарий..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-24"
        data-testid="input-comment"
      />
      <Button type="submit" disabled={isSubmitting || !content.trim()} data-testid="button-submit-comment">
        {isSubmitting ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  );
}
