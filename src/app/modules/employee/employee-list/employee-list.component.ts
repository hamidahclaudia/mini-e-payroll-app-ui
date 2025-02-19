import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { NgFor } from '@angular/common';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
import { CustomCurrencyPipe } from '../../../pipes/custom-currency.pipe';
import { convertToInputDate } from '../../../utils/date-utils'

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    CustomDatePipe,
    CustomCurrencyPipe,
    FormsModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filterName: string = '';
  filterDob: string = '';
  filterStatus: string = 'all';
  sortField: string = 'FullName';
  sortDirection: 'asc' | 'desc' = 'asc';
  showModal = false;
  editMode = false;
  employeeForm: Employee = new Employee();

  validationErrors: { [key: string]: string } = {};

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees(this.filterName, this.filterDob, this.filterStatus, this.sortField, this.sortDirection)
      .subscribe({
        next: (data) => this.employees = data,
        error: (err) => console.error('Error fetching employees:', err)
      });
  }

  applyFilters(): void {
    this.fetchEmployees();
  }

  changeSort(field: string): void {
    this.sortDirection = this.sortField === field ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortField = field;
    this.fetchEmployees();
  }

  openModal(employee?: Employee): void {
    this.showModal = true;
    this.editMode = !!employee;

    if (employee) {
      this.employeeForm = {
        ...employee,
        dob: employee.dob ? convertToInputDate(employee.dob) : '',
        joinDate: employee.joinDate ? convertToInputDate(employee.joinDate) : '',
        resignDate: employee.resignDate ? convertToInputDate(employee.resignDate) : ''
      };
    } else {
      this.employeeForm = new Employee();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  validateForm(): boolean {
    this.validationErrors = {};

    const today = new Date();
    const dob = new Date(this.employeeForm.dob);
    const joinDate = new Date(this.employeeForm.joinDate);
    const resignDate = this.employeeForm.resignDate ? new Date(this.employeeForm.resignDate) : null;

    // Check required fields
    if (!this.employeeForm.dob) {
      this.validationErrors['fullName'] = 'Full name is required.';
    }
    if (!this.employeeForm.dob) {
      this.validationErrors['dob'] = 'Date of Birth is required.';
    }
    if (!this.employeeForm.joinDate) {
      this.validationErrors['joinDate'] = 'Join Date is required.';
    }
    if (this.employeeForm.basicSalary === null || this.employeeForm.basicSalary === undefined) {
      this.validationErrors['basicSalary'] = 'Basic Salary is required.';
    }
    // Age validation (Must be above 18 years)
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18 || isNaN(dob.getTime())) {
      this.validationErrors['dob'] = 'Employee must be at least 18 years old with a valid date.';
    }

    // Resign date must be later than join date
    if (resignDate && resignDate < joinDate) {
      this.validationErrors['resignDate'] = 'Resign date must be later than the join date.';
    }

    // Basic salary must be a valid decimal number
    if (isNaN(this.employeeForm.basicSalary) || this.employeeForm.basicSalary < 0) {
      this.validationErrors['basicSalary'] = 'Basic salary must be a valid positive number.';
    }

    return Object.keys(this.validationErrors).length === 0; // Return true if no errors
  }

  saveEmployee(): void {
    console.log('save')
    if (!this.validateForm()) return;

    if (this.editMode) {
      this.employeeService.updateEmployee(this.employeeForm.id, this.employeeForm).subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.fetchEmployees();
          this.closeModal();
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      this.employeeService.addEmployee(this.employeeForm).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.fetchEmployees();
          this.closeModal();
        },
        error: (err) => console.error('Error adding employee:', err)
      });
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.fetchEmployees();
        },
        error: (err) => console.error('Error deleting employee:', err)
      });
    }
  }

  // Add new allowance
  addAllowance(): void {
    this.employeeForm.allowances.push({ id: 0, name: '', amount: 0 });
  }

  // Remove allowance
  removeAllowance(index: number): void {
    this.employeeForm.allowances.splice(index, 1);
  }

  // Add new deduction
  addDeduction(): void {
    this.employeeForm.deductions.push({ id: 0, name: '', amount: 0 });
  }

  // Remove deduction
  removeDeduction(index: number): void {
    this.employeeForm.deductions.splice(index, 1);
  }
}
