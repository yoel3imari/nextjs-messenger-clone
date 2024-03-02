import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST (
  req: Request
) {
  try {
    const user = await getCurrentUser();
    const body = await req.json()
    const {
      name,
      image
    } = body

    if(!user?.id) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        image: image,
        name: name
      }
    });

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error);
    return new NextResponse('Internl Error', {status: 500}) 
  }
}