import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParalaxHeader]'
})
export class ParalaxHeaderDirective{

  constructor(public element: ElementRef, public rendere: Renderer2, private domController: DomController) { }

}
