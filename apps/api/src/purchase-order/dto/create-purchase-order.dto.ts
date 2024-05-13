// import { IsNotEmpty, IsString } from 'class-validator';

import { PurchaseOrderLineItems } from "@prisma/client";


export class CreatePurchaseOrderDto {
    vendor_name: string;
    order_date: Date;
    expected_delivery_date: Date;

    // created_at:            Date;
    // updated_at:             Date;

//   purchase_order_line_items: PurchaseOrderLineItems[];

}
