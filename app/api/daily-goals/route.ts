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

    const { questionsPerDay, selectedQuestionIds } = await request.json();

    if (!questionsPerDay || !Array.isArray(selectedQuestionIds)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyGoal = await prisma.dailyGoal.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
      update: {
        questionsPerDay,
        selectedQuestions: selectedQuestionIds,
      },
      create: {
        userId: session.user.id,
        questionsPerDay,
        selectedQuestions: selectedQuestionIds,
        date: today,
      },
    });

    return NextResponse.json(dailyGoal);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while setting daily goal" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyGoal = await prisma.dailyGoal.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
    });

    return NextResponse.json({ dailyGoal });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching daily goal" },
      { status: 500 }
    );
  }
}
