import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SkipBin {
  id: string;
  type: 'Skip' | 'Bin';
  location: string;
  status: 'Active' | 'Inactive';
  capacity: number;
  currentFill: number;
  site: string;
}

@Component({
  selector: 'app-skip-bin-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './skip-bin-management.component.html',
  // styleUrl: './skip-bin-management.component.scss'
})
export class SkipBinManagementComponent implements OnInit {
  skipBins: SkipBin[] = [
    { id: 'SK001', type: 'Skip', location: 'Yard A', status: 'Active', capacity: 10, currentFill: 7, site: 'Site Alpha' },
    { id: 'BN001', type: 'Bin', location: 'Yard B', status: 'Active', capacity: 5, currentFill: 2, site: 'Site Beta' },
    { id: 'SK002', type: 'Skip', location: 'Yard C', status: 'Inactive', capacity: 8, currentFill: 0, site: 'Site Gamma' },
    { id: 'BN002', type: 'Bin', location: 'Yard D', status: 'Active', capacity: 6, currentFill: 5, site: 'Site Alpha' }
  ];
  sites = [
    { name: 'Site Alpha' },
    { name: 'Site Beta' },
    { name: 'Site Gamma' }
  ];
  filteredSkipBins: SkipBin[] = [];
  pagedSkipBins: SkipBin[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalPagesArray: number[] = [];
  newSkipBin: any = { id: '', type: 'Skip', location: '', status: 'Active', capacity: 0, currentFill: 0, site: '' };

  utilizationChartOptions: any;
  fillLevelChartOptions: any;
  totalSkips = 0;
  totalBins = 0;
  utilizationPercent = 0;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.filterSkipBins();
    this.updateWidgets();
    this.setupCharts();
  }

  filterSkipBins() {
    this.filteredSkipBins = this.skipBins;
    this.paginateSkipBins();
  }

  paginateSkipBins() {
    this.totalPages = Math.ceil(this.filteredSkipBins.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSkipBins = this.filteredSkipBins.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateSkipBins();
  }

  setPageSize(size: number) {
    this.pageSize = Math.max(1, +size || 1);
    this.currentPage = 1;
    this.paginateSkipBins();
  }

  openAddSkipBinModal(modalRef: TemplateRef<any>) {
    this.newSkipBin = { id: '', type: 'Skip', location: '', status: 'Active', capacity: 0, currentFill: 0, site: '' };
    this.modalService.open(modalRef, { size: 'lg', centered: true });
  }

  saveSkipBin(modal: any) {
    if (this.newSkipBin.id && this.newSkipBin.location && this.newSkipBin.site) {
      this.skipBins.push({ ...this.newSkipBin });
      this.filterSkipBins();
      this.updateWidgets();
      this.setupCharts();
      modal.close();
    }
  }

  openEditSkipBinModal(modalRef: TemplateRef<any>, item: SkipBin) {
    this.newSkipBin = { ...item };
    this.modalService.open(modalRef, { size: 'lg', centered: true });
  }

  updateWidgets() {
    this.totalSkips = this.skipBins.filter(x => x.type === 'Skip').length;
    this.totalBins = this.skipBins.filter(x => x.type === 'Bin').length;
    const totalCapacity = this.skipBins.reduce((sum, x) => sum + x.capacity, 0);
    const totalFill = this.skipBins.reduce((sum, x) => sum + x.currentFill, 0);
    this.utilizationPercent = totalCapacity ? Math.round((totalFill / totalCapacity) * 100) : 0;
  }

  setupCharts() {
    this.utilizationChartOptions = {
      series: [
        {
          name: 'Utilization',
          data: this.skipBins.map(x => Math.round((x.currentFill / x.capacity) * 100))
        }
      ],
      chart: { type: 'line', height: 200 },
      xaxis: { categories: this.skipBins.map(x => x.id) },
      stroke: { curve: 'smooth' },
      legend: { position: 'top' }
    };
    this.fillLevelChartOptions = {
      series: [
        {
          name: 'Fill Level',
          data: this.skipBins.map(x => x.currentFill)
        }
      ],
      chart: { type: 'bar', height: 200 },
      xaxis: { categories: this.skipBins.map(x => x.id) },
      plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
      dataLabels: { enabled: false },
      legend: { show: false }
    };
  }
}
