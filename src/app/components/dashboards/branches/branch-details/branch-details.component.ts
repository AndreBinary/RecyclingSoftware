import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MOCK_DATA, PerformanceOverTimeChartData } from '../../../../shared/data/branch/branchData';
import { NgApexchartsModule } from 'ng-apexcharts';

export interface Route {
  id: string;
  driver: string;
  status: 'Completed' | 'In Progress' | 'Delayed';
  onTimePercent: number;
  fuelEfficiency: number;
}

export interface CostItem {
  category: 'Labor' | 'Fuel' | 'Disposal Fees' | 'Maintenance';
  cost: number;
  percentOfTotal: number;
}

export interface StaffMember {
  id: number;
  name: string;
  role: 'Driver' | 'Helper' | 'Supervisor';
  safetyScore: number;
}

export interface Vehicle {
  vehicleId: string;
  type: 'Front-Loader' | 'Rear-Loader' | 'Roll-Off';
  status: 'Operational' | 'In Shop' | 'Due for Service';
  nextServiceDate: string;
}

export interface BranchDetail {
  branchName: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  code: string;
  manager: string;
  revenueMTD: number;
  revenueVsTarget: number;
  profitMargin: number;
  companyAvgProfitMargin: number;
  onTimePercent: number;
  missedPickups: number;
  daysSinceIncident: number;
  safetyIncidents: number;
  tonnageBreakdown: { type: string; tons: number }[];
  routes: Route[];
  costBreakdown: CostItem[];
  staff: StaffMember[];
  fleet: Vehicle[];
}

@Component({
  selector: 'app-branch-detail',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    DecimalPipe,
    NgbNavModule,
    NgApexchartsModule
  ],
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  branchCode: string | null = null;
  branch: BranchDetail | undefined;
  isLoading = true;
  activeId: string = 'overview';
    public chartOptions = PerformanceOverTimeChartData;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.branchCode = this.route.snapshot.paramMap.get('id');
    if (this.branchCode) {
      this.loadBranchData(this.branchCode);
      console.log("Branch Code :", this.branchCode)
    } else {
      this.isLoading = false; 
    }
  }

  loadBranchData(code: string): void {
    this.isLoading = true;
    setTimeout(() => {
      this.branch = this.getMockBranchDetail(code);
      this.isLoading = false;
    }, 500); 
  }

  getPerformanceClass(value: number, threshold: number): string {
    return value >= threshold ? 'text-success' : 'text-danger';
  }

  private getMockBranchDetail(code: string): BranchDetail | undefined {
   
    const key = Object.keys(MOCK_DATA).find(k => k.toLowerCase() === code.toLowerCase());
    return key ? MOCK_DATA[key] : undefined;
  }
}