import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const current = await getCurrentUser();
    const body = await req.json();
    const { message, image, conversationId } = body;

    if (!current || !current.email)
      return new NextResponse("unauthorized", { status: 401 });

    const newMsg = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: current.id,
          },
        },
        seen: {
          connect: {
            id: current.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessage: new Date(),
        messages: {
          connect: {
            id: newMsg.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMsg);
  } catch (error) {
    console.error(error, "messges api");
    return new NextResponse("internal error", { status: 500 });
  }
}
