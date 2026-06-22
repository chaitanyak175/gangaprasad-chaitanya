import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get friends' progress on this question
    const friendships = await prisma.friendship.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        friend: true,
      },
    });

    const friendsProgress = await Promise.all(
      friendships.map(async (f) => {
        const progress = await prisma.userQuestion.findUnique({
          where: {
            userId_questionId: {
              userId: f.friendId,
              questionId: params.questionId,
            },
          },
        });
        return {
          friend: f.friend,
          progress,
        };
      })
    );

    return NextResponse.json({ friendsProgress });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching friends' progress" },
      { status: 500 }
    );
  }
}
