import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbOffcanvas, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../../../../shared/shared.module';
import { GlobalSearchService } from '../../../../shared/global-search.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,FormsModule,FlatpickrModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  basicDemoValue = '2017-01-01';
 // select 
 selectedSimpleItem='Blog Articles';
 simpleItems:any=[]
 // select2
 selectedSimpleItem1='Select Tag';
 simpleItems1:any=[]

 filteredInvoiceData: any[] = [];
 globalSearchSub: Subscription;

 constructor(private offcanvasService: NgbOffcanvas, private modalService: NgbModal, private globalSearch: GlobalSearchService) {
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterContacts(term);
    });
  }

  ngOnInit(): void {
    this.filteredInvoiceData = this.InvoiceData.slice();
  }

  ngOnDestroy() {
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  filterContacts(term: string) {
    if (!term) {
      this.filteredInvoiceData = this.InvoiceData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredInvoiceData = this.InvoiceData.filter(item =>
        (item.name && item.name.toLowerCase().includes(filter)) ||
        (item.mail && item.mail.toLowerCase().includes(filter)) ||
        (item.Phone && item.Phone.toLowerCase().includes(filter)) ||
        (item.Company && item.Company.toLowerCase().includes(filter)) ||
        (item.Source2 && item.Source2.toLowerCase().includes(filter)) ||
        (item.tag1 && item.tag1.toLowerCase().includes(filter)) ||
        (item.tag2 && item.tag2.toLowerCase().includes(filter))
      );
    }
  }

 closeResult!: string;

 openWindowCustomClass(content: any) {
   this.modalService.open(content, { windowClass: 'dark-modal'  });
   
 }
 //Offcanavs 

 openEnd(content: TemplateRef<any>) {
   this.offcanvasService.open(content, { position: 'end' });
 }

 InvoiceData = [
   {
     img: './assets/images/faces/4.jpg',
     name: 'Lisa Convay',
     Date: '24, Jul 2023 - 4:45PM',
     Source1: ' 258',
     mail: 'lisaconvay2981@gmail.com',
     Phone: '4788-7822-4786',
     logo:'./assets/images/company-logos/1.png',
     Company:'Spruko Technologies',
     Source2:' Social Media',
     tag1:'New Lead',
     tag2:'Prospect',
     tagbg1:'primary-transparent',
     tagbg2:'primary-transparent'
   },
   {
     img: './assets/images/faces/12.jpg',
     name: 'Jacob Smith',
     Date: '15, Jul 2023 - 11:45AM',
     Source1: ' 335',
     mail: 'jacobsmith289@gmail.com',
     Phone: '8122-2342-4453',
     logo:'./assets/images/company-logos/3.png',
     Company:'Spice Infotech',
     Source2:' Direct mail',
     tag1:'Customer',
     tag2:'Hot Lead',
     tagbg1:'primary-transparent',
     tagbg2:'danger-transparent'
   },
   {
     img: './assets/images/faces/14.jpg',
     name: 'Jake Sully',
     Date: '10, Aug 2023 - 3:25PM',
     Source1: '685',
     mail: 'jakesully789@gmail.com',
     Phone: '1902-2001-3023',
     logo:'./assets/images/company-logos/4.png',
     Company:'Logitech ecostics',
     Source2:' Blog Articles',
     tag1:'Partner',
     tagbg1:'success-transparent',
    
   },
   {
     img: './assets/images/faces/6.jpg',
     name: 'Kiara Advain',
     Date: '18, Aug 2023 - 10:10AM',
     Source1: '425',
     mail: 'kiaraadvain290@gmail.com',
     Phone: '1603-2032-1123',
     logo:'./assets/images/company-logos/5.png',
     Company:'Affiliates',
     Source2:'LostCustomer',
     tag1:'LostCustomer', 
     tag2:'Influencer',
     tagbg1:'light text-default',
     tagbg2:'secondary-transparent'
   },
   {
     img: './assets/images/faces/8.jpg',
     name: 'Brenda Simpson',
     Date: '15, Jul 2023 - 4:15PM',
     Source1: '418',
     mail: 'brendasimpson1993@gmail.com',
     Phone: '1403-2052-1153',
     logo:'./assets/images/company-logos/6.png',
     Company:'Massive Dynamic',
     Source2:' Organic search',
     tag1:'Subscriber',
     tag2:'Partner',
     tagbg1:'success-transparent',
     tagbg2:'info-transparent'
   },
   {
     img: './assets/images/faces/9.jpg',
     name: 'Json Taylor',
     Date: '25, Jul 2023 - 3:05PM',
     Source1: ' 258',
     mail: 'jsontaylor345@gmail.com',
     Phone: '9945-2451-4567',
     logo:'./assets/images/company-logos/7.png',
     Company:'Globex Corporation',
     Source2:' Social Media',
     tag1:'Hot Lead',
     tag2:'Referral',
     tagbg1:'warning-transparent',
     tagbg2:'success-transparent'
   },
   {
     img: './assets/images/faces/15.jpg',
     name: 'Dwayne Jhonson',
     Date: '15, Jun 2023 - 1:48PM',
     Source1: '254',
     mail: 'wayenejhonson78@gmail.com',
     Phone: '1603-2032-1123',
     logo:'./assets/images/company-logos/8.png',
     Company:'Acme Corporation',
     Source2:' Blog Articles',
     tag1:'Trial User',
     tag2:'Cold Lead',
     tagbg1:'primary-transparent',
     tagbg2:'danger-transparent'
   },
   {
     img: './assets/images/faces/1.jpg',
     name: 'Emiley Jackson',
     Date: '11, Aug 2023 - 1:12PM',
     Source1: '154',
     mail: 'emileyjackson678@gmail.com',
     Phone: '9994-5764-5784',
     logo:'./assets/images/company-logos/9.png',
     Company:'Soylent Corp',
     Source2:' Organic search',
     tag1:'Influencer',
     tag2:'Partner',
     tagbg1:'warning-transparent',
     tagbg2:'pink-transparent'
   },
   {
     img: './assets/images/faces/3.jpg',
     name: 'Jessica Morris',
     Date: '28, Jul 2023 - 9:31AM',
     Source1: '345',
     mail: 'jessicamorris289@gmail.com',
     Phone: '1768-2332-4934',
     logo:'./assets/images/company-logos/10.png',
     Company:'Umbrella Corporation',
     Source2:'Affiliates',
     tag1:'New Lead',
     tag2:'Lost Customer',
     tagbg1:'primary-transparent',
     tagbg2:'danger-transparent'
   },
   {
     img: './assets/images/faces/2.jpg',
     name: 'Michael Jeremy',
     Date: '28, Jul 2023 - 9:31AM',
     Source1: '240',
     mail: 'michaeljeremy186@gmail.com',
     Phone: '4788-7822-4786',
     logo:'./assets/images/company-logos/9.png',
     Company:'Hooli Technologies',
     Source2:'Direct mail',
     tag1:'New Lead',
     tag2:'Subscriber',
     tagbg1:'success-transparent',
     tagbg2:'info-transparent'
   },
  
 ];

 DeleteClick(InvoiceData: any) {
   let filterData = this.InvoiceData.filter((ele) => {
     return ele.name != InvoiceData;
   });
   this.InvoiceData = filterData;
 }

 
 url1: string = ''; // Assuming url1 is a property in your component

 handleFileInput(event: any): void {
   const file = event.target.files[0];
   if (file) { 
     const reader = new FileReader();
     reader.onload = (e: any) => {
       this.url1 = e.target.result;
     };
     reader.readAsDataURL(file);
   }
 }
}

