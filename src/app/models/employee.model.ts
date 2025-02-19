import { Allowance } from './allowance.model';
import { Deduction } from './deduction.model';

export class Employee {
  id: number;
  fullName: string;
  dob: string; 
  gender: 'Male' | 'Female' | 'Other';
  joinDate: string;
  resignDate?: string | null; 
  basicSalary: number;
  allowances: Allowance[]; 
  deductions: Deduction[]; 

  constructor(data?: Partial<Employee>) {
    this.id = data?.id || 0;
    this.fullName = data?.fullName || '';
    this.dob = data?.dob || ''
    this.gender = data?.gender || 'Male';
    this.joinDate = data?.joinDate || '';
    this.resignDate = data?.resignDate || null;
    this.basicSalary = data?.basicSalary || 0;
    this.allowances = data?.allowances || [];
    this.deductions = data?.deductions || [];
  }
}
