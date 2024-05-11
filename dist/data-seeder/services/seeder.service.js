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
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const faker_1 = require("@faker-js/faker");
const prisma_provider_service_1 = require("../../prisma/services/prisma-provider.service");
let SeederService = class SeederService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async seedUsers(count) {
        for (let i = 0; i < count; i++) {
            await this.prisma.user.create({
                data: {
                    email: faker_1.faker.internet.email(),
                    name: faker_1.faker.person.firstName(),
                    username: faker_1.faker.internet.userName(),
                    bio: faker_1.faker.lorem.sentences(3),
                    hashedPassword: faker_1.faker.internet.password({
                        length: 10,
                        memorable: false,
                    }),
                },
            });
        }
    }
    async followUsers() {
        const users = await this.prisma.user.findMany();
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                const currentUser = users[i];
                const userToFollow = users[j];
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
    async seedPosts(count) {
        const users = await this.prisma.user.findMany();
        for (let i = 0; i < count; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            await this.prisma.post.create({
                data: {
                    body: faker_1.faker.lorem.paragraphs(3),
                    userId: randomUser.id,
                },
            });
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_provider_service_1.PrismaService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map