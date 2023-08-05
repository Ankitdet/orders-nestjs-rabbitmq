import { Module } from '@nestjs/common';
import { OrderService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RabbitMQModule } from '../rabbit-mq.module';

@Module({
  controllers: [OrdersController],
  providers: [OrderService],
  imports: [PrismaModule, RabbitMQModule],
})
export class OrdersModule { }
