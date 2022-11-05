import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModuleFactory(),
    TypeOrmModuleFactory(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

export function TypeOrmModuleFactory(): DynamicModule {
  const use_factory = (config: ConfigService) =>
    Promise.resolve({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'jobs_db',
      entities: [
        __dirname + '/**/infra/repository/*.entity.{ts,js}',
        __dirname + '/**/infra/repositories/*.entity.{ts,js}',
      ],
      synchronize: config.get('NODE_ENV') === 'development',
      logging: ['schema', 'error'],
    } as TypeOrmModuleOptions);

  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: use_factory,
  });
}

export function ConfigModuleFactory(): DynamicModule {
  return ConfigModule.forRoot({
    envFilePath: ['.env.development.local', '.env'],
    isGlobal: true,
  });
}
