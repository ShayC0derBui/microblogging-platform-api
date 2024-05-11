import { PrismaService } from 'src/prisma/services/prisma-provider.service';
export declare class SeederService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    seedUsers(count: number): Promise<void>;
    followUsers(): Promise<void>;
    seedPosts(count: number): Promise<void>;
}
