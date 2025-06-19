import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [SharedModule,NgbCollapseModule, NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  closeResult!: string;
  // Select
    selectedSimpleItem = 'Select Industry';
    simpleItems:any = [];
  
    // Select2
    selectedSimpleItem1 = 'Company Size';
    simpleItems1:any = [];

    constructor(private offcanvasService: NgbOffcanvas,private modalService: NgbModal) {}
    openWindowCustomClass(content: any) {
      this.modalService.open(content, { windowClass: 'dark-modal' });
    }
    openEnd(content: TemplateRef<any>) {
      this.offcanvasService.open(content, { position: 'end' });
    }
    ngOnInit(): void {
      this.simpleItems = ['Select Industry','Education',' HealthCare','Information Technology','Logistics'];
      this.simpleItems1 = ['Company Size','Corporate',' Large Enterprise','Micro Business','LogisMedium size'];
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
        bg:'primary-transparent',
        industry:'Information Technology',
        badge:'Corporate',
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
        bg:'danger-transparent',
        industry:'Telecommunications',
        badge:'Small Business',
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
        bg:'success-transparent',
        industry:'	Logistics',
        badge:'Micro Business',
       
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
        bg:'light text-default',
        industry:'Information Technology',
        badge:'Startup',
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
        bg:'pink-transparent',
        industry:'	Professional Services',
        badge:'Large Enterprise',
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
        bg:'danger-transparent',
        industry:'Education',
        badge:'Small Business',
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
        bg:'primary-transparent',
        industry:'Telecommunications',
        badge:'Corporate',
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
        bg:'warning-transparent',
        industry:'Manufacturing',
        badge:'Medium Size',
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
        bg:'success-transparent',
        industry:'	Healthcare',
        badge:'Micro Business',
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
        bg:'light text-default',
        industry:'Information Technology',
        badge:'Startup',
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
