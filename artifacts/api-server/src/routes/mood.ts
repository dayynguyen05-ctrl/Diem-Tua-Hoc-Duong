import { getAuth } from "@clerk/express";
import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { moodEntriesTable } from "@workspace/db";
import { LogMoodBody, GetMoodHistoryQueryParams } from "@workspace/api-zod";
import { and, eq, gte, desc } from "drizzle-orm";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Đăng nhập để ghi nhận cảm xúc." });
    return;
  }

  const parsed = LogMoodBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Thông tin cảm xúc chưa hợp lệ." });
    return;
  }

  const { mood, score, note } = parsed.data;

  const [entry] = await db
    .insert(moodEntriesTable)
    .values({ sessionId: userId, mood, score, note: note ?? null })
    .returning();

  res.status(201).json({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
  });
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Đăng nhập để xem lịch sử cảm xúc." });
    return;
  }

  const parsed = GetMoodHistoryQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Khoảng thời gian chưa hợp lệ." });
    return;
  }

  const { days } = parsed.data;
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - (days ?? 7));

  const entries = await db
    .select()
    .from(moodEntriesTable)
    .where(and(
      eq(moodEntriesTable.sessionId, userId),
      gte(moodEntriesTable.createdAt, daysAgo),
    ))
    .orderBy(desc(moodEntriesTable.createdAt))
    .limit(100);

  res.json(
    entries.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
    }))
  );
});

export default router;
