import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MyLogger } from './utils/MyLogger';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { usersProviders } from './modules/users/users.providers';
import { DatabaseModule } from './services/db/database.module';
import { ProductsModule } from './modules/products/products.module';
import { JwtService } from '@nestjs/jwt';
import { OrdersModule } from './modules/orders/orders.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, ProductsModule, OrdersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, MyLogger, UsersService, ...usersProviders, JwtService],
})
export class AppModule {}
