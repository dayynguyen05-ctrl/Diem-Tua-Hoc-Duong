import { useState } from "react";
import { Link } from "wouter";
import { useUser } from "@clerk/react";
import { useLogMood, type MoodInputMood } from "@workspace/api-client-react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MOODS: { value: MoodInputMood; label: string; score: number; color: string }[] = [
  { value: "very_sad", label: "Rất buồn", score: 1, color: "bg-chart-5" },
  { value: "sad", label: "Buồn", score: 2, color: "bg-chart-4" },
  { value: "neutral", label: "Bình thường", score: 3, color: "bg-chart-3" },
  { value: "happy", label: "Vui vẻ", score: 4, color: "bg-chart-2" },
  { value: "very_happy", label: "Rất vui", score: 5, color: "bg-chart-1" },
];

export function MoodCheckIn() {
  const { isLoaded, isSignedIn } = useUser();
  const { toast } = useToast();
  const logMood = useLogMood();
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<typeof MOODS[number] | null>(null);
  const [note, setNote] = useState("");

  const saveMood = () => {
    if (!selectedMood) return;
    logMood.mutate(
      {
        data: {
          mood: selectedMood.value,
          score: selectedMood.score,
          note: note.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Đã lưu cảm xúc", description: "Cảm ơn bạn đã chia sẻ cảm xúc hôm nay." });
          setSelectedMood(null);
          setNote("");
          setOpen(false);
        },
        onError: () => toast({
          title: "Chưa thể lưu cảm xúc",
          description: "Vui lòng thử lại sau ít phút.",
          variant: "destructive",
        }),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="default"
          className="h-14 w-[76px] shrink-0 flex-col gap-1 rounded-2xl border-primary/30 bg-primary/5 px-2 text-primary hover:bg-primary/10 sm:h-12 sm:w-auto sm:flex-row sm:gap-2 sm:rounded-full sm:px-4"
          aria-label="Ghi nhận cảm xúc"
          title="Ghi nhận cảm xúc"
          data-testid="button-open-mood-check-in"
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs font-semibold sm:text-sm">Cảm xúc</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Dành một phút cho mình</DialogTitle>
          <DialogDescription data-testid="text-mood-check-in-description">
            Cảm xúc của bạn được lưu riêng tư trong tài khoản.
          </DialogDescription>
        </DialogHeader>
        {!isLoaded ? (
          <div className="space-y-3 py-2" aria-label="Đang kiểm tra tài khoản" data-testid="status-mood-auth-loading">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
          </div>
        ) : isSignedIn ? (
          <div className="space-y-5">
            <fieldset>
              <legend className="mb-3 text-base font-medium">Bạn đang cảm thấy thế nào?</legend>
              <div className="grid grid-cols-5 gap-2">
                {MOODS.map((mood) => {
                  const selected = selectedMood?.value === mood.value;
                  return (
                    <button
                      type="button"
                      key={mood.value}
                      aria-pressed={selected}
                      aria-label={mood.label}
                      data-testid={`button-mood-choice-${mood.value}`}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border px-1 text-center transition-colors ${
                        selected ? "border-primary bg-primary/10 text-foreground" : "border-border/70 hover:bg-muted/60"
                      }`}
                    >
                      <span className={`h-4 w-4 rounded-full ${mood.color}`} aria-hidden="true" />
                      <span className="text-sm leading-tight">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="space-y-2">
              <label htmlFor="mood-check-in-note" className="text-base font-medium">Ghi chú thêm (không bắt buộc)</label>
              <Textarea
                id="mood-check-in-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Điều gì đang ở trong tâm trí bạn?"
                className="min-h-24 resize-none bg-muted/30"
                data-testid="input-mood-check-in-note"
              />
            </div>
            <Button
              type="button"
              className="w-full rounded-full"
              disabled={!selectedMood || logMood.isPending}
              onClick={saveMood}
              data-testid="button-save-mood-check-in"
            >
              {logMood.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Lưu cảm xúc
            </Button>
          </div>
        ) : (
          <div className="space-y-4 rounded-xl border border-border/70 bg-muted/30 p-4">
            <p className="text-base leading-relaxed" data-testid="text-mood-sign-in-prompt">
              Ghi nhận cảm xúc là không gian riêng của bạn. Đăng nhập để lưu lại trong tài khoản.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-full" data-testid="link-mood-sign-in">
                <Link href="/sign-in?redirect_url=%2Fchat">Đăng nhập</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full" data-testid="link-mood-sign-up">
                <Link href="/sign-up?redirect_url=%2Fchat">Tạo tài khoản</Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
