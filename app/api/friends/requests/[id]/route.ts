import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json();

    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: params.id },
    });

    if (!friendRequest) {
      return NextResponse.json(
        { error: "Friend request not found" },
        { status: 404 }
      );
    }

    if (friendRequest.receiverId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (action === "accept") {
      // Create friendships in both directions
      await Promise.all([
        prisma.friendship.create({
          data: {
            userId: session.user.id,
            friendId: friendRequest.senderId,
          },
        }),
        prisma.friendship.create({
          data: {
            userId: friendRequest.senderId,
            friendId: session.user.id,
          },
        }),
      ]);
    }

    // Update request status
    const updatedRequest = await prisma.friendRequest.update({
      where: { id: params.id },
      data: { status: action === "accept" ? "accepted" : "rejected" },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing friend request" },
      { status: 500 }
    );
  }
}
