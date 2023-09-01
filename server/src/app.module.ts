import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PropertiesModule } from './properties/properties.module';
import { CommentsModule } from './comments/comments.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/db/gql/schema.gql',
    }),
    UsersModule,
    AuthModule,
    PropertiesModule,
    CommentsModule,
    StatesModule,
  ],
})
export class AppModule {}
