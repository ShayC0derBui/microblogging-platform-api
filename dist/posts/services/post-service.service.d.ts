import { PrismaService } from 'src/prisma/services/prisma-provider.service';
import { Post } from '@prisma/client';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllPosts(cursor: string | undefined, pageSize?: number): Promise<{
        posts: Post[];
        nextCursor: string | null;
    }>;
    getPostsByUser(userId: string, cursor: string, pageSize: number): Promise<{
        posts: Post[];
        nextCursor: string | null;
    }>;
    createPost(userId: string, body: string): Promise<Post>;
}
