import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import {PrismaService} from "../prisma.service";
import {PurchaseOrders} from "@prisma/client";

@Injectable()
export class PurchaseOrderService {
  constructor(private prisma: PrismaService) {
  }

  // test this.
  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const createPO = await this.prisma.purchaseOrders.create({
      data: {
        vendor_name: createPurchaseOrderDto.vendor_name,
        order_date: new Date (createPurchaseOrderDto.order_date),
        expected_delivery_date: new Date (createPurchaseOrderDto.expected_delivery_date)
      }
    })
    return createPO;
    // return 'this is a create test';
  }

  async findAll(): Promise<PurchaseOrders[]> {
    return this.prisma.purchaseOrders.findMany({include: {purchase_order_line_items: true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrder`;
  }

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  async remove(id: number) {
    const deletePO = await this.prisma.purchaseOrders.delete({
      where: {
        id: id
      }
    })
    return deletePO;
    //return `This action removes a #${id} purchaseOrder`;
  }
}
