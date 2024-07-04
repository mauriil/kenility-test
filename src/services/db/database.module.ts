import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [
    ...databaseProviders,
    {
      provide: ConfigService,
      useClass: ConfigService,
    },
  ],
  exports: [...databaseProviders, ConfigService],
})
export class DatabaseModule {}
