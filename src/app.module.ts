import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host:'localhost',
    port:5432,
    username:'root',
    password:'root',
    database:'weight',
    synchronize:true,
    autoLoadEntities: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
