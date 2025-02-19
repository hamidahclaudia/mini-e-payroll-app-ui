import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { formatDateToUTC } from '../utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5026/api/employee';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getEmployees(
    name?: string,
    dob?: string,
    status?: string,
    sortField: string = 'FullName',
    sortDirection: string = 'asc'
  ): Observable<Employee[]> {
    let params = new HttpParams()
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);

    if (name) params = params.set('name', name);
    if (dob) params = params.set('dob', dob);
    if (status) params = params.set('status', status);

    return this.http.get<Employee[]>(`${this.baseUrl}`, { params });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const formattedEmployee = {
      ...employee,
      dob: formatDateToUTC(employee.dob),
      joinDate: formatDateToUTC(employee.joinDate),
      resignDate: employee.resignDate ? formatDateToUTC(employee.resignDate) : null
    };

    return this.http.post<Employee>(this.baseUrl, formattedEmployee, { headers: this.getHeaders() });
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    const formattedEmployee = {
      ...employee,
      dob: formatDateToUTC(employee.dob),
      joinDate: formatDateToUTC(employee.joinDate),
      resignDate: employee.resignDate ? formatDateToUTC(employee.resignDate) : null
    };

    return this.http.put<void>(`${this.baseUrl}/${id}`, formattedEmployee, { headers: this.getHeaders() });
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
