import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  getAllUsers(user: any) {
    const isAdmin = user.role === 'ADMIN';

    if (!isAdmin) {

    }
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({
      where: { id },
      include: {
        candidate: true,
        recruiter: true,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
