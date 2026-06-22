import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's stats
    const userQuestions = await prisma.userQuestion.findMany({
      where: {
        userId: session.user.id,
      },
    });

    const solved = userQuestions.filter((q) => q.solved).length;
    const total = userQuestions.length;

    // Get friends' stats
    const friendships = await prisma.friendship.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        friend: true,
      },
    });

    const friendStats = await Promise.all(
      friendships.map(async (f) => {
        const fQuestions = await prisma.userQuestion.findMany({
          where: {
            userId: f.friendId,
          },
        });
        const fSolved = fQuestions.filter((q) => q.solved).length;
        return {
          friend: f.friend,
          solved: fSolved,
          total: fQuestions.length,
          percentage:
            fQuestions.length > 0
              ? Math.round((fSolved / fQuestions.length) * 100)
              : 0,
        };
      })
    );

    // Sort by solved count descending
    const leaderboard = [
      {
        user: session.user,
        solved,
        total,
        percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
        rank: 1,
      },
      ...friendStats
        .sort((a, b) => b.solved - a.solved)
        .map((stat, index) => ({
          user: stat.friend,
          solved: stat.solved,
          total: stat.total,
          percentage: stat.percentage,
          rank: index + 2,
        })),
    ];

    return NextResponse.json({
      userStats: {
        solved,
        total,
        percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
      },
      leaderboard,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching stats" },
      { status: 500 }
    );
  }
}
