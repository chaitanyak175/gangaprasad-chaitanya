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

    const friends = await prisma.friendship.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      friends: friends.map((f) => f.friend),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching friends" },
      { status: 500 }
    );
  }
}
