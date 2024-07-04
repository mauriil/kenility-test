import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DatabaseModule } from 'src/services/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [...productsProviders, ProductsService],
})
export class ProductsModule {}
