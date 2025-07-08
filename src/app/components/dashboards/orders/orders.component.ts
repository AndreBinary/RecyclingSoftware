import {Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import {  NgbModal, NgbModule, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FemaleUserData, StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../shared/data/dashboard_chartData/salechart.data';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, Subscription } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { GlobalSearchService } from '../../../shared/global-search.service';
import { MatDatepickerModule } from '@angular/material/datepicker';


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
  address:any;
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
  
  order: any = null;
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


   active: any;
	disabled = true;
  
  basicDemoValue = '';

  filterText: string = '';
  filteredOrders: any[] = [];
  globalSearchSub: Subscription;

  onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 1) {
			changeEvent.preventDefault();
		}
	}

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private globalSearch: GlobalSearchService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterOrders(term);
    });
  }

  openAddressSection=false;
  openCustomerSection=false;
//add Address
addAddress(){

}
  //validate address
  validate_address(){
    if(this.order.address_details[0].name === "New Address" || this.order.address_details[0].name === "Add Address"||
      this.order.address_details[0].name === 'New' || this.order.address_details[0].name === 'Add'|| this.order.address_details[0].name === '+'
    ) {
      this.openAddressSection =true;
    }
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
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  ngOnInit() {
    this.filteredOrders = this.orders.slice();
  }

  filterOrders(term: string) {
    if (!term) {
      this.filteredOrders = this.orders.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredOrders = this.orders.filter(order =>
        (order.customer_name && order.customer_name.toLowerCase().includes(filter)) ||
        (order.status && order.status.toLowerCase().includes(filter)) ||
        (order.id + '').includes(filter)
      );
    }
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
  addOrder(z: any) {
    this.is_view_edit_add = 1;
    this.modalService.open(z, { size: 'lg', centered: true, backdrop: 'static' });
    this.order = {
      id: 0,
      customer_id: 0,
      customer_name: '',
      address_details: [{
        id: 0,
        name: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        zip: '',
        country: 'South Africa'
      }],
      order_items: [
        {
          id: 0,
          quantity: 0,
          bin_type: '',
          bin_type_id: 0,
          from_date: '',
          from_date_valid: 0,
          to_date_valid: 0,
          to_date: ''
        }
      ]
    };
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
      to_date:'',
          to_date_valid:0,
    from_date_valid:0
    }]
  })
}

add_order_item_row() {
  this.order.order_items.push({
    id: 0,
    quantity: 0,
    bin_type: '',
    bin_type_id: 0,
    from_date: '',
    to_date: '',
    to_date_valid: 0,
    from_date_valid: 0
  });
}

remove_order_item_row(j: number) {
  if (this.order.order_items.length > 1) {
    this.order.order_items.splice(j, 1);
  }
}
trackByIndex(index: number, item: any): number {
  return index;
}
}