import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DSA_QUESTIONS } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const difficulty = searchParams.get("difficulty");
    const category = searchParams.get("category");

    let questions = await prisma.question.findMany({
      where: {
        ...(difficulty && { difficulty }),
        ...(category && { category }),
      },
      orderBy: { createdAt: "desc" },
    });

    // If no questions in DB, use default questions
    if (questions.length === 0) {
      questions = DSA_QUESTIONS.map((q: any) => ({
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        category: q.category,
        leetcodeUrl: q.leetcodeUrl,
        description: null,
        topicTags: q.topicTags,
        createdAt: new Date(),
      })) as any;
    }

    // Get user's progress on these questions
    const userProgress = await prisma.userQuestion.findMany({
      where: {
        userId: session.user.id,
        questionId: { in: questions.map((q) => q.id) },
      },
    });

    const progressMap = new Map(
      userProgress.map((p) => [p.questionId, p])
    );

    const enrichedQuestions = questions.map((q) => ({
      ...q,
      userProgress: progressMap.get(q.id) || null,
    }));

    return NextResponse.json({ questions: enrichedQuestions });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching questions" },
      { status: 500 }
    );
  }
}
