import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "51.38.224.207",
      port: 5432,
      username: "labspi",
      password: "aA!23Tdes=p*%",
      database: "users",
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
