import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { AddPointsDto } from '../dto/add-points.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  createBook(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        coverImage: createBookDto.coverImage,
        price: createBookDto.price,
        title: createBookDto.title,
        writer: createBookDto.writer,
        tags: createBookDto.tags
      }
    });
  }

  async getAllBooks() {
    return this.prisma.book.findMany();
  }

  async getAllCustomers() {
    return this.prisma.customer.findMany();
  }

  getCustomerByEmail(email: string) {
    return this.prisma.customer.findFirst({ where: { email: email } });
  }

  async createCustomer(customerDto: CreateCustomerDto) {
    const existingCustomer = await this.getCustomerByEmail(customerDto.email)
    if (existingCustomer) {
      return "Customer Already Exists."
    }
    return this.prisma.customer.create({
      data: {
        name: customerDto.name,
        email: customerDto.email,
        price: 100
      }
    });
  }

  async addPoints(addPoints: AddPointsDto) {
    const resp = await this.prisma.customer.findUnique({ where: { customer_id: addPoints.customer_id } });

    const newObj = { ...resp, price: resp.price + addPoints.points }

    return this.prisma.customer.update({
      where: {
        customer_id: addPoints.customer_id
      },
      data: newObj
    });
  }

  async updatePoints(updatePoints: any) {
    return this.prisma.customer.update({
      where: {
        customer_id: updatePoints.customer_id
      },
      data: {
        price: updatePoints.price
      }
    });
  }

  async createOrders(createOrderDto: CreateOrderDto) {
    const bookDetails = await this.getBooksById(createOrderDto.book_id)
    const customerDetails = await this.getCustomerById(createOrderDto.customer_id)

    if (!customerDetails) {
      return "Invalid customer"
    }

    const amount = Math.round(customerDetails.price - bookDetails.price)

    if (amount > 0) {
      const resp = await this.prisma.order.create({
        data: {
          book_id: Number(createOrderDto.book_id),
          customer_d: createOrderDto.customer_id
        }
      });
      // Reduce point from the Customer Account.

      await this.updatePoints({ customer_id: createOrderDto.customer_id, price: Number(amount) })
      return resp
    } else {
      return "Bad Request."
    }
  }

  async cancelOrder(order_id: any) {
    // Get existing Order First
    const existingResp = await this.prisma.order.findUnique({ where: { order_id: Number(order_id) } })

    // Get Book Details
    const bookDetails = await this.getBooksById(existingResp.book_id)

    // Get Customer Details
    const customerDetails = await this.getCustomerById(existingResp.customer_d)

    // Delete row from DB ( i.e cancel the order)
    const resp = await this.prisma.order.delete({
      where: { order_id: Number(order_id) }
    });

    // update in customer Wallet price/points.
    await this.prisma.customer.update({
      where: {
        customer_id: existingResp.customer_d
      },
      data: {
        price: customerDetails.price + bookDetails.price
      }
    });
    return resp
  }


  async getCustomerById(customer_id: number) {
    return this.prisma.customer.findUnique({ where: { customer_id } });
  }

  async getBooksById(book_id: number) {
    return this.prisma.book.findUnique({ where: { book_id } });
  }

  async findAll() {
    const data = await this.prisma.order.findMany();
    const results = []

    for await (let d of data) {

      const bookDetails = await this.getBooksById(d.book_id)

      const customerDetails = await this.getCustomerById(d.customer_d)

      const resp = await Promise.all([bookDetails, customerDetails])

      const books = resp[0]
      const customers = resp[1]
      results.push({
        order_id: d.order_id,
        books,
        customers
      })
    }
    return results
  }

  /* findDrafts() {
    return this.prisma.book.findMany({ where: { id: 100 } });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  } */
}
