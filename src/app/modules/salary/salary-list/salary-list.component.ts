import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../../services/salary.service';
import { Employee } from '../../../models/employee.model';
import { Salary, SalaryRequest } from '../../../models/salary.model';
import { NgFor, NgIf } from '@angular/common';
import { CustomCurrencyPipe } from '../../../pipes/custom-currency.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salary-list',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    CustomCurrencyPipe,
    FormsModule],
  templateUrl: './salary-list.component.html',
  styleUrl: './salary-list.component.css'
})
export class SalaryListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  salaryDate: string = "";
  processedSalaries: Salary[] = [];
  isProcessing = false;

  constructor(private salaryService: SalaryService) { }

  ngOnInit(): void {
    this.salaryDate = this.convertToInputDate(new Date())
    this.fetchEligibleEmployees();
  }

  fetchEligibleEmployees(): void {
    if (!this.salaryDate) {
      alert('Please select a salary date.');
      return;
    }

    this.salaryService.getEligibleEmployees(this.salaryDate)
      .subscribe({
        next: (data) => this.employees = data,
        error: (err) => console.error('Error fetching eligible employees:', err)
      });
  }

  toggleEmployeeSelection(employee: Employee): void {
    const index = this.selectedEmployees.indexOf(employee);
    if (index === -1) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
  }

  convertToInputDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; 
  }

  processSalary(): void {
    if (this.selectedEmployees.length === 0) {
      alert('Please select at least one employee to process salary.');
      return;
    }
    this.isProcessing = true;
    const salaryRequest: SalaryRequest = {
      employeeIds: this.selectedEmployees.map(emp => emp.id),
      salaryDate: new Date(this.salaryDate)
    }

    this.salaryService.processSalary(salaryRequest).subscribe({
      next: (data) => {
        alert('Salaries processed successfully!');
        this.processedSalaries = this.selectedEmployees.map(emp => {
          const salary = data.find(dt => dt.employeeId == emp.id);
          return {
            id: salary?.id || 0,
            employeeId: emp.id,
            employeeName: emp.fullName,
            basicSalary: emp.basicSalary,
            totalAllowances: this.getTotalAllowances(emp),
            totalDeductions: this.getTotalDeductions(emp),
            netSalary: salary?.totalSalary || 0,
            salaryDate: salary?.salaryDate || new Date()
          }
        })
        this.selectedEmployees = [];
      },
      error: (err) => console.error('Error processing salaries:', err),
      complete: () => this.isProcessing = false
    });
  }

  deleteSalary(id: number): void {
    if (confirm('Are you sure you want to delete this salary record?')) {
      this.salaryService.deleteSalary(id).subscribe({
        next: () => {
          this.processedSalaries = this.processedSalaries.filter(salary => salary.id !== id);
        },
        error: (err) => console.error('Error deleting salary:', err)
      });
    }
  }

  getTotalAllowances(emp: Employee): number {
    return emp.allowances ? emp.allowances.reduce((sum, a) => sum + a.amount, 0) : 0;
  }

  getTotalDeductions(emp: Employee): number {
    return emp.deductions ? emp.deductions.reduce((sum, d) => sum + d.amount, 0) : 0;
  }

}
