import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { PostgreDBConf } from './conf/postgres.conf';

@Module({
  imports: [ConfigModule.forRoot(), PostgreDBConf(), AuthModule, UsersModule],
})
export class AppModule {}
