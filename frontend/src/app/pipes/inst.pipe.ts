import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inst', // Novi naziv pipe-a
  standalone: false
})
export class InstPipe implements PipeTransform {
  transform<T>(items: T[], property: string, isAscending: boolean = true): T[] {
    if (!items || !property) return items;

    return items.sort((a, b) => {
      const valueA = this.resolveNestedProperty(a, property);
      const valueB = this.resolveNestedProperty(b, property);

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
      return 0;
    });
  }

  private resolveNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }
}
