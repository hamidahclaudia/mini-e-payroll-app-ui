import { Component, OnInit } from '@angular/core';
import { PayslipService } from '../../../services/payslip.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcessedEmployeeRespond } from '../../../models/salary.model';

@Component({
  selector: 'app-payslip-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payslip-list.component.html',
  styleUrl: './payslip-list.component.css'
})
export class PayslipListComponent implements OnInit {
  employees: ProcessedEmployeeRespond[] = [];
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];  

  constructor(private payslipService: PayslipService) {}

  ngOnInit(): void {
    this.fetchProcessedEmployees();
  }

  fetchProcessedEmployees(): void {
    this.payslipService.getProcessedEmployees(this.selectedYear, this.selectedMonth)
      .subscribe({
        next: (data) => this.employees = data,
        error: (err) => console.error('Error fetching processed employees:', err)
      });
  }

  downloadPayslip(employeeId: number): void {
    this.payslipService.getPayslip(employeeId, this.selectedYear, this.selectedMonth)
      .subscribe({
        next: async(htmlContent) => {
          const element = document.createElement('div');
          element.innerHTML = htmlContent;
          const html2pdf = (await import('html2pdf.js')).default;
          html2pdf()
          .from(element)
          .save(`Payslip_${employeeId}_${this.selectedYear}_${this.selectedMonth}.pdf`);
        },
        error: (error) => {
          console.error("Error downloading payslip:", error);
        }
      });
  }
  
  
}

