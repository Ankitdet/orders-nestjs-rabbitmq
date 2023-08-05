import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://hoqdzcyb:fM6CTMC0txg2jPX0EHKbhrVRCsoonZdH@toad.rmq.cloudamqp.com/hoqdzcyb'
      ],
      queue: 'sample-test',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1
    }
  });

  await app.listenAsync();
}

bootstrap();
