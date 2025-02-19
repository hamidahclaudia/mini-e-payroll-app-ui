export interface Salary {
    id: number;
    employeeId: number;
    employeeName: string;
    salaryDate: Date; 
    basicSalary: number;
    totalAllowances: number;
    totalDeductions: number;
    netSalary: number; 
}


export interface SalaryRequest {
  employeeIds: number[],
  salaryDate: Date
}

export interface SalaryRespond {
  id: number,
  employeeId: number,
  salaryDate: Date,
  totalSalary: number
}

export interface ProcessedEmployeeRespond {
  id: number,
  employeeId: number,
  employeeName: string,
  salaryDate: Date,
  totalSalary: number
}


  
  