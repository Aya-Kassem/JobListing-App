import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'CapitalizeFirstLetter'
})

export class CapitalizeFirstLetter implements PipeTransform {
    transform(str: string): string {
        str = str.toLocaleLowerCase();
        let strArray = str.split(' ');
        strArray = strArray.map((el) => {
            return el.charAt(0).toLocaleUpperCase() + el.slice(1);
        });

        return strArray.join(' ');
    }
}