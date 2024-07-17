import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[seeMoreLess]',
})
export class MoreLessDirective {
    shortText!: string;
    toggleLink!: HTMLElement;
    fullDescription!: string;
    isExpanded: boolean = false;
    
    constructor(private _ElementRef: ElementRef, private _Renderer2: Renderer2) {}
    ngOnInit() {
        this.fullDescription = this._ElementRef.nativeElement.innerText;
        const descriptionArray = this.fullDescription.split(' ');
        if (descriptionArray.length > 4) {
            this.shortText = descriptionArray.slice(0, 4).join(' ') + '...';
            this._Renderer2.setProperty(this._ElementRef.nativeElement, 'innerText', this.shortText);
            this.addToggleLink();
        }
    }

    addToggleLink() {
        this.toggleLink = this._Renderer2.createElement('a');
        this._Renderer2.setStyle(this.toggleLink, 'color', '#987070');
        this._Renderer2.setStyle(this.toggleLink, 'cursor', 'pointer');
        this._Renderer2.setStyle(this.toggleLink, 'font-weight', 'bold');
        this.changeLinkText(' See More')
    }

    changeLinkText(text: string){
        this._Renderer2.setProperty(this.toggleLink, 'innerText', text);
        this._Renderer2.appendChild(this._ElementRef.nativeElement, this.toggleLink);
    }

    @HostListener('click', ['$event'])
    toggleLinkText() {
        if (this.isExpanded) {
            this._Renderer2.setProperty(this._ElementRef.nativeElement, 'innerText', this.shortText);
            this.isExpanded = false;
            this.changeLinkText(' See More');
        } else {
            this._Renderer2.setProperty(this._ElementRef.nativeElement, 'innerText', this.fullDescription);
            this.isExpanded = true;
            this.changeLinkText(' See Less');
        }
    }

}
