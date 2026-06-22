import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { questionId, solved, codeApproach, notes } = await request.json();

    if (!questionId) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }

    // Upsert user question progress
    const userQuestion = await prisma.userQuestion.upsert({
      where: {
        userId_questionId: {
          userId: session.user.id,
          questionId: questionId,
        },
      },
      update: {
        solved: solved || false,
        codeApproach: codeApproach || undefined,
        notes: notes || undefined,
        solvedAt: solved ? new Date() : null,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        questionId: questionId,
        solved: solved || false,
        codeApproach: codeApproach || undefined,
        notes: notes || undefined,
        solvedAt: solved ? new Date() : null,
      },
    });

    return NextResponse.json(userQuestion);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating question progress" },
      { status: 500 }
    );
  }
}
