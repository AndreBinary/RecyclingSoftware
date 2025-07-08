import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { GlobalSearchService } from '../../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule,ReactiveFormsModule, RouterModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [
    { firstName: 'John', lastName: 'Doe', mobile: '1234567890', email: 'john.doe@email.com', active: true },
    { firstName: 'Jane', lastName: 'Smith', mobile: '0987654321', email: 'jane.smith@email.com', active: false },
    { firstName: 'Alice', lastName: 'Brown', mobile: '5551234567', email: 'alice.brown@email.com', active: true },
    { firstName: 'Bob', lastName: 'Johnson', mobile: '4449876543', email: 'bob.johnson@email.com', active: true },
    { firstName: 'Carol', lastName: 'White', mobile: '3332221111', email: 'carol.white@email.com', active: false }
  ];
  customer:any={
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    active: true,
    is_business:false,
    business:[{
      id:0,
      name:'',
      type:'',
      email:'',
      phone:'',
      address_id:'',
      is_taxable:false,
      tax_number:'',
      additional_information:'',
      vat_number:'',
      registration_number:'',
      business_description:'',
      business_logo:''
    }],
    addresses:[{
      id:0,
      name:'Home',
      address_1:'',
      address_2:'',
      city:'',
      province:'',
      zip_code:'',
      country:'South Africa',
      address_description:'',
      type:'home',
    }],
    saved_addresses:[{
      id:0,
      name:'Home',
      address_1:'',
      address_2:'',
      city:'',
      province:'',
      zip_code:'',
      country:'South Africa',
      address_description:'',
      type:'house'
    },
  {
      id:0,
      name:'Business',
      address_1:'',
      address_2:'',
      city:'',
      province:'',
      zip_code:'',
      country:'South Africa',
      address_description:'',
      type:'business'
    }]
  };
  filteredCustomers: any[] = [];
  pagedCustomers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  globalSearchSub: Subscription;
  editCustomerForm: any = { firstName: '', lastName: '', mobile: '', email: '', active: true };
  editingIndex: number | null = null;
  is_business=false;
  showAddCustomerModal = false;
  activeTab = 1;

  constructor(private globalSearch: GlobalSearchService, private modalService: NgbModal) {
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterCustomers(term);
    });
    this.filteredCustomers = this.customers.slice();
    this.paginateCustomers();
  }

  ngOnInit() {
  }

  is_business_switch(){
    if(this.is_business===true){
      this.is_business=false;
    }else{
      this.is_business=true;
    }
  }

  filterCustomers(term: string) {
    if (!term) {
      this.filteredCustomers = this.customers.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredCustomers = this.customers.filter(c =>
        (c.firstName && c.firstName.toLowerCase().includes(filter)) ||
        (c.lastName && c.lastName.toLowerCase().includes(filter)) ||
        (c.mobile && c.mobile.toLowerCase().includes(filter)) ||
        (c.email && c.email.toLowerCase().includes(filter)) ||
        (typeof c.active === 'boolean' && (c.active ? 'active' : 'inactive').includes(filter))
      );
    }
    this.currentPage = 1;
    this.paginateCustomers();
  }

  paginateCustomers() {
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCustomers = this.filteredCustomers.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateCustomers();
  }

  setPageSize(size: number) {
    this.pageSize = Math.max(1, +size || 1);
    this.currentPage = 1;
    this.paginateCustomers();
  }

  ngOnDestroy() {
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  addCustomer(modalRef: any) {
    this.modalService.open(modalRef, { size: 'lg', centered: true });
    this.activeTab = 1;
    this.showAddCustomerModal = true;
  }

  closeAddCustomerModal() {
    this.showAddCustomerModal = false;
  }

  is_customer_business_taxable_switch(){
    if(this.customer.business.is_taxable===false){
      this.customer.business.is_taxable=true;
    }else{
      this.customer.business.is_taxable=false;
    }
  }
    

  saveCustomer() {
  
  }

  openEditCustomer(modalRef: any, customer: any, index: number) {
    this.editingIndex = index;
    this.editCustomerForm = { ...customer };
    this.modalService.open(modalRef, { size: 'md',centered:true });
  }

  saveEditCustomer(modalRef: any) {
    if (
      this.editCustomerForm.firstName &&
      this.editCustomerForm.lastName &&
      this.editCustomerForm.mobile &&
      this.editCustomerForm.email &&
      this.editingIndex !== null
    ) {
      this.customers[this.editingIndex] = { ...this.editCustomerForm };
      this.filterCustomers('');
      modalRef.close();
      this.editingIndex = null;
    }
  }

  resetCustomerForm() {
    this.customer = {
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      is_business: false
    };
  }


}
