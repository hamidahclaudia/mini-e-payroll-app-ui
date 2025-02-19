import { Routes } from '@angular/router';
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { SalaryListComponent } from './modules/salary/salary-list/salary-list.component';
import { PayslipListComponent } from './modules/payslip/payslip-list/payslip-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' }, 
  { path: 'employee', component: EmployeeListComponent },
  { path: 'salary', component: SalaryListComponent },
  { path: 'payslip', component: PayslipListComponent },
];
