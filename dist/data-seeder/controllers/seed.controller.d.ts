import { SeederService } from '../services/seeder.service';
export declare class SeedController {
    private readonly seederService;
    constructor(seederService: SeederService);
    seedData(): Promise<string>;
    seedPosts(): Promise<string>;
}
