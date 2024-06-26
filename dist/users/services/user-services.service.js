"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_provider_service_1 = require("../../prisma/services/prisma-provider.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(cursor, pageSize = 5) {
        const cursorDirection = cursor
            ? { cursor: { id: cursor } }
            : { cursor: undefined };
        const users = await this.prisma.user.findMany({
            ...cursorDirection,
            take: Number(pageSize) + 1,
        });
        let nextCursor = null;
        if (users.length > pageSize) {
            users.pop();
            nextCursor = users[users.length - 1].id;
        }
        return { users, nextCursor };
    }
    async getFollowers(userId, cursor, pageSize = 5) {
        const cursorDirection = cursor
            ? { cursor: { id: cursor } }
            : { cursor: undefined };
        const Ids = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                followingIds: true,
            },
        });
        const followers = await this.prisma.user.findMany({
            ...cursorDirection,
            take: Number(pageSize) + 1,
            where: {
                id: {
                    in: Ids.followingIds,
                },
            },
        });
        let nextCursor = null;
        if (followers.length > pageSize) {
            followers.pop();
            nextCursor = followers[followers.length - 1].id;
        }
        return { users: followers, nextCursor };
    }
    async getUserDetails(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    }
    async updateUserDetails(userId, data) {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data,
        });
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_provider_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user-services.service.js.map