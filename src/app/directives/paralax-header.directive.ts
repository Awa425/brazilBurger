import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParalaxHeader]'
})
export class ParalaxHeaderDirective{
  header: any;
  headerHeight: number;
  moveImage: number;
  scaleImage: number;

  constructor(public element: ElementRef, public rendere: Renderer2, private domController: DomController) { }

  ngOnInit(): void {
      let content = this.element.nativeElement;
      this.header = content.getElementByClassName('paralax-image')[0];
      this.domController.read(
        ()=>{
              this.headerHeight = this.header.clientHeight;
            }
      )  
  }
  @HostListener('ionScroll', ['$event']) onContentScroll($event){
    const scrollTop = $event.detail.scrollTop;
    console.log(scrollTop);
    this.domController.write(
      ()=> {
        if(scrollTop>0){
          this.moveImage = scrollTop / 1;
          this.scaleImage = 1;
        }else{

        }
        this.rendere.setStyle(this.header, 'webkitTransform',
        'translate3d(0,'+this.moveImage+'px,0) scale('+this.scaleImage+','+this.scaleImage+')');
      }
    )
    
  }
}
