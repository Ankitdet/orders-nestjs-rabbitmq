import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from './rabbit-mq.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RabbitMQModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
