import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsersComponent } from './Pages/users/users.component';
import { ProductComponent } from './Pages/product/product.component';
import { SalesComponent } from './Pages/sales/sales.component';
import { SalesHistoryComponent } from './Pages/sales-history/sales-history.component';
import { ReportComponent } from './Pages/report/report.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path: 'dashboard', component: DashBoardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'product', component: ProductComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'sales-history', component: SalesHistoryComponent},
    {path: 'report', component: ReportComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
