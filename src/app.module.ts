import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import { ChargeModule } from './charge/charge.module';
import { ChatModule } from './chat/chat.module';
import { CommentsModule } from './comments/comments.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { DatabaseModule } from './database/database.module';
import { EmailScheduleModule } from './email-schedule/email-schedule.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/posts.module';
import { PrivateFilesModule } from './private-files/private-files.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { StripeModule } from './stripe/stripe.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';
import { Timestamp } from './utils/scalars/timestamp.scalar';
import { StripeWebhookModule } from './stripe-webhook/stripe-webhook.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { SmsModule } from './sms/sms.module';
import { GoogleAuthenticationModule } from './google-authentication/google-authentication.module';

@Module({
  imports: [
    ChargeModule,
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    ScheduleModule.forRoot(),
    SubscribersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    CategoryModule,
    FilesModule,
    PrivateFilesModule,
    CommentsModule,
    EmailModule,
    EmailScheduleModule,
    ChatModule,
    PubSubModule,
    StripeModule,
    CreditCardsModule,
    SubscriptionsModule,
    StripeWebhookModule,
    EmailConfirmationModule,
    SmsModule,
    GoogleAuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, Timestamp],
})
export class AppModule {}
