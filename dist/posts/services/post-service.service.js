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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_provider_service_1 = require("../../prisma/services/prisma-provider.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllPosts(cursor, pageSize = 5) {
        const cursorDirection = cursor
            ? { cursor: { id: cursor } }
            : { cursor: undefined };
        const posts = await this.prisma.post.findMany({
            ...cursorDirection,
            take: pageSize + 1,
            orderBy: { createdAt: 'desc' },
        });
        let nextCursor = null;
        if (posts.length > pageSize) {
            posts.pop();
            nextCursor = posts[posts.length - 1].id;
        }
        return { posts, nextCursor };
    }
    async getPostsByUser(userId, cursor, pageSize) {
        const cursorDirection = cursor
            ? { cursor: { id: cursor } }
            : { cursor: undefined };
        const posts = await this.prisma.post.findMany({
            ...cursorDirection,
            take: pageSize + 1,
            where: {
                userId,
            },
        });
        let nextCursor = null;
        if (posts.length > pageSize) {
            posts.pop();
            nextCursor = posts[posts.length - 1].id;
        }
        return { posts, nextCursor };
    }
    async createPost(userId, body) {
        const post = await this.prisma.post.create({
            data: {
                body,
                userId,
            },
        });
        return post;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_provider_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post-service.service.js.map