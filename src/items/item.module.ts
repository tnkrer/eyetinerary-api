import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';
import { PageModule } from '../pages/page.module';
import { ItemController } from './item.controller';
import { ItineraryModule } from '../itineraries/itinerary.module';

@Module({
  imports: [DatabaseModule, PageModule, ItineraryModule],
  providers: [...itemProviders, ItemService],
  exports: [...itemProviders, ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
