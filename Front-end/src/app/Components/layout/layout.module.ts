import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsersComponent } from './Pages/users/users.component';
import { ProductComponent } from './Pages/product/product.component';
import { SalesComponent } from './Pages/sales/sales.component';
import { SalesHistoryComponent } from './Pages/sales-history/sales-history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SharedModule } from '../../Reusable/shared/shared.module';
import { ModalUsersComponent } from './Modals/modal-users/modal-users.component';
import { ModalProductComponent } from './Modals/modal-product/modal-product.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    UsersComponent,
    ProductComponent,
    SalesComponent,
    SalesHistoryComponent,
    ReportComponent,
    ModalUsersComponent,
    ModalProductComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
