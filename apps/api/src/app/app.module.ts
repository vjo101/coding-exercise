import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ParentItemsModule} from "../parent-items/parent-items.module";
import {PurchaseOrderModule} from "../purchase-order/purchase-order.module";

// are these needed? No, these are already imported when we import the resource. each resource already has them imported in there own modules
// import { PurchaseOrderController } from '../purchase-order/purchase-order.controller';
// import { PurchaseOrderService } from '../purchase-order/purchase-order.service';

@Module({
  imports: [
    ParentItemsModule, PurchaseOrderModule
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {
}
