import {Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import {  NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../shared/data/dashboard_chartData/salechart.data';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  filterText: string = '';
  filteredInventoryItems: any[] = [];
  pagedInventoryItems: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  sub_categories:any;
  categories:any;
  departments:any;

  constructor(private modalService: NgbModal){
    document.querySelector('.single-page-header')?.classList.add('d-none');
  }
  addInventoryItem(x:any){
    this.edit_or_add_product = 'Add New Product';
    this.product=[{
      id:0,
      name:'',
      product_information:[{
        department:[{
          id:0,
          name:'',
          categories:[{
            id:0,
            name:'',
            sub_category:[{
              id:0,
              name:''
            }]
          }]
        }]
      }],
      quantity:'',
      sku:'',
      barcode:'',
      branch_information:[
        {
          id:'',
          name:'',
          locations:[{
            id:0,
            name:''
          }]
        }
      ],     
    }]
    this.modalService.open(x,{centered: true, size: 'lg'});
  }

  
editItem(x:any){
  this.edit_or_add_product = 'Edit Product';
  this.modalService.open(x,{centered: true, size: 'lg'}); 
}

deleteItem(x:any){ 

}

openBasic(basicModal: any) {
    this.modalService.open(basicModal,{centered: true, size: 'lg'});
  }

  ngOnDestroy(){
    document.querySelector('.single-page-header')?.classList.remove('d-none');
  }

  ngOnInit() {
    this.filterInventoryItems();
  }

  filterInventoryItems() {
    if (!this.filterText) {
      this.filteredInventoryItems = this.inventoryItems.slice();
    } else {
      const filter = this.filterText.toLowerCase();
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

  
  ngOnChanges() {
    this.filterInventoryItems();
  }

  setPageSize(size: number) {
  this.pageSize = Math.max(1, +size || 1);
  this.currentPage = 1;
  this.paginateInventoryItems();
}
}