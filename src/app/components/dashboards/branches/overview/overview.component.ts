import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { MOCK_DATA } from '../../../../shared/data/branch/branchData';

export interface Branch {
  branchName: string;
  code: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  manager: string;
  overallScore: number;
  revenueMTD: number;
  profitMargin: number;
  tonnageMTD: number;
  onTimePercent: number;
  csat: number;
  safetyIncidents: number;
}

@Component({
  selector: 'app-overview-branches',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    GoogleMap,
    MapMarker
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  allBranchData: Branch[] = [];
  filteredBranchData: Branch[] = [];

  totalRevenue = 0;
  totalTonnage = 0;
  totalIncidents = 0;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  branchForm!: FormGroup;
  editMode = false;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.allBranchData = Object.values(MOCK_DATA).map(branch => ({
        branchName: branch.branchName,
        code: branch.code,
        status: branch.status,
        manager: branch.manager,
        overallScore: Math.round(branch.onTimePercent),
        revenueMTD: branch.revenueMTD,
        profitMargin: branch.profitMargin,
        tonnageMTD: branch.tonnageBreakdown.reduce((sum, t) => sum + t.tons, 0),
        onTimePercent: branch.onTimePercent,
        csat: Number((branch.staff.reduce((sum, s) => sum + s.safetyScore, 0) / branch.staff.length / 20).toFixed(1)),
        safetyIncidents: branch.safetyIncidents
      }));
      this.applyFilter('All');
      this.calculateTotals();
    }, 500); 

    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      code: ['', Validators.required],
      manager: [''],
      status: ['Active', Validators.required]
    });
  }

  get f() { return this.branchForm.controls; }

  calculateTotals(): void {
    this.totalRevenue = this.allBranchData.reduce((sum, b) => sum + b.revenueMTD, 0);
    this.totalTonnage = this.allBranchData.reduce((sum, b) => sum + b.tonnageMTD, 0);
    this.totalIncidents = this.allBranchData.reduce((sum, b) => sum + b.safetyIncidents, 0);
  }

  applyFilter(filter: string): void {
    if (filter === 'All') {
      this.filteredBranchData = this.allBranchData;
    } else {
      this.filteredBranchData = this.allBranchData.filter(b => b.status === filter);
    }
    this.collectionSize = this.filteredBranchData.length;
    this.page = 1;
  }

  openAddModal(content: any): void {
    this.editMode = false;
    this.submitted = false;
    this.branchForm.reset({ status: 'Active' }); 
    this.modalService.open(content);
  }

  openEditModal(content: any, branch: Branch): void {
    this.editMode = true;
    this.submitted = false;
    this.branchForm.setValue({
      branchName: branch.branchName,
      code: branch.code,
      manager: branch.manager,
      status: branch.status
    });
    this.modalService.open(content);
  }

  onFormSubmit(): void {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return; 
    }

    if (this.editMode) {
      console.log('Updating branch:', this.branchForm.value);
    } else {
     
      console.log('Adding new branch:', this.branchForm.value);
    }
    this.modalService.dismissAll(); 
  }

  deleteBranch(code: string): void {
    if (confirm(`Are you sure you want to delete branch ${code}?`)) {
      console.log(`Deleting branch ${code}`);
      this.allBranchData = this.allBranchData.filter(b => b.code !== code);
      this.applyFilter('All'); 
    }
  }

  Math = Math;
}