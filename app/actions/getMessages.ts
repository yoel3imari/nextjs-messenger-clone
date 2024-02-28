import prisma from "@/app/libs/prismadb";
const getMessages = async (convId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: convId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMessages;


