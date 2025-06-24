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

  // public chartOptions2 = DeviceChartData;
  // public chartOptions3 = BrowserChartData;
  // public chartOptions4 = ImpressionsChartData;
  // public chartOptions5 = NewSubscribersChartData;
}
