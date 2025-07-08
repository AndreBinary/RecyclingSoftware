import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { GlobalSearchService } from '../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [SharedModule,NgbCollapseModule, NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent {
  branchData: any[] = [
    { branchName: 'Central', manager: 'Alice', location: 'Downtown', status: 'Active' },
    { branchName: 'West', manager: 'Bob', location: 'Westside', status: 'Inactive' }
  ];
  filteredBranchData: any[] = [];
  globalSearchSub: Subscription;
  constructor(private globalSearch: GlobalSearchService) {
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterBranches(term);
    });
  }
  ngOnInit() {
    this.filteredBranchData = this.branchData.slice();
  }
  ngOnDestroy() {
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
  }
  filterBranches(term: string) {
    if (!term) {
      this.filteredBranchData = this.branchData.slice();
    } else {
      const filter = term.toLowerCase();
      this.filteredBranchData = this.branchData.filter((item: any) =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(filter))
      );
    }
  }
}
