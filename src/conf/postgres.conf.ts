import { TypeOrmModule } from '@nestjs/typeorm';

export const PostgreDBConf = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  });
};
