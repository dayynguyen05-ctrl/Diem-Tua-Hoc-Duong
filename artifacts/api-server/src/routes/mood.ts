import { getAuth } from "@clerk/express";
import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { moodEntriesTable } from "@workspace/db";
import { LogMoodBody } from "@workspace/api-zod";

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

export default router;
