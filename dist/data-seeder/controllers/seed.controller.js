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
exports.SeedController = void 0;
const common_1 = require("@nestjs/common");
const seeder_service_1 = require("../services/seeder.service");
let SeedController = class SeedController {
    constructor(seederService) {
        this.seederService = seederService;
    }
    async seedData() {
        await this.seederService.seedUsers(10);
        await this.seederService.followUsers();
        return 'Data seeding completed';
    }
    async seedPosts() {
        await this.seederService.seedPosts(10);
        return 'Posts seeding completed';
    }
};
exports.SeedController = SeedController;
__decorate([
    (0, common_1.Post)('seedUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedData", null);
__decorate([
    (0, common_1.Post)('seedPosts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedPosts", null);
exports.SeedController = SeedController = __decorate([
    (0, common_1.Controller)('seeder'),
    __metadata("design:paramtypes", [seeder_service_1.SeederService])
], SeedController);
//# sourceMappingURL=seed.controller.js.map