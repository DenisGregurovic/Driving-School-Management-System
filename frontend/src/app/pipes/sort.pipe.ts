import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: false
})
export class SortPipe implements PipeTransform {
  transform<T>(items: T[], property: keyof T, isAscending: boolean = true): T[] {
    if (!items || !property) return items;

    return items.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
      return 0;
    });
  }
}
