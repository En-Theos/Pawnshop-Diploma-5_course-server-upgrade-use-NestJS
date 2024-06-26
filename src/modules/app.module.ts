import { Module } from "@nestjs/common";
import { EvaluationModule } from "./evaluation/evaluation.module";
import { GoodsModule } from './goods/goods.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LotsModule } from './lots/lots.module';
import { ProductsModule } from './products/products.module';
import { LeafModule } from './leaf/leaf.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import DBConfig from "../configurations/data-base.config";
import MailerConfig from "../configurations/mailer.config";
import ServerConfig from "../configurations/server.config";
import JWTConfig from "../configurations/jwt.config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        load: [DBConfig, MailerConfig, ServerConfig, JWTConfig]
                }),
                TypeOrmModule.forRootAsync({
                        imports: [ConfigModule],
                        useFactory: (configService: ConfigService) => ({
                                type: 'mysql',
                                host: configService.get<string>('db_host'),
                                port: +configService.get<number>('db_port'),
                                username: configService.get<string>('db_user'),
                                password: configService.get<string>('db_password'),
                                database: configService.get<string>('db_name'),
                                autoLoadEntities: true
                        }),
                        inject: [ConfigService]
                }),
                ServeStaticModule.forRoot({
                        rootPath: join(__dirname, '..', '..', 'uploads'),
                        serveRoot: "/image"
                }),
                GoodsModule,
                EvaluationModule,
                UserModule,
                AuthModule,
                LotsModule,
                ProductsModule,
                LeafModule,
                MailModule,
                TokenModule
        ]
})
export class AppModule { }