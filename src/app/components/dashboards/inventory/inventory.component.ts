import {Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import {  NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../shared/data/dashboard_chartData/salechart.data';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RouterModule,CommonModule,SharedModule,NgApexchartsModule,NgbModule,FlatpickrModule,FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent  {
  edit_or_add_product = 'Add New Product';
  public chartOptions = StatisticsChartData;
  public chartOptions1 = StatisticsChartData1;
  inventoryItems:any[]=[{
    id: 1,
    name: 'Recycled Paper',
    category: 'Paper',
    quantity: 1500,
    unitPrice: 0.05,
    cbm: 0.05,
    totalValue: 75,
    lastUpdated: new Date('2023-10-01'),
    status: 'In Stock',
    imgUrl: 'https://i.imgur.com/GLqxxnn.png',
    branch_name: 'Branch A',
    location: 'Location 1'
  },
  {
    id: 2,
    name: 'Plastic Bottles',
    category: 'Plastic',
    quantity: 2000,
    cbm: 0.05,
    unitPrice: 0.02,
    totalValue: 40,
    lastUpdated: new Date('2023-10-02'),
    status: 'In Stock',
    imgUrl: 'https://i.imgur.com/GLqxxnn.png',
     branch_name: 'Branch B',
    location: 'Location 2'
  },
  {
    id: 3,
    name: 'Aluminum Cans',
    category: 'Metal',
    quantity: 1000,
    cbm: 0.05,
    unitPrice: 0.1,
    totalValue: 100,
    lastUpdated: new Date('2023-10-03'),
    status: 'In Stock',
    imgUrl: 'https://i.imgur.com/GLqxxnn.png',
     branch_name: 'Branch C',
    location: 'Location 3'
  }];

  product:any;


  chartOptions2: any = {
    series: [
      {
        name: 'Stock In',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Stock Out',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    colors: ["#546dfe", "#d77cf7"],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };
  chartOptions13 :any ={
  chart: {
    height: 275,
    type: 'radialBar',
    responsive: 'true',
},
plotOptions: {
    radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
            margin: 0,
            size: '68%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
        },

        dataLabels: {
            show: true,
            name: {
                offsetY: -10,
                show: true,
                color: 'var(--text-muted)',
                fontSize: '14px',
                fontWeight: '400'
            },
            value: {
                formatter: function (val:any) {
                    return parseInt(val);
                },
                color: '#111',
                fontSize: '36px',
                show: true,
            }
        }
    }
},
colors: ["rgb(215, 124, 247)", "var(--primary-color)"],
stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'round',
    colors: "#fff",
    width: 0,
    dashArray: 0,
},
fill: {
    type: 'gradient',
    gradient: {
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['var(--primary-color)'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
    }
},
series: [17529],
labels: ["Total CBM"]
 }
  chartOptions14: any = {
  series: [{
    name: "Sales Revenue",
    data: [20, 15, 38, 20, 24, 19, 53, 19, 21, 18, 36, 18, 60, 20]
}],
chart: {
    height: 320,
    type: 'line',
    zoom: {
        enabled: false
    },
    dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 0,
        blur: 6,
        color: 'rgb(244, 167, 66)',
        opacity: 0.8
    },
    toolbar: { show: false }
},
dataLabels: {
    enabled: false
},
legend: {
    show: true,
    position: "top",
    offsetX: 0,
    offsetY: 8,
    markers: {
        width: 5,
        height: 5,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
    },
},
stroke: {
    curve: 'smooth',
    width: '2',
},
grid: {
    borderColor: '#f5f4f4',
    strokeDashArray: 3
},
colors: ["rgb(244, 167, 66)"],
yaxis: {
    labels: {
        formatter: function (y:any) {
            return y.toFixed(0) + "";
        }
    }
},
xaxis: {
    type: 'week',
    categories: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.1', '1.2', '1.3', '1.4'],
    axisBorder: {
        show: true,
        color: 'rgba(119, 119, 142, 0.05)',
        offsetX: 0,
        offsetY: 0,
    },
    axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'rgba(119, 119, 142, 0.05)',
        width: 6,
        offsetX: 0,
        offsetY: 0
    },
    labels: {
        rotate: -90
    }
}
  }
  renderer: any;
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };
  filteredInventoryItems: any[] = [];
  pagedInventoryItems: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  // Location table variables and methods
  locationItems = [
    { id: 1, name: 'Location 1', branch_name: 'Branch A' },
    { id: 2, name: 'Location 2', branch_name: 'Branch B' },
    { id: 3, name: 'Location 3', branch_name: 'Branch C' },
    { id: 4, name: 'Location 4', branch_name: 'Branch D' },
    { id: 5, name: 'Location 5', branch_name: 'Branch E' },
    { id: 6, name: 'Location 6', branch_name: 'Branch F' },
    { id: 7, name: 'Location 7', branch_name: 'Branch G' },
    { id: 8, name: 'Location 8', branch_name: 'Branch H' },
    { id: 9, name: 'Location 9', branch_name: 'Branch I' },
    { id: 10, name: 'Location 10', branch_name: 'Branch J' }
  ];
  pagedLocationItems: any[] = [];
  locationCurrentPage: number = 1;
  locationPageSize: number = 5;
  locationTotalPages: number = 1;
  locationTotalPagesArray: number[] = [];

  filteredLocationItems: any[] = [];

  edit_or_add_location = 'Add New Location';
  locationForm: any = { name: '', branch_name: '' };

  departments: any[] = [
    { id: 1, name: 'Logistics' },
    { id: 2, name: 'Procurement' },
    { id: 3, name: 'Production' },
    { id: 4, name: 'Quality' },
    { id: 5, name: 'Sales' },
    { id: 6, name: 'HR' },
    { id: 7, name: 'IT' },
    { id: 8, name: 'Finance' },
    { id: 9, name: 'Admin' },
    { id: 10, name: 'Maintenance' }
  ];
  filteredDepartments: any[] = [];
  pagedDepartments: any[] = [];
  departmentCurrentPage: number = 1;
  departmentPageSize: number = 5;
  departmentTotalPages: number = 1;
  departmentTotalPagesArray: number[] = [];
  departmentForm: any = { id: null, name: '' };
  departmentEditIndex: number | null = null;

  categories: any[] = [
    { id: 1, name: 'Paper' },
    { id: 2, name: 'Plastic' },
    { id: 3, name: 'Metal' },
    { id: 4, name: 'Electronics' },
    { id: 5, name: 'Glass' },
    { id: 6, name: 'Textile' },
    { id: 7, name: 'Wood' },
    { id: 8, name: 'Organic' },
    { id: 9, name: 'Hazardous' },
    { id: 10, name: 'Other' }
  ];
  filteredCategories: any[] = [];
  pagedCategories: any[] = [];
  categoryCurrentPage: number = 1;
  categoryPageSize: number = 5;
  categoryTotalPages: number = 1;
  categoryTotalPagesArray: number[] = [];
  categoryForm: any = { id: null, name: '' };
  categoryEditIndex: number | null = null;

  sub_categories: any[] = [
    { id: 1, name: 'A4 Paper' },
    { id: 2, name: 'PET Bottles' },
    { id: 3, name: 'Aluminum Cans' },
    { id: 4, name: 'Mobile Phones' },
    { id: 5, name: 'Window Glass' },
    { id: 6, name: 'Cotton' },
    { id: 7, name: 'Pallets' },
    { id: 8, name: 'Food Waste' },
    { id: 9, name: 'Batteries' },
    { id: 10, name: 'Miscellaneous' }
  ];
  filteredSubCategories: any[] = [];
  pagedSubCategories: any[] = [];
  subCategoryCurrentPage: number = 1;
  subCategoryPageSize: number = 5;
  subCategoryTotalPages: number = 1;
  subCategoryTotalPagesArray: number[] = [];
  subCategoryForm: any = { id: null, name: '' };
  subCategoryEditIndex: number | null = null;

  globalSearchSub: Subscription;

  constructor(private modalService: NgbModal, private globalSearch: GlobalSearchService){
    document.querySelector('.single-page-header')?.classList.add('d-none');
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterInventoryItems(term);
      this.filterLocationItems(term);
      this.filterDepartments(term);
      this.filterCategories(term);
      this.filterSubCategories(term);
    });
  }

  ngOnInit() {
    this.filterInventoryItems('');
    this.paginateLocationItems();
    this.filterLocationItems('');
    this.filterDepartments('');
    this.filterCategories('');
    this.filterSubCategories('');
  }

  ngOnDestroy(){
    document.querySelector('.single-page-header')?.classList.remove('d-none');
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  filterInventoryItems(term: string) {
    if (!term) {
      this.filteredInventoryItems = this.inventoryItems.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredInventoryItems = this.inventoryItems.filter(item =>
        item.name.toLowerCase().includes(filter) ||
        item.category.toLowerCase().includes(filter) ||
        (item.branch_name && item.branch_name.toLowerCase().includes(filter)) ||
        (item.location && item.location.toLowerCase().includes(filter))
      );
    }
    this.currentPage = 1;
    this.paginateInventoryItems();
  }

  paginateInventoryItems() {
    this.totalPages = Math.ceil(this.filteredInventoryItems.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedInventoryItems = this.filteredInventoryItems.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateInventoryItems();
  }

  setPageSize(size: number) {
    this.pageSize = Math.max(1, +size || 1);
    this.currentPage = 1;
    this.paginateInventoryItems();
  }

  filterLocationItems(term: string) {
    if (!term) {
      this.filteredLocationItems = this.locationItems.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredLocationItems = this.locationItems.filter(loc =>
        loc.name.toLowerCase().includes(filter) ||
        loc.branch_name.toLowerCase().includes(filter) ||
        (loc.id + '').includes(filter)
      );
    }
    this.locationCurrentPage = 1;
    this.paginateLocationItems();
  }

  paginateLocationItems() {
    const items = this.filteredLocationItems || this.locationItems;
    this.locationTotalPages = Math.ceil(items.length / this.locationPageSize) || 1;
    this.locationTotalPagesArray = Array(this.locationTotalPages).fill(0).map((x, i) => i + 1);
    const start = (this.locationCurrentPage - 1) * this.locationPageSize;
    const end = start + this.locationPageSize;
    this.pagedLocationItems = items.slice(start, end);
  }

  setLocationPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.locationTotalPages) return;
    this.locationCurrentPage = page;
    this.paginateLocationItems();
  }

  setLocationPageSize(size: number) {
    this.locationPageSize = Math.max(1, +size || 1);
    this.locationCurrentPage = 1;
    this.paginateLocationItems();
  }

  filterDepartments(term: string) {
    if (!term) {
      this.filteredDepartments = this.departments.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredDepartments = this.departments.filter(d => d.name.toLowerCase().includes(filter));
    }
    this.departmentCurrentPage = 1;
    this.paginateDepartments();
  }
  paginateDepartments() {
    this.departmentTotalPages = Math.ceil(this.filteredDepartments.length / this.departmentPageSize) || 1;
    this.departmentTotalPagesArray = Array(this.departmentTotalPages).fill(0).map((x, i) => i + 1);
    const start = (this.departmentCurrentPage - 1) * this.departmentPageSize;
    const end = start + this.departmentPageSize;
    this.pagedDepartments = this.filteredDepartments.slice(start, end);
  }
  setDepartmentPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.departmentTotalPages) return;
    this.departmentCurrentPage = page;
    this.paginateDepartments();
  }
  setDepartmentPageSize(size: number) {
    this.departmentPageSize = Math.max(1, +size || 1);
    this.departmentCurrentPage = 1;
    this.paginateDepartments();
  }
  openAddDepartment(modalRef: any) {
    this.departmentForm = { id: null, name: '' };
    this.departmentEditIndex = null;
    this.modalService.open(modalRef, { size: 'md' });
  }
  openEditDepartment(modalRef: any, dept: any, idx: number) {
    this.departmentForm = { ...dept };
    this.departmentEditIndex = idx;
    this.modalService.open(modalRef, { size: 'md' });
  }
  saveDepartment(modalRef: any) {
    if (this.departmentForm.name) {
      if (this.departmentEditIndex !== null) {
        this.departments[this.departmentEditIndex] = { ...this.departmentForm };
      } else {
        this.departments.push({ id: this.departments.length + 1, name: this.departmentForm.name });
      }
      this.filterDepartments('');
      modalRef.close();
      this.departmentEditIndex = null;
    }
  }

  filterCategories(term: string) {
    if (!term) {
      this.filteredCategories = this.categories.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredCategories = this.categories.filter(c => c.name.toLowerCase().includes(filter));
    }
    this.categoryCurrentPage = 1;
    this.paginateCategories();
  }
  paginateCategories() {
    this.categoryTotalPages = Math.ceil(this.filteredCategories.length / this.categoryPageSize) || 1;
    this.categoryTotalPagesArray = Array(this.categoryTotalPages).fill(0).map((x, i) => i + 1);
    const start = (this.categoryCurrentPage - 1) * this.categoryPageSize;
    const end = start + this.categoryPageSize;
    this.pagedCategories = this.filteredCategories.slice(start, end);
  }
  setCategoryPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.categoryTotalPages) return;
    this.categoryCurrentPage = page;
    this.paginateCategories();
  }
  setCategoryPageSize(size: number) {
    this.categoryPageSize = Math.max(1, +size || 1);
    this.categoryCurrentPage = 1;
    this.paginateCategories();
  }
  openAddCategory(modalRef: any) {
    this.categoryForm = { id: null, name: '' };
    this.categoryEditIndex = null;
    this.modalService.open(modalRef, { size: 'md' });
  }
  openEditCategory(modalRef: any, cat: any, idx: number) {
    this.categoryForm = { ...cat };
    this.categoryEditIndex = idx;
    this.modalService.open(modalRef, { size: 'md' });
  }
  saveCategory(modalRef: any) {
    if (this.categoryForm.name) {
      if (this.categoryEditIndex !== null) {
        this.categories[this.categoryEditIndex] = { ...this.categoryForm };
      } else {
        this.categories.push({ id: this.categories.length + 1, name: this.categoryForm.name });
      }
      this.filterCategories('');
      modalRef.close();
      this.categoryEditIndex = null;
    }
  }

  filterSubCategories(term: string) {
    if (!term) {
      this.filteredSubCategories = this.sub_categories.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredSubCategories = this.sub_categories.filter(s => s.name.toLowerCase().includes(filter));
    }
    this.subCategoryCurrentPage = 1;
    this.paginateSubCategories();
  }
  paginateSubCategories() {
    this.subCategoryTotalPages = Math.ceil(this.filteredSubCategories.length / this.subCategoryPageSize) || 1;
    this.subCategoryTotalPagesArray = Array(this.subCategoryTotalPages).fill(0).map((x, i) => i + 1);
    const start = (this.subCategoryCurrentPage - 1) * this.subCategoryPageSize;
    const end = start + this.subCategoryPageSize;
    this.pagedSubCategories = this.filteredSubCategories.slice(start, end);
  }
  setSubCategoryPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.subCategoryTotalPages) return;
    this.subCategoryCurrentPage = page;
    this.paginateSubCategories();
  }
  setSubCategoryPageSize(size: number) {
    this.subCategoryPageSize = Math.max(1, +size || 1);
    this.subCategoryCurrentPage = 1;
    this.paginateSubCategories();
  }
  openAddSubCategory(modalRef: any) {
    this.subCategoryForm = { id: null, name: '' };
    this.subCategoryEditIndex = null;
    this.modalService.open(modalRef, { size: 'md' });
  }
  openEditSubCategory(modalRef: any, sub: any, idx: number) {
    this.subCategoryForm = { ...sub };
    this.subCategoryEditIndex = idx;
    this.modalService.open(modalRef, { size: 'md' });
  }
  saveSubCategory(modalRef: any) {
    if (this.subCategoryForm.name) {
      if (this.subCategoryEditIndex !== null) {
        this.sub_categories[this.subCategoryEditIndex] = { ...this.subCategoryForm };
      } else {
        this.sub_categories.push({ id: this.sub_categories.length + 1, name: this.subCategoryForm.name });
      }
      this.filterSubCategories('');
      modalRef.close();
      this.subCategoryEditIndex = null;
    }
  }
  addLocation(modalRef: any) {
    this.edit_or_add_location = 'Add New Location';
    this.locationForm = { name: '', branch_name: '' };
    this.modalService.open(modalRef, { size: 'md' });
  }

  addInventoryItem(modalRef: any) {
    // Open modal for adding a new inventory item
    this.edit_or_add_product = 'Add New Product';
    this.product = { id: null, name: '', category: '', quantity: 0, unitPrice: 0, cbm: 0, totalValue: 0, lastUpdated: new Date(), status: '', imgUrl: '', branch_name: '', location: '' };
    this.modalService.open(modalRef, { size: 'md' });
  }

  saveLocation(modalRef: any) {
    if (this.locationForm.name && this.locationForm.branch_name) {
      // If editing, update the existing location; otherwise, add new
      const existingIndex = this.locationItems.findIndex(loc => loc.name === this.locationForm.name && loc.branch_name === this.locationForm.branch_name);
      if (existingIndex === -1) {
        this.locationItems.push({
          id: this.locationItems.length + 1,
          name: this.locationForm.name,
          branch_name: this.locationForm.branch_name
        });
      } else {
        this.locationItems[existingIndex] = { ...this.locationForm };
      }
      this.filterLocationItems('');
      modalRef.close();
    }
  }
}