import { UserService } from '../services/user-services.service';
import { UserUpdate } from '../user-types';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(cursor: string, pageSize: number): Promise<{
        users: User[];
        nextCursor: string | null;
    }>;
    getFollowers(id: string, cursor: string, pageSize: number): Promise<{
        users: User[];
        nextCursor: string | null;
    }>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, data: UserUpdate): Promise<User>;
}
