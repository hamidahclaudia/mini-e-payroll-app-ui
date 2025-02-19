import { Allowance } from './allowance.model';
import { Deduction } from './deduction.model';

export interface Payslip {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string; 
  basicSalary: number;
  allowances: Allowance[];
  deductions: Deduction[];
  netSalary: number;
}
