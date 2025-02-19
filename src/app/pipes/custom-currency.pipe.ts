import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD', symbol: boolean = true): string {
    if (value == null) return '';

    let formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);

    if (!symbol) {
      formattedValue = formattedValue.replace(/[^0-9.,]/g, ''); // Remove currency symbol
    }

    return formattedValue;
  }
}
