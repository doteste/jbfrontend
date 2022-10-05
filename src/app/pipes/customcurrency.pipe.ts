import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customcurrency'
})
export class CustomcurrencyPipe extends CurrencyPipe implements PipeTransform {

    override transform(value: number | string | null | undefined): null;
    override transform(value: number | string | null | undefined): string | null {
      if (!this.isValue(value)) return null;
      const valueFormat = +value % 1 === 0 ? '1.0-0' : '1.2-2';
      return super.transform(value, 'USD', 'symbol', valueFormat);
    }

    isValue(value: number|string|null|undefined): value is number|string {
      return !(value == null || value === '' || value !== value);
    }

}
