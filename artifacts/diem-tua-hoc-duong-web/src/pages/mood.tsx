import { Link } from "wouter";
import { useUser } from "@clerk/react";
import {
  getGetMoodHistoryQueryKey,
  useGetMoodHistory,
  type MoodInputMood,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Loader2, Calendar, MessageCircle, Heart, RotateCw } from "lucide-react";

const MOODS: { value: MoodInputMood; label: string; color: string; score: number }[] = [
  { value: "very_sad", label: "Rất buồn", color: "bg-chart-5 text-white", score: 1 },
  { value: "sad", label: "Buồn", color: "bg-chart-4 text-white", score: 2 },
  { value: "neutral", label: "Bình thường", color: "bg-chart-3 text-white", score: 3 },
  { value: "happy", label: "Vui vẻ", color: "bg-chart-2 text-white", score: 4 },
  { value: "very_happy", label: "Rất vui", color: "bg-chart-1 text-white", score: 5 },
];

export default function Mood() {
  const { isLoaded, isSignedIn } = useUser();
  const historyKey = getGetMoodHistoryQueryKey({ days: 7 });
  const {
    data: history,
    isLoading: historyLoading,
    isError: historyError,
    refetch,
  } = useGetMoodHistory(
    { days: 7 },
    { query: { enabled: isLoaded && !!isSignedIn, queryKey: historyKey } },
  );

  if (!isLoaded) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12" data-testid="status-mood-auth-loading">
        <div className="mx-auto mb-8 h-10 max-w-sm animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted/70" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <section className="container mx-auto flex min-h-[60dvh] max-w-3xl items-center justify-center px-4 py-12">
        <Card className="w-full max-w-xl overflow-hidden rounded-2xl border-border/60 shadow-md" data-testid="card-mood-sign-in">
          <CardHeader className="bg-primary/5 px-6 pb-5 pt-8 text-center sm:px-10">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <CardTitle className="font-serif text-3xl">Một góc riêng dành cho bạn</CardTitle>
            <CardDescription className="mx-auto max-w-md text-base leading-relaxed">
              Đăng nhập để ghi lại cảm xúc và xem lại hành trình của riêng mình. Những điều bạn chia sẻ được giữ riêng tư.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 px-6 py-6 sm:flex-row sm:justify-center sm:px-10">
            <Button asChild className="w-full rounded-full sm:w-auto" data-testid="link-mood-page-sign-in">
              <Link href="/sign-in?redirect_url=%2Fmood">Đăng nhập</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full sm:w-auto" data-testid="link-mood-page-sign-up">
              <Link href="/sign-up?redirect_url=%2Fmood">Tạo tài khoản</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full rounded-full sm:w-auto" data-testid="link-mood-page-chat">
              <Link href="/chat"><MessageCircle className="h-4 w-4" /> Trò chuyện</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const chartData = history?.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString("vi-VN", { weekday: "short" }),
    score: entry.score,
    mood: entry.mood,
    note: entry.note,
  })).reverse() ?? [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 text-center sm:mb-10">
        <div>
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground sm:text-4xl" data-testid="text-mood-page-title">
            Ghi nhận cảm xúc
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Dành một phút để nhìn nhận lại cảm xúc của bản thân. Việc này giúp bạn hiểu rõ hơn về trạng thái tinh thần của mình.
          </p>
        </div>
        <Button asChild variant="outline" className="mx-auto rounded-full" data-testid="link-mood-back-to-chat">
          <Link href="/chat"><MessageCircle className="h-4 w-4" /> Quay lại trò chuyện</Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="border-border/50 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lịch sử cảm xúc</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Biểu đồ biến thiên cảm xúc trong 7 ngày qua.</CardDescription>
          </CardHeader>
          <CardContent>
            {historyLoading ? (
              <div className="h-64 space-y-4 rounded-xl bg-muted/20 p-6" aria-label="Đang tải lịch sử" data-testid="status-mood-history-loading">
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-40 animate-pulse rounded-lg bg-muted/70" />
              </div>
            ) : historyError ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/10 text-center" data-testid="status-mood-history-error">
                <p className="text-muted-foreground">Chưa thể tải lịch sử cảm xúc.</p>
                <Button variant="outline" className="mt-4 rounded-full" onClick={() => void refetch()} data-testid="button-retry-mood-history">
                  <RotateCw className="h-4 w-4" /> Thử lại
                </Button>
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-64 w-full" data-testid="chart-mood-history">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                      dy={10}
                    />
                    <YAxis
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--card))" }}
                      labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "4px" }}
                      formatter={(value: number) => [MOODS.find((mood) => mood.score === value)?.label ?? value, "Cảm xúc"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                      activeDot={{ r: 6, fill: "hsl(var(--secondary))", stroke: "hsl(var(--background))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/10 text-center text-muted-foreground" data-testid="empty-mood-history">
                <Calendar className="mb-3 h-7 w-7 opacity-60" />
                <p data-testid="text-empty-mood-history">Chưa có dữ liệu cảm xúc.</p>
                <p className="mt-1 text-sm">Hãy lưu lại cảm xúc đầu tiên của bạn.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
