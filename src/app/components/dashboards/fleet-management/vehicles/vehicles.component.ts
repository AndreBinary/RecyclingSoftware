import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../../shared/shared.module";
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FlatpickrModule } from "angularx-flatpickr";
import { FormsModule } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from '@angular/common';
import { vehicleTableData } from "../../../../shared/data/fleet_management/vehicles";
import { GlobalSearchService } from '../../../../shared/global-search.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

const DATA = [
  {
    id: '1',
    task: 'Design New Landing Page',
    taskid: 'SPK - 01',
    assigndate: '02-06-2024',
    status: 'New',
    text: 'primary',
    dueDate: '10-06-2024',
    priority: 'Medium',
    bg: 'secondary',
    assignedto: [
      "./assets/images/faces/2.jpg",
      "./assets/images/faces/8.jpg",
      "./assets/images/faces/2.jpg",
    ],
    number: ' +2'
  },
  {
    id: '2',
    task: 'New Project Buleprint',
    taskid: 'SPK - 04',
    assigndate: '05-06-2024',
    status: 'Inprogress',
    text: 'secondary',
    dueDate: '15-06-2024',
    priority: 'High',
    bg: 'danger',
    assignedto: [
      "./assets/images/faces/12.jpg",
      "./assets/images/faces/11.jpg",
    ],
    number: ' +4',
    check: 'checked'
  },
  {
    id: '3',
    task: 'Server Side Validation',
    taskid: 'SPK - 11',
    assigndate: '12-06-2024',
    status: 'Pending',
    text: 'warning',
    dueDate: '16-06-2024',
    priority: 'Low',
    bg: 'success',
    assignedto: [
      "./assets/images/faces/5.jpg",
      "./assets/images/faces/9.jpg",
      "./assets/images/faces/13.jpg",
    ],
    number: ' +5'
  },
  {
    id: '4',
    task: 'New Plugin Development',
    taskid: 'SPK - 24',
    assigndate: '08-06-2024',
    status: 'Completed',
    text: 'success',
    dueDate: '17-06-2024',
    priority: 'Low',
    bg: 'success',
    assignedto: [
      "./assets/images/faces/2.jpg",
      "./assets/images/faces/8.jpg",
      "./assets/images/faces/2.jpg",
    ],
    number: '+2'
  },
  {
    id: '5',
    task: 'Designing New Authentication Page',
    taskid: 'SPK - 16',
    assigndate: '03-06-2024',
    status: 'Inprogress	',
    text: 'secondary',
    dueDate: '08-06-2024',
    priority: 'Medium',
    bg: 'secondary',
    assignedto: [
      "./assets/images/faces/10.jpg",
      "./assets/images/faces/15.jpg",
    ],
    number: '+3',
    check: 'checked'
  },
  {
    id: '6',
    task: 'Documentation For New Template',
    taskid: 'SPK - 07',
    assigndate: '12-06-2024',
    status: '	New',
    text: 'primary',
    dueDate: '25-06-2024',
    priority: 'High',
    bg: 'danger',
    assignedto: [
      "./assets/images/faces/12.jpg",
    ],
    number: '+1',
    check: 'checked'
  },
  {
    id: '7',
    task: 'Updating Old UI',
    taskid: 'SPK - 13',
    assigndate: '06-06-2024',
    status: 'Completed',
    text: 'success',
    dueDate: '12-06-2024',
    priority: 'Low',
    bg: 'success',
    assignedto: [
      "./assets/images/faces/11.jpg",
      "./assets/images/faces/1.jpg",
      "./assets/images/faces/10.jpg",
    ],
    number: '+1'
  },

  {
    id: '8',
    task: 'Developing New Events In Plugins',
    taskid: 'SPK - 20',
    assigndate: '14-06-2024',
    status: 'Pending',
    text: 'warning',
    dueDate: '19-06-2024',
    priority: 'High',
    bg: 'danger',
    assignedto: [
      "./assets/images/faces/3.jpg",
      "./assets/images/faces/9.jpg",
    ],
    number: '+2',
    check: 'checked'
  },
  {
    id: '9',
    task: 'Fixing Minor Ui Issues',
    taskid: 'SPK - 26',
    assigndate: '11-06-2024',
    status: 'Completed',
    text: 'success',
    dueDate: '18-06-2024',
    priority: 'Medium',
    bg: 'secondary',
    assignedto: [
      "./assets/images/faces/3.jpg",
      "./assets/images/faces/9.jpg",
      "./assets/images/faces/3.jpg",
      "./assets/images/faces/9.jpg",
    ],
    number: '+1'
  },
  {
    id: '10',
    task: 'Designing Of New Ecommerce Website',
    taskid: 'SPK - 32',
    assigndate: '03-06-2024',
    status: '	Inprogress	',
    text: 'secondary',
    dueDate: '09-06-2024',
    priority: 'Low',
    bg: 'success',
    assignedto: [
      "./assets/images/faces/3.jpg",
      "./assets/images/faces/9.jpg",
    ],
    number: '+4'
  },
];



@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule, NgApexchartsModule, NgbModule, FlatpickrModule, FormsModule, NgSelectModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public vehicleData = vehicleTableData;
  filteredVehicleData: any[] = [];
  pagedVehicleData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  globalSearchSub: Subscription;

  constructor(private modalService: NgbModal, private globalSearch: GlobalSearchService) {
    this.chartOptions = {
      series: [{
        name: 'Under Maintenance',
        data: [0, 4, 7, 6, 8, 5, 0, 3, 3, 4, 7, 4],
      }, {
        name: 'Pending Maintenance',
        data: [4, 2, 7, 16, 8, 5, 0, 3, 3, 4, 7, 4],
      }, {
        name: 'Fuel Usage',
        data: [4, 2, 7, 26, 8, 5, 10, 3, 3, 4, 17, 4],
      }, {
        name: 'Active Vehicles',
        data: [14, 12, 4, 12, 10, 15, 15, 15, 14, 11, 11, 14],
      }],
      chart: {
        type: "bar",
        height: 175,
        stacked: true,
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '25%',
          borderRadius: 1,
        }
      },
      grid: {
        show: false,
        borderColor: '#f2f6f7',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["rgba(254, 124, 88,1)", "rgba(12, 215, 177,1)", "rgba(215, 124, 247,1)", "var(--primary-color)"],
      stroke: {
        width: 0,
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 500,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      yaxis: {
        title: {
          style: {
            color: "#8c9097",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 500,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
    }
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterVehicles(term);
    });
    this.filteredVehicleData = this.vehicleData.slice();
    this.paginateVehicles();
  }

  filterVehicles(term: string) {
    if (!term) {
      this.filteredVehicleData = this.vehicleData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredVehicleData = this.vehicleData.filter((item: any) =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(filter))
      );
    }
    this.currentPage = 1;
    this.paginateVehicles();
  }

  paginateVehicles() {
    this.totalPages = Math.ceil(this.filteredVehicleData.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVehicleData = this.filteredVehicleData.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateVehicles();
  }

  setPageSize(size: number) {
    this.pageSize = Math.max(1, +size || 1);
    this.currentPage = 1;
    this.paginateVehicles();
  }

  ngOnDestroy() {
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  creatModel(content: any) {
    this.modalService.open(content, { centered: true });
  }

  click(id: any) {
    const data = this.invoice.filter((x: any) => {
      return x.id != id;
    });
    this.invoice = data;
  }
  invoice = DATA;

  public counter1 = 1;
  source = interval(0.2);
  subscribe = this.source.subscribe(() => {
    this.counter1++;
    if (this.counter1 == 41) {
      this.subscribe.unsubscribe();
    }
  });
  public counter2 = 1;
  source2 = interval(0.2);
  subscribe2 = this.source2.subscribe(() => {
    this.counter2++;
    if (this.counter2 == 321) {
      this.subscribe2.unsubscribe();
    }
  });
  public counter3 = 1;
  source3 = interval(0.2);
  subscribe3 = this.source3.subscribe(() => {
    this.counter3++;
    if (this.counter3 == 81) {
      this.subscribe3.unsubscribe();
    }
  });
  public counter4 = 1;
  source4 = interval(0.2);
  subscribe4 = this.source4.subscribe(() => {
    this.counter4++;
    if (this.counter4 == 33) {
      this.subscribe4.unsubscribe();
    }
  });
}