import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../shared/shared.module';
import { StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../../shared/data/dashboard_chartData/salechart.data';
import { EarningReportChartData, SessionsOverviewChartData } from '../../../../shared/data/dashboard_chartData/analyticscharts.data';
import { ReatTimeChartData, ZoomableChartData } from '../../../../shared/data/charts/apex_chart';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbCollapseModule, NgbModule, NgSelectModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  public alertTableData: any = [{
    vehicle: "BY 65 SM GP",
    issue: "Service Overdue",
    status: "Critical",
  }
    , {
    vehicle: "CM 65 BM GP",
    issue: "Low Fuel",
    status: "Moderate",
  },
  {
    vehicle: "TT 77 MD GP",
    issue: "Low Battery",
    status: "Critical",
  }, {
    vehicle: "BG 45 II GP",
    issue: "Maintenance Due",
    status: "Upcoming",
  }, {
    vehicle: "BN 77  GP",
    issue: "Tire Pressure Low",
    status: "Moderate",
  },]

  public vehicleTableData: any = [
    { vehicle: "BY 65 SM GP", driver: "John Doe", status: "moving" },
    { vehicle: "CA 12 AB GP", driver: "Jane Smith", status: "stopped" },
    { vehicle: "ND 34 XY GP", driver: "Mike Brown", status: "idle" },
    { vehicle: "GP 78 QW GP", driver: "Anna Lee", status: "moving" },
    { vehicle: "FS 90 ZX GP", driver: "Chris Green", status: "maintenance" }
  ];

  public chartOptions = SessionsOverviewChartData;
  public chartOptions1 = EarningReportChartData;
  public ReatTimeChartData: any = ReatTimeChartData;

  filteredVehicleTableData: any[] = [];
  pagedVehicleTableData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  globalSearchSub: Subscription;

  filteredAlertTableData: any[] = [];
  pagedAlertTableData: any[] = [];
  alertCurrentPage: number = 1;
  alertPageSize: number = 5;
  alertTotalPages: number = 1;
  alertTotalPagesArray: number[] = [];

  constructor(private globalSearch: GlobalSearchService) {
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterVehicles(term);
      this.filterAlerts(term);
    });
    this.filteredVehicleTableData = this.vehicleTableData.slice();
    this.paginateVehicles();
    this.filteredAlertTableData = this.alertTableData.slice();
    this.paginateAlerts();
  }

  filterVehicles(term: string) {
    if (!term) {
      this.filteredVehicleTableData = this.vehicleTableData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredVehicleTableData = this.vehicleTableData.filter((item: any) =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(filter))
      );
    }
    this.currentPage = 1;
    this.paginateVehicles();
  }

  paginateVehicles() {
    this.totalPages = Math.ceil(this.filteredVehicleTableData.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVehicleTableData = this.filteredVehicleTableData.slice(start, end);
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

  filterAlerts(term: string) {
    if (!term) {
      this.filteredAlertTableData = this.alertTableData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredAlertTableData = this.alertTableData.filter((item: any) =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(filter))
      );
    }
    this.alertCurrentPage = 1;
    this.paginateAlerts();
  }

  paginateAlerts() {
    this.alertTotalPages = Math.ceil(this.filteredAlertTableData.length / this.alertPageSize) || 1;
    this.alertTotalPagesArray = Array(this.alertTotalPages).fill(0).map((x, i) => i + 1);
    const start = (this.alertCurrentPage - 1) * this.alertPageSize;
    const end = start + this.alertPageSize;
    this.pagedAlertTableData = this.filteredAlertTableData.slice(start, end);
  }

  setAlertPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.alertTotalPages) return;
    this.alertCurrentPage = page;
    this.paginateAlerts();
  }

  setAlertPageSize(size: number) {
    this.alertPageSize = Math.max(1, +size || 1);
    this.alertCurrentPage = 1;
    this.paginateAlerts();
  }

  ngOnDestroy() {
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }

  // public chartOptions2 = DeviceChartData;
  // public chartOptions3 = BrowserChartData;
  // public chartOptions4 = ImpressionsChartData;
  // public chartOptions5 = NewSubscribersChartData;
}
