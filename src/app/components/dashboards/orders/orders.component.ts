import {Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import {  NgbModal, NgbModule, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../shared/data/dashboard_chartData/salechart.data';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule,SharedModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatStepperModule,CommonModule,NgApexchartsModule,NgbModule,FlatpickrModule,
    NgbModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent  {
  public chartOptions = StatisticsChartData;
  public chartOptions1 = StatisticsChartData1;
  public chartOptions2 = TopCategoryChartData;
  renderer: any;
  is_view_edit_add:any;
  bin_types:any[]=[{
    type:'4M bin',
    id:1
  },
{
    type:'2M bin',
    id:2
  }];
  
  order:any;
  orders:any[] = [{
    id: 1,
    customer_name: 'John Doe',
    order_date: new Date(),
    quantity: 2,
    status: 'Shipped'
  },
{
    id: 2,
    customer_name: 'John Doe',
    order_date: new Date(),
    quantity: 4,
    status: 'Awaiting Payment'
  }];

  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

   active: any;
	disabled = true;
  
  basicDemoValue = '';

  onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 1) {
			changeEvent.preventDefault();
		}
	}

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

     
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    forthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  contactForm!: FormGroup;
  jobForm!: FormGroup;
  educationForm!: FormGroup;

  nextTab(tabIndex: number) {
    switch (tabIndex) {
      case 1:
        if (this.contactForm.valid) {
          // Proceed to next tab
          break;
        } else {
          // Handle form validation error
          return;
        }
      // Handle validation for other tabs similarly
    }
  }
  
  ngOnDestroy(){
    document.querySelector('.single-page-header')?.classList.remove('d-none');
  }

  viewOrder(z:any) {
    this.is_view_edit_add=2;
    this.modalService.open(z, { size: 'lg', centered: true, backdrop: 'static' });
  }
  editOrder(z:any) {
    this.is_view_edit_add=3;
    this.modalService.open(z, { size: 'lg', centered: true, backdrop: 'static' });
  }
  deleteOrder(z:any) {
   this.is_view_edit_add=4;
    this.modalService.open(z, { size: 'lg', centered: true, backdrop: 'static' });
  }
  addOrder(z:any) {
    this.is_view_edit_add=1;
    this.modalService.open(z, { size: 'lg', centered: true, backdrop: 'static' });
    this.order = [{
    id:0,
    customer_id:0,
    customer_name:'',
    address_details:[{
      id:0,
      name:0,
      address1:'',
      address2:'',
      city:'',
      province:'',
      zip:'',
      country:'South Africa'
    }],
    order_items:[{
      id:0,
      quantity:0,
      bin_type:'',
      bin_type_id:0,
      from_date:'',
      to_date:''
    }]
  }]
  }

add_order_row(){
  this.order.push({
    id:0,
    customer_id:0,
    customer_name:'',
    address_details:[{
      id:0,
      name:0,
      address1:'',
      address2:'',
      city:'',
      province:'',
      zip:'',
      country:'South Africa'
    }],
    order_items:[{
      id:0,
      quantity:0,
      bin_type:'',
      bin_type_id:0,
      from_date:'',
      to_date:''
    }]
  })
}

add_order_item_row(i:any,j:any){
 this.order[i].order_items.push({
      id:0,
      quantity:0,
      bin_type:'',
      bin_type_id:0,
      from_date:'',
      to_date:''
    }
  )
}

remove_order_item_row(i:any,j:any){
  if(this.order[i].order_items.length>1){
  this.order[i].order_items.splice(1,j)
  }
}

}