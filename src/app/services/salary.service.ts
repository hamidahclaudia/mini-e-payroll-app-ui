import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary, SalaryRequest, SalaryRespond } from '../models/salary.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'http://localhost:5026/api/salary';
  private employeeUrl = 'http://localhost:5026/api/employee';

  constructor(private http: HttpClient) {}

  // Fetch eligible employees based on salary date (payday)
  getEligibleEmployees(payday: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeeUrl}/eligible?payday=${payday}`);
  }

  // Process salary for selected employees
  processSalary(salaryRequest: SalaryRequest): Observable<SalaryRespond[]> {
    return this.http.post<SalaryRespond[]>(`${this.baseUrl}/process`, salaryRequest);
  }

  // Delete processed salary by ID
  deleteSalary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
