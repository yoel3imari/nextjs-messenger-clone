import { FullConversationType } from '../types';
import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';
const getConversationById = async (
  convId: string
) => {
  try {
    const currentUser = getCurrentUser()
    if(!currentUser) return null
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: convId
      },
      include: {
        users: true
      }
    })

    return conversation
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getConversationById