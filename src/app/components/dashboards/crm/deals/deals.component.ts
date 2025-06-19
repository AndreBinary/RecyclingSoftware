import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbInputDatepickerConfig, NgbCalendar, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { DragDropModule,CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SharedModule } from '../../../../shared/shared.module';
@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [SharedModule,NgbModule,FormsModule,ReactiveFormsModule,FlatpickrModule,DragDropModule],
  providers:[FlatpickrDefaults],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent {
  model!: NgbDateStruct;
  closeResult!: string;

  basicDemoValue = '2017-01-01';

	constructor(private modalService: NgbModal, private config: NgbInputDatepickerConfig, calendar: NgbCalendar) {
    
  }
  
  openWindowCustomClass(content:any) {
		this.modalService.open(content, { windowClass: 'dark-modal', centered:true });
	}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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


  col1 = [
    ` <div class="card custom-card">
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/12.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Service Upgrade</div>
            </div>
            <div>$5000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Spruko Technologies</a>
            </div>
            <div class="text-muted fs-12">24,Jun 2023 - 12:45PM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card"  >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/5.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Product Demo</div>
            </div>
            <div>$50,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Acme Corporation LTD</a>
            </div>
            <div class="text-muted fs-12">18,Apr 2023 - 11:22AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card"  >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/15.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Website Redesign</div>
            </div>
            <div>$20,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Embark Technologies</a>
            </div>
            <div class="text-muted fs-12">12,Jul 2023 - 10:15AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card"  >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/6.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Consulting Services</div>
            </div>
            <div>$10,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Adam Johnson</a>
            </div>
            <div class="text-muted fs-12">29,Jul 2023 - 4:45PM</div>
        </div>
    </div>
</div>`
  ]
  col2 = [
    `  <div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/11.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Event Sponsorship</div>
            </div>
            <div>$10,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Initech Info</a>
            </div>
            <div class="text-muted fs-12">21,May 2023 - 10:25AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card"   >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/11.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Sales Training</div>
            </div>
            <div>$6,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Soylent Corp</a>
            </div>
            <div class="text-muted fs-12">10,May 2023 - 9:20AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/14.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Content Creation</div>
            </div>
            <div>$3,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Hooli Technologies</a>
            </div>
            <div class="text-muted fs-12">25,Aug 2023 - 3:38PM</div>
        </div>
    </div>
</div>`
  ]
  col3 = [
    `<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/3.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">E-commerce Integration</div>
            </div>
            <div>$12,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Spice Infotech</a>
            </div>
            <div class="text-muted fs-12">15,Sep 2023 - 8:32PM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/16.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Ad Campaign</div>
            </div>
            <div>$5,500</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Umbrella Corp</a>
            </div>
            <div class="text-muted fs-12">17,Jun 2023 - 10:54AM</div>
        </div>
    </div>
</div>`
  ]
  col4 = [
    ` <div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/10.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Webinar Series</div>
            </div>
            <div>$9,500</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Massive Dynamic</a>
            </div>
            <div class="text-muted fs-12">16,May 2023 - 11:22AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/13.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">SEO Audit</div>
            </div>
            <div>$3,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Logitech ecostics</a>
            </div>
            <div class="text-muted fs-12">27,Apr 2023 - 5:15PM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/8.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Loyalty Program</div>
            </div>
            <div>$12,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">Globex Corp</a>
            </div>
            <div class="text-muted fs-12">26,Jul 2023 - 5:28AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/9.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">CRM Integration</div>
            </div>
            <div>$10,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">CrystalClear Consulting</a>
            </div>
            <div class="text-muted fs-12">14,May 2023 - 11:29PM</div>
        </div>
    </div>
</div>`
  ]
  col5 = [
    `<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/16.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Media Analytics</div>
            </div>
            <div>$9,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">GlobalConnect</a>
            </div>
            <div class="text-muted fs-12">18,Mar 2023 - 2:32PM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded bg-light">
                        <img src="./assets/images/faces/21.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Lead Nurturing Strategy</div>
            </div>
            <div>$4,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">AlphaTech Solutions</a>
            </div>
            <div class="text-muted fs-12">16,Jul 2023 - 7:53AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        PL
                    </span>
                </div>
                <div class="fs-14">Website Maintenance</div>
            </div>
            <div>$7,500</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">RedRock Industries</a>
            </div>
            <div class="text-muted fs-12">30,Jul 2023 - 6:30AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/2.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Newsletter Campaign</div>
            </div>
            <div>$2,500</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">CoreTech Solutions</a>
            </div>
            <div class="text-muted fs-12">12,May 2023 - 10:22AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/17.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Graphic Design</div>
            </div>
            <div>$5,000</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">TechPro Services</a>
            </div>
            <div class="text-muted fs-12">10,Jul 2023 - 10:15PM</div>
        </div>
    </div>
</div>`
  ]
  col6 = [
    `<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/1.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">CRM Training</div>
            </div>
            <div>$4,200</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">BlueSky Industries</a>
            </div>
            <div class="text-muted fs-12">15,May 2023 - 8:20AM</div>
        </div>
    </div>
</div>`,
`<div class="card custom-card" >
    <div class="card-body">
        <div class="d-flex align-items-center fw-semibold justify-content-between gap-1 flex-wrap">
            <div class="d-flex align-items-center gap-2">
                <div class="lh-1">
                    <span class="avatar avatar-sm avatar-rounded">
                        <img src="./assets/images/faces/10.jpg" alt="">
                    </span>
                </div>
                <div class="fs-14">Market Research</div>
            </div>
            <div>$10,500</div>
        </div>
        <div class="deal-description">
            <div class="my-1">
                <a href="javascript:void(0);" class="company-name">BrightStar Solutions</a>
            </div>
            <div class="text-muted fs-12">28,Jun 2023 - 9:27PM</div>
        </div>
    </div>
</div>`
  ]
}
