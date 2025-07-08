import {Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsChartData, StatisticsChartData1, TopCategoryChartData } from '../../../shared/data/dashboard_chartData/salechart.data';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { GlobalSearchService } from '../../../shared/global-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [RouterModule,SharedModule,NgApexchartsModule,NgbModule,FlatpickrModule,FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent  {
  public chartOptions = StatisticsChartData;
  public chartOptions1 = StatisticsChartData1;
  public chartOptions2 = TopCategoryChartData;
  renderer: any;

  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  vehicleData: any[] = [
    { vehicleName: 'Truck 1', regNumber: 'ABC123', makeModel: 'Ford F-150', status: 'Active', milage: 12000, assignedTo: 'John Doe' },
    { vehicleName: 'Van 2', regNumber: 'XYZ789', makeModel: 'Mercedes Sprinter', status: 'Inactive', milage: 8000, assignedTo: 'Jane Smith' }
  ];

  filteredVehicleData: any[] = [];
  globalSearchSub: Subscription;
  constructor(private globalSearch: GlobalSearchService){
    document.querySelector('.single-page-header')?.classList.add('d-none');
    this.globalSearchSub = this.globalSearch.searchTerm$.subscribe(term => {
      this.filterVehicles(term);
    });
  }
  
  ngOnInit() {
    this.filteredVehicleData = this.vehicleData.slice();
  }
  ngOnDestroy(){
    document.querySelector('.single-page-header')?.classList.remove('d-none');
    if (this.globalSearchSub) this.globalSearchSub.unsubscribe();
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
  }
}