import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessedEmployeeRespond } from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  private baseUrl = 'http://localhost:5026/api/payslip';
  private salaryUrl = 'http://localhost:5026/api/salary';

  constructor(private http: HttpClient) { }

  // generated payslip
  getPayslip(employeeId: number, year: number, month: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${employeeId}/${year}/${month}?format=html`, {
      responseType: 'text'
    });
  }

  // get employee successful processed salary for given year and month
  getProcessedEmployees(year: number, month: number): Observable<ProcessedEmployeeRespond[]> {
    return this.http.get<any[]>(`${this.salaryUrl}?year=${year}&month=${month}`);
  }
}
