import { PostService } from '../services/post-service.service';
import { Post as PostModel } from '@prisma/client';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPostsByUser(userId: string, cursor: string, pageSize: number): Promise<{
        posts: PostModel[];
        nextCursor: string | null;
    }>;
    getAllPosts(cursor: string, pageSize: number): Promise<{
        posts: PostModel[];
        nextCursor: string | null;
    }>;
    createPost(userId: string, body: string): Promise<PostModel>;
}
