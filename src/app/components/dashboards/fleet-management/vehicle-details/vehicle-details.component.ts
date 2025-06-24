import { Component } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { BasicPieChartData } from "../../../../shared/data/apexchart.data";




@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent {
  public BasicPieChartData: any = BasicPieChartData;

  vehicle = {
    id: 1,
    regNumber: 'ND 123-456',
    model: 'Volvo FH16',
    make: 'Volvo',
    type: 'Truck',
    status: 'Active',
    fuelEfficiency: 5.9,
    fuelEfficiencyPercent: 75,
    vinNumber: 'YS2R4X20005399401',
    fuelCapacity: 400,
    location: 'Pretoria Depot',
    serviceInterval: '20,000',
    nextServiceMaintenance: '2025-09-15',
    assignedTo: 'John Doe',
    milage: 150000,
    assignedDriver: {
      name: 'John Doe',
      license: 'EC',
      phone: '012 234 5678',
      employeeNo: '2674483',
      licenseExp: '25/08/2027'
    },
    binAssigned: 'General Waste',
    binQty: 1,
    lastTrip: {
      date: '2025-06-20',
      route: 'Pretoria to Johannesburg'
    },
    maintenanceHistory: [
      {
        date: '2025-05-10',
        type: 'Service',
        description: 'Oil + Filter',
        cost: 'R2000',
        performedBy: 'SuperServ'
      },
      {
        date: '2025-06-01',
        type: 'Repair',
        description: 'Rear axle repair',
        cost: 'R8500',
        performedBy: 'Depot Garage'
      }
    ],
    fuelLogs: [
      { date: "2025/06/23", litres: 120, cost: 'R3000', filledBy: 'Mike B', location: 'BP Midrand' }
    ],
    documents: [
      { type: 'Vehicle Registration', status: 'Uploaded' },
      { type: 'License Disk Copy', status: 'Missing' }
    ],
    proofOfPayment: 'Uploaded',
    endOfTransaction: '2025-06-23'
  };
}
