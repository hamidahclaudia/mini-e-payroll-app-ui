import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'yyyy-MM-dd'): string {
    if (!value) return '';

    let date: Date = typeof value === 'string' ? new Date(value) : value;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    switch (format) {
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'dd-MM-yyyy':
        return `${day}-${month}-${year}`;
      case 'yyyy/MM/dd':
        return `${year}/${month}/${day}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }
}
