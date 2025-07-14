import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Weighing {
  date: Date;
  material: string;
  weight: number;
  siteId: number;
}

@Component({
  selector: 'app-agent-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-portal.component.html',
})
export class AgentPortalComponent {
  agent = {
    name: 'John Doe',
    phone: '555-1234',
    email: 'john.doe@demo.com',
    siteId: 1
  };
  assignedSite = {
    id: 1,
    name: 'Site Alpha',
    location: '123 Main St.'
  };
  materialTypes = ['Plastic', 'Paper', 'Cardboard', 'Glass', 'Metal'];
  weighingHistory: Weighing[] = [];
  newWeigh = { material: '', weight: null };

  addWeighing() {
    if (this.newWeigh.material && typeof this.newWeigh.weight === 'number' && this.newWeigh.weight > 0) {
      this.weighingHistory.unshift({
        date: new Date(),
        material: this.newWeigh.material,
        weight: this.newWeigh.weight as number,
        siteId: this.agent.siteId
      });
      this.newWeigh = { material: '', weight: null };
    }
  }

  getMaterialTotal(material: string): number {
    return this.weighingHistory
      .filter(w => w.material === material && w.siteId === this.assignedSite.id)
      .reduce((sum, w) => sum + w.weight, 0);
  }

  getMaterialsSummary() {
    return this.materialTypes.map(m => ({
      material: m,
      total: this.getMaterialTotal(m)
    }));
  }
}
