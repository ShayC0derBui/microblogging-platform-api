import { User } from '@prisma/client';
import { UserUpdate } from '../user-types';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(cursor: string | undefined, pageSize?: number): Promise<{
        users: User[];
        nextCursor: string | null;
    }>;
    getFollowers(userId: string, cursor: string, pageSize?: number): Promise<{
        users: User[];
        nextCursor: string | null;
    }>;
    getUserDetails(userId: string): Promise<User>;
    updateUserDetails(userId: string, data: UserUpdate): Promise<User>;
}
