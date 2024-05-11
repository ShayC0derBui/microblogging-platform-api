import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';
@Injectable()
export class SeederService {
  constructor(private readonly prisma: PrismaService) {}

  async seedUsers(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          username: faker.internet.userName(),
          bio: faker.lorem.sentences(3),
          hashedPassword: faker.internet.password({
            length: 10,
            memorable: false,
          }),
        },
      });
    }
  }

  async followUsers(): Promise<void> {
    const users = await this.prisma.user.findMany();
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const currentUser = users[i];
        const userToFollow = users[j];

        // Check if the userToFollow ID is not already in the followingIds array
        if (!currentUser.followingIds.includes(userToFollow.id)) {
          await this.prisma.user.update({
            where: { id: currentUser.id },
            data: {
              followingIds: { push: userToFollow.id },
            },
          });
        }
      }
    }
  }

  async seedPosts(count: number): Promise<void> {
    const users = await this.prisma.user.findMany();
    for (let i = 0; i < count; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await this.prisma.post.create({
        data: {
          body: faker.lorem.paragraphs(3),
          userId: randomUser.id,
        },
      });
    }
  }
}
