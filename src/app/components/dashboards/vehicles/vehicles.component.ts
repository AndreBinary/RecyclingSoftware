import { Component, OnInit } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// --- Data Models for Vehicle Fleet ---
export interface Vehicle {
  id: string;
  driver: string;
  branch: string;
  status: 'Operational' | 'In Shop' | 'Due for Service' | 'Out of Service';
  fuelEfficiency: number; // e.g., MPG
  odometer: number;
  nextServiceDate: string;
  lastAlert?: string;
}

export interface MaintenanceAlert {
    vehicleId: string;
    alert: string;
    priority: 'High' | 'Medium' | 'Low';
    timestamp: string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    NgClass,
    DecimalPipe,
    NgbDropdownModule,
    NgbPaginationModule,
    NgApexchartsModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  // --- Data Properties ---
  public vehicleFleet: Vehicle[] = [];
  public paginatedVehicles: Vehicle[] = [];
  public maintenanceAlerts: MaintenanceAlert[] = [];

  // KPI Data
  public totalVehicles = 0;
  public operationalVehicles = 0;
  public inShopVehicles = 0;
  public avgFuelEfficiency = 0;

  // Pagination
  public page = 1;
  public pageSize = 5;
  public collectionSize = 0;

  // Chart Options
  public vehicleStatusChart: any;
  public fuelEfficiencyChart: any;

  ngOnInit(): void {
    this.loadMockData();
    this.calculateKPIs();
    this.setupCharts();
    this.refreshVehicles();
  }

  calculateKPIs(): void {
    this.totalVehicles = this.vehicleFleet.length;
    this.operationalVehicles = this.vehicleFleet.filter(v => v.status === 'Operational').length;
    this.inShopVehicles = this.vehicleFleet.filter(v => v.status === 'In Shop' || v.status === 'Out of Service').length;
    const totalMpg = this.vehicleFleet.reduce((sum, v) => sum + v.fuelEfficiency, 0);
    this.avgFuelEfficiency = totalMpg / this.vehicleFleet.length;
  }

  refreshVehicles(): void {
    this.collectionSize = this.vehicleFleet.length;
    this.paginatedVehicles = this.vehicleFleet
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  loadMockData(): void {
    this.maintenanceAlerts = [
        { vehicleId: 'TRK-201', alert: 'Engine Oil Pressure Low', priority: 'High', timestamp: '2 mins ago' },
        { vehicleId: 'TRK-103', alert: 'Brake Pad Wear', priority: 'Medium', timestamp: '3 hours ago' },
        { vehicleId: 'TRK-202', alert: 'Service Overdue', priority: 'Medium', timestamp: '1 day ago' },
        { vehicleId: 'TRK-101', alert: 'Tire Pressure Check', priority: 'Low', timestamp: '2 days ago' },
    ];

    this.vehicleFleet = [
      { id: 'TRK-101', driver: 'Alice Johnson', branch: 'North Metro', status: 'Operational', fuelEfficiency: 6.5, odometer: 125430, nextServiceDate: '2024-12-01' },
      { id: 'TRK-102', driver: 'Bob Williams', branch: 'North Metro', status: 'Operational', fuelEfficiency: 6.2, odometer: 98765, nextServiceDate: '2024-11-15' },
      { id: 'TRK-201', driver: 'Charles Davis', branch: 'South County', status: 'In Shop', fuelEfficiency: 4.8, odometer: 210987, nextServiceDate: '2024-09-10', lastAlert: 'Engine Pressure' },
      { id: 'TRK-202', driver: 'Diana Miller', branch: 'South County', status: 'Due for Service', fuelEfficiency: 5.1, odometer: 189012, nextServiceDate: '2024-08-01', lastAlert: 'Service Overdue' },
      { id: 'TRK-301', driver: 'Edward Green', branch: 'Westside Ind.', status: 'Operational', fuelEfficiency: 7.1, odometer: 54321, nextServiceDate: '2025-02-10' },
      { id: 'TRK-103', driver: 'Fiona White', branch: 'North Metro', status: 'Due for Service', fuelEfficiency: 6.9, odometer: 88765, nextServiceDate: '2024-10-25', lastAlert: 'Brake Wear' },
      { id: 'TRK-401', driver: 'George Hill', branch: 'Downtown Core', status: 'Out of Service', fuelEfficiency: 0, odometer: 320111, nextServiceDate: 'N/A', lastAlert: 'Transmission Failure' },
    ];
  }

  setupCharts(): void {
    const statusCounts = this.vehicleFleet.reduce((acc, vehicle) => {
        acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    this.vehicleStatusChart = {
        series: Object.values(statusCounts),
        chart: { type: 'donut', height: 250 },
        labels: Object.keys(statusCounts),
        colors: ["#28a745", "#dc3545", "#ffc107", "#6c757d"],
        legend: { position: 'bottom' },
        dataLabels: { enabled: false }
    };

    this.fuelEfficiencyChart = {
        series: [{ name: 'Avg Fuel Efficiency (MPG)', data: [6.1, 6.3, 6.2, 5.9, 6.4, 6.8, 6.5] }],
        chart: { type: 'area', height: 300, toolbar: { show: false }, sparkline: { enabled: true } },
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.1 } },
        colors: ["#007bff"],
        xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
        markers: { size: 0 },
    };
  }
}