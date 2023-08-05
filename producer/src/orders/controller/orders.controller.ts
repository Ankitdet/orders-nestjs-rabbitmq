import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RabbitMQService } from '../../rabbit-mq.service';
import { OrderService } from '../service/orders.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { AddPointsDto } from '../dto/add-points.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { OderEntity } from '../entities/order.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly articlesService: OrderService,
    private readonly rabbitMQService: RabbitMQService,

  ) { }

  @Post('/book')
  createBook(@Body() createBook: CreateBookDto) {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'Creating the books',
      payload: createBook
    })
    return this.articlesService.createBook(createBook);
  }

  @Get('/books-all')
  getBooks() {
    const resp = this.articlesService.getAllBooks();
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'fetching all book details',
      payload: resp
    })
    return resp
  }

  @Get('/customer-all')
  getCustomers() {
    const resp = this.articlesService.getAllCustomers();
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'fetching all the customer in the system',
      payload: resp
    })
    return resp
  }

  @Get('/customer/:id')
  async getCustomer(@Param('id', ParseIntPipe) id: number) {
    const resp = await this.articlesService.getCustomerById(id);
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'getting customer by Id.',
      payload: resp
    })
    return resp
  }

  @Post('/customer')
  async createCustomer(@Body() createArticleDto: CreateCustomerDto) {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'creating the customer',
      payload: createArticleDto
    })
    const resp = await this.articlesService.createCustomer(createArticleDto);
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'Customer Response',
      payload: resp
    })
    return resp
  }


  @Post('/customer/addPoints')
  @ApiOkResponse({ type: OderEntity })
  @ApiBadRequestResponse()
  async addPoints(@Body() addPointsDto: AddPointsDto) {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'add price into existing customer.',
      payload: addPointsDto
    })
    const resp = await this.articlesService.addPoints(addPointsDto);
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'customer response',
      payload: resp
    })
    return resp
  }

  @Post()
  @ApiOkResponse({ type: OderEntity })
  async createOrders(@Body() createOrderDto: CreateOrderDto) {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'creating the orders with book id and customer id',
      payload: createOrderDto
    })
    const resp = await this.articlesService.createOrders(createOrderDto);
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'response after creating order.',
      payload: resp
    })
    return resp
  }

  @Delete(':orderId')
  @ApiOkResponse({ type: OderEntity })
  async cancelOrder(@Param('orderId', ParseIntPipe) orderId: any) {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'cancel the order',
      payload: { orderId }
    })
    const resp = await this.articlesService.cancelOrder(orderId);
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'cancel order response',
      payload: resp
    })
    return resp
  }

  @Get('/buys')
  @ApiOkResponse({ type: OderEntity })
  async findAll() {
    const resp = await this.articlesService.findAll();
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: 'fetch all the articles',
      payload: resp
    })
    return resp
  }
}
