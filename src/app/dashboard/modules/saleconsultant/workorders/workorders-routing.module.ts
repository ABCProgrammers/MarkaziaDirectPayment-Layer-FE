import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { WorkOrdersComponent } from './workorders.component';

const routes: Routes = [
  { path: '', component: WorkOrdersComponent },
  { path: "details/:id", component: OrderDetailsComponent },
  //{ path: 'details/:type/:id', component: CollectDetailsComponent },
  { path: 'payment', component: ModalPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrdersRoutingModule {}
