import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { FullConversationType } from '../types';

export default async function getConversations () {
  const currentuser = await getCurrentUser()
  if(!currentuser) {
    return []
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessage: 'desc'
      },
      where: {
        userIds: {
          has: currentuser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });

    return conversations;
  } catch (error: any) {
    return []
  }
}