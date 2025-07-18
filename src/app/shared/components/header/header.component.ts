import { ChangeDetectorRef, Component, ElementRef, HostListener, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SwitcherComponent } from '../switcher/switcher.component';
import { AppStateService } from '../../services/app-state.service';
import { GlobalSearchService } from '../../../shared/global-search.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
  
  updateTheme(theme: string) {
    this.appStateService.updateState({ theme , menuColor:theme });
    if(theme=='light'){
      this.appStateService.updateState({ theme,themeBackground : '',headerColor:'transparent',menuColor:'light' });
      let html = document.querySelector('html');
        html?.style.removeProperty( '--body-bg-rgb');
        html?.style.removeProperty( '--body-bg-rgb2');
        html?.style.removeProperty( '--light-rgb');
        html?.style.removeProperty( '--form-control-bg');
        html?.style.removeProperty( '--input-border' );
        // html?.style.removeProperty('--primary');
        html?.setAttribute('data-toggled','close')
        html?.style.removeProperty('--primary-rgb');
      }
    if(theme=='dark'){
      this.appStateService.updateState({ theme,themeBackground : '',headerColor:'transparent',menuColor:'dark' });
      let html = document.querySelector('html');
        html?.style.removeProperty( '--body-bg-rgb');
        html?.style.removeProperty( '--body-bg-rgb2');
        html?.style.removeProperty( '--light-rgb');
        html?.style.removeProperty( '--form-control-bg');
        html?.style.removeProperty( '--input-border' );
        // html?.style.removeProperty('--primary');
        html?.setAttribute('data-toggled','close')
        html?.style.removeProperty('--primary-rgb');
      
    }
  }
   public localdata:any;

  globalSearchTerm = '';
  constructor(
    private cdr: ChangeDetectorRef, 
    public elementRef: ElementRef,
    private globalSearch: GlobalSearchService,
    private appStateService: AppStateService,
  ){
    this.appStateService.state$.subscribe(state => {
      this.localdata = state;
    }); 
  }

  onGlobalSearchChange(term: string) {
    this.globalSearch.setSearchTerm(term);
  }

  openSm(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' });
	}

  toggleSidebar() {
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (html?.getAttribute('data-toggled') == 'true') {
      document.querySelector('html')?.getAttribute('data-toggled') ==
        'icon-overlay-close';
    }
    else if (html?.getAttribute('data-nav-style') == 'menu-click') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'menu-click-closed'
          ? ''
          : 'menu-click-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'menu-hover') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'menu-hover-closed'
          ? ''
          : 'menu-hover-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'icon-click') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-click-closed'
          ? ''
          : 'icon-click-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'icon-hover') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-hover-closed'
          ? ''
          : 'icon-hover-closed'
      );
    }
    else if (html?.getAttribute('data-vertical-style') == 'overlay') {
      html?.setAttribute(
        'data-vertical-style','overlay' 
      );
      html?.setAttribute(
        'data-toggled', html?.getAttribute('data-toggled') == 'icon-overlay-close'
        ? ''
        : 'icon-overlay-close'
      );
    } else if (html?.getAttribute('data-vertical-style')  == 'overlay') {
      document.querySelector('html')?.getAttribute('data-toggled') != null
        ? document.querySelector('html')?.removeAttribute('data-toggled')
        : document
            .querySelector('html')
            ?.setAttribute('data-toggled', 'icon-overlay-close');
    } else if (html?.getAttribute('data-vertical-style') == 'closed') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'close-menu-close'
          ? ''
          : 'close-menu-close'
      );
    } else if (html?.getAttribute('data-vertical-style') == 'icontext') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-text-close'
          ? ''
          : 'icon-text-close'
      );
    } else if (html?.getAttribute('data-vertical-style') == 'detached') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'detached-close'
          ? ''
          : 'detached-close'
      );
    }else if (html?.getAttribute('data-vertical-style') == 'doublemenu') {
      html?.setAttribute('data-toggled', html?.getAttribute('data-toggled') == 'double-menu-close' && document.querySelector(".slide.open")?.classList.contains("has-sub")? 'double-menu-open': 'double-menu-close' );
    } 

    if (window.innerWidth <= 992) {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'open' ? 'close' : 'open'
      );
    }
  }


  handleCardClick(event: MouseEvent) {
    // Prevent the click event from propagating to the container
    event.stopPropagation();
  }

  isCartEmpty: boolean = false;
  isNotifyEmpty: boolean = false;

  cartItemCount: number = 5;
  notificationCount: number = 5;

  removeCart(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();
    }
    this.cartItemCount--;
    this.isCartEmpty = this.cartItemCount === 0;
  }

  removeNotify(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();
    }
    this.notificationCount--;
    this.isNotifyEmpty = this.notificationCount === 0;
  }
  isFullscreen: boolean = false;
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
  
  private offcanvasService = inject(NgbOffcanvas);
  toggleSwitcher() {
    this.offcanvasService.open(SwitcherComponent, {
      position: 'end',
      scroll: true,
    });
  }

 // Addding sticky-pin
 scrolled = false;

 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.scrolled = window.scrollY > 10;

   const sections = document.querySelectorAll('.side-menu__item');
   const scrollPos =
     window.pageYOffset ||
     document.documentElement.scrollTop ||
     document.body.scrollTop;

   sections.forEach((ele, i) => {
     const currLink = sections[i];
     const val: any = currLink.getAttribute('value');
     const refElement: any = document.querySelector('#' + val);

     // Add a null check here before accessing properties of refElement
     if (refElement !== null) {
       const scrollTopMinus = scrollPos + 73;
       if (
         refElement.offsetTop <= scrollTopMinus &&
         refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
       ) {
         document.querySelector('.nav-scroll')?.classList.remove('active');
         currLink.classList.add('active');
       } else {
         currLink.classList.remove('active');
       }
     }
   });
 }

 eventTriggered: boolean = false;
  screenWidth!: number;
  
 @HostListener('window:resize', ['$event'])
 onResize(event: any): void {
   this.menuResizeFn();

   this.screenWidth = window.innerWidth;

   // Check if the event hasn't been triggered and the screen width is less than or equal to your breakpoint
   if (!this.eventTriggered && this.screenWidth <= 992) {
     document.documentElement?.setAttribute('data-toggled', 'close')


     // Trigger your event or perform any action here
     this.eventTriggered = true; // Set the flag to true to prevent further triggering
   } else if (this.screenWidth > 992) {
     // Reset the flag when the screen width goes beyond the breakpoint
     this.eventTriggered = false;
   }
 }
 WindowPreSize: number[] = [window.innerWidth];
 menuResizeFn(): void {
   this.WindowPreSize.push(window.innerWidth);

   if (this.WindowPreSize.length > 2) {
     this.WindowPreSize.shift();
   }

   if (this.WindowPreSize.length > 1) {
     const html = document.documentElement;

     if (this.WindowPreSize[this.WindowPreSize.length - 1] < 992 && this.WindowPreSize[this.WindowPreSize.length - 2] >= 992) {
       // less than 992
       html.setAttribute('data-toggled', 'close');
     }

     if (this.WindowPreSize[this.WindowPreSize.length - 1] >= 992 && this.WindowPreSize[this.WindowPreSize.length - 2] < 992) {
       // greater than 992
       html.removeAttribute('data-toggled');
       document.querySelector('#responsive-overlay')?.classList.remove('active');
     }
   }
 }
 
}