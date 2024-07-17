import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'HyphenPipe', standalone: true})

export class RemoveHyphen implements PipeTransform{
    transform(value: string) : string {
        if(value.includes('-')){
            return value.replace('-', ' ')
        }else{
            return value
        }      
    }

}