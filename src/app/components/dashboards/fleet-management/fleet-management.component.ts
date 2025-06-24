import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [SharedModule,NgbCollapseModule, NgbModule,NgSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './fleet-management.component.html',
  styleUrl: './fleet-management.component.scss',
})
export class FleetManagementComponent {
 
  
}
