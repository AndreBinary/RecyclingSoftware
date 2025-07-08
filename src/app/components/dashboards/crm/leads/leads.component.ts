import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/shared.module';
import { GlobalSearchService } from '../../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,FormsModule],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
// Select1
selectedSimpleItem='Select Status';
simpleItems:any=[];
//Select2
selectedSimpleItem1='Social media';
simpleItems1:any=[];
// select3
selectedSimpleItem2='Social media';
simpleItems2:any=[];


closeResult!: string;

openWindowCustomClass(content: any) {
  this.modalService.open(content, { windowClass: 'dark-modal' });
}

InvoiceData = [
  {
    img: './assets/images/faces/4.jpg',
    name: 'Lisa Convay',
    Date: '24, Jul 2023 - 4:45PM',
    Status: 'New',
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
    Status: 'Follow-up',
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
    Status: 'Follow-up',
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
    Status: 'Closed',
    mail: 'kiaraadvain290@gmail.com',
    Phone: '1603-2032-1123',
    logo:'./assets/images/company-logos/5.png',
    Company:'Affiliates',
    Source2:'LostCustomer',
    tag1:'LostCustomer',
    tag2:'Influencer',
    tagbg1:'light text-default',
    tagbg2:'danger-transparent'
  },
  {
    img: './assets/images/faces/8.jpg',
    name: 'Brenda Simpson',
    Status: 'Contacted',
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
    Status: 'New',
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
    Status: 'Follow-up',
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
    Status: 'Follow-up',
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
    Status: 'Disqualified',
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
    Status: 'Qualified',
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

filteredInvoiceData: any[] = [];
globalSearchSub: Subscription;

constructor(private modalService: NgbModal, private globalSearch: GlobalSearchService) {
  this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
    this.filterLeads(term);
  });
}

ngOnInit(): void {
  this.simpleItems=['Select Status','Closed','Contacted','Follow-up','New']
  this.simpleItems1=['Social media','Blog Articles','Direct Mail','Organic Serach','Affilites']
  this.simpleItems2=['Hopt Lead','InFluencer','LostCustomer','Newlead','Patner']
  this.filteredInvoiceData = this.InvoiceData.slice();
}

ngOnDestroy() {
  if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
}

filterLeads(term: string) {
    if (!term) {
      this.filteredInvoiceData = this.InvoiceData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredInvoiceData = this.InvoiceData.filter(item =>
        (item.name && item.name.toLowerCase().includes(filter)) ||
        (item.mail && item.mail.toLowerCase().includes(filter)) ||
        (item.Phone && item.Phone.toLowerCase().includes(filter)) ||
        (item.Company && item.Company.toLowerCase().includes(filter)) ||
        (item.Status && item.Status.toLowerCase().includes(filter)) ||
        (item.Source2 && item.Source2.toLowerCase().includes(filter)) ||
        (item.tag1 && item.tag1.toLowerCase().includes(filter)) ||
        (item.tag2 && item.tag2.toLowerCase().includes(filter))
      );
    }
  }

}
