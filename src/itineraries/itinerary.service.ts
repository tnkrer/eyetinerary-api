import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ItineraryService {
    constructor(
        @Inject('ITINERARY_REPOSITORY') private readonly repository: Repository<Itinerary>,
    ) {}

    async findOne(id: number): Promise<Itinerary> {
        return await this.repository
        .createQueryBuilder('itinerary')
        .addSelect('owner.id')
        .leftJoin('itinerary.owner', 'owner')
        .where('itinerary.id = :itineraryId', { itineraryId: id })
        .getOne();
    }

    async createNew(title: string, owner?: User): Promise<number> {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({ title, editToken: 'test', owner })
        .execute();
        return inserted.identifiers[0].id;
    }

    async deleteOne(id: number): Promise<Itinerary> {
        const itinerary: Itinerary = await this.findOne(id);
        if (itinerary) {
            this.repository.remove(itinerary);
        }
        return itinerary;
    }
}
