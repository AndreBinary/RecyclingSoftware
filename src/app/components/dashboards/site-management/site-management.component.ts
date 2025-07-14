import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Manager {
  name: string;
  id: number;
}

export interface Site {
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
  kgReady: number;
  kgCollected: number;
  agents: Agent[];
  manager: Manager;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [SharedModule,NgbCollapseModule,CommonModule, NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule, NgApexchartsModule],
  templateUrl: './site-management.component.html',
  styleUrl: './site-management.component.scss',
})
export class SiteManagementComponent implements OnInit {
  searchTerm = '';
  sites: Site[] = [
    {
      name: 'Site Alpha', location: 'Cape Town', status: 'Active', kgReady: 120, kgCollected: 1500,
      agents: [ { name: 'Agent A', phone: '0123456789', email: 'agent.a@email.com' } ],
      manager: { name: 'Manager 1', id: 1 }, phone: '0211234567', email: 'alpha@site.com'
    },
    {
      name: 'Site Beta', location: 'Johannesburg', status: 'Active', kgReady: 80, kgCollected: 1200,
      agents: [ { name: 'Agent B', phone: '0987654321', email: 'agent.b@email.com' } ],
      manager: { name: 'Manager 2', id: 2 }, phone: '0119876543', email: 'beta@site.com'
    },
    {
      name: 'Site Gamma', location: 'Durban', status: 'Inactive', kgReady: 0, kgCollected: 900,
      agents: [ { name: 'Agent C', phone: '0315551234', email: 'agent.c@email.com' } ],
      manager: { name: 'Manager 3', id: 3 }, phone: '0315550000', email: 'gamma@site.com'
    }
  ];
  filteredSites: Site[] = [];
  pagedSites: Site[] = [];
  topSite: Site | null = null;
  totalKgReady = 0;
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalPagesArray: number[] = [];
  managers: Manager[] = [
    { name: 'Manager 1', id: 1 },
    { name: 'Manager 2', id: 2 },
    { name: 'Manager 3', id: 3 }
  ];
  agents: Agent[] = [
    { name: 'Agent A', phone: '0123456789', email: 'agent.a@email.com' },
    { name: 'Agent B', phone: '0987654321', email: 'agent.b@email.com' },
    { name: 'Agent C', phone: '0315551234', email: 'agent.c@email.com' }
  ];
  newSite: any = { name: '', location: '', manager: null, agent: null, phone: '', email: '' };

  // Chart data for sample graphs
  siteTrendsData = [
    { name: 'Site Alpha', data: [120, 130, 140, 150, 160] },
    { name: 'Site Beta', data: [80, 90, 100, 110, 120] },
    { name: 'Site Gamma', data: [0, 10, 20, 30, 40] },
    { name: 'Site Delta', data: [200, 210, 220, 230, 240] },
    { name: 'Site Epsilon', data: [50, 60, 70, 80, 90] }
  ];
  siteTrendsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  agentCollectionData = [
    { name: 'Agent A', value: 1500 },
    { name: 'Agent B', value: 1200 },
    { name: 'Agent C', value: 900 }
  ];

  materialTypes = ['Plastic', 'Paper', 'Cardboard', 'Glass', 'Metal'];
  // Demo: per-site material weights (simulate agent portal communication)
  siteMaterials: { [siteName: string]: { [material: string]: number } } = {
    'Site Alpha': { Plastic: 30, Paper: 20, Cardboard: 10, Glass: 5, Metal: 2 },
    'Site Beta': { Plastic: 15, Paper: 10, Cardboard: 5, Glass: 0, Metal: 1 },
    'Site Gamma': { Plastic: 0, Paper: 0, Cardboard: 0, Glass: 0, Metal: 0 }
  };

  public siteTrendsChartOptions: any = {
    series: this.siteTrendsData.map(s => ({ name: s.name, data: s.data })),
    chart: { type: 'line', height: 200 },
    xaxis: { categories: this.siteTrendsLabels },
    stroke: { curve: 'smooth' },
    markers: { size: 4 },
    legend: { position: 'top' },
  };

  public agentCollectionChartOptions: any = {
    series: [{
      name: 'Total Collected',
      data: this.agentCollectionData.map(a => a.value)
    }],
    chart: { type: 'bar', height: 200 },
    xaxis: { categories: this.agentCollectionData.map(a => a.name) },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.filterSites();
  }

  filterSites() {
    // For global search, you may want to subscribe to a global search service
    const term = this.searchTerm.toLowerCase();
    this.filteredSites = this.sites.filter(site =>
      site.name.toLowerCase().includes(term) ||
      site.location.toLowerCase().includes(term) ||
      site.status.toLowerCase().includes(term)
    );
    this.updateWidgets();
    this.paginateSites();
  }

  updateWidgets() {
    this.topSite = this.filteredSites.reduce((top, site) =>
      !top || site.kgCollected > top.kgCollected ? site : top, null as Site | null
    );
    this.totalKgReady = this.filteredSites.reduce((sum, site) => sum + site.kgReady, 0);
  }

  paginateSites() {
    this.totalPages = Math.ceil(this.filteredSites.length / this.pageSize) || 1;
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSites = this.filteredSites.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateSites();
  }

  setPageSize(size: number) {
    this.pageSize = Math.max(1, +size || 1);
    this.currentPage = 1;
    this.paginateSites();
  }

  openAddSiteModal(modalRef: TemplateRef<any>) {
    this.newSite = { name: '', location: '', manager: null, agent: null, phone: '', email: '' };
    this.modalService.open(modalRef, { size: 'lg', centered: true });
  }

  saveSite(modal: any) {
    if (this.newSite.name && this.newSite.location && this.newSite.manager && this.newSite.agent) {
      const newSiteObj: Site = {
        name: this.newSite.name,
        location: this.newSite.location,
        status: 'Active',
        kgReady: 0,
        kgCollected: 0,
        agents: [this.newSite.agent],
        manager: this.newSite.manager,
        phone: this.newSite.phone,
        email: this.newSite.email
      };
      this.sites.push(newSiteObj);
      this.filterSites();
      modal.close();
    }
  }

  openEditSiteModal(modalRef: TemplateRef<any>, site: Site) {
    this.newSite = { ...site, manager: site.manager, agent: site.agents[0], phone: site.phone, email: site.email };
    this.modalService.open(modalRef, { size: 'lg', centered: true });
  }

  getAgentNames(site: Site): string {
    return site.agents?.map(a => a.name).join(', ') || '';
  }

  getMaterialsForSite(siteName: string) {
    return this.materialTypes.map(m => ({
      material: m,
      total: this.siteMaterials[siteName]?.[m] || 0
    }));
  }
}
