import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Weighing {
  date: Date;
  vehicle: string;
  material: string;
  gross: number;
  tare: number;
  net: number;
  cameraUrl?: string;
  status: 'IN' | 'OUT';
}

@Component({
  selector: 'app-weighbridge-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weighbridge-portal.component.html',
})
export class WeighbridgePortalComponent {
  operator = {
    name: 'Jane Smith',
    phone: '555-5678',
    email: 'jane.smith@demo.com',
  };
  weighbridge = {
    name: 'Main Weighbridge',
    location: '456 Recycling Rd.'
  };
  materialTypes = ['Plastic', 'Paper', 'Cardboard', 'Glass', 'Metal'];
  weighingHistory: Weighing[] = [];
  inProgress: { [vehicle: string]: Weighing[] } = {};
  newWeigh = { vehicle: '', material: '', gross: null, tare: null, cameraUrl: '', status: 'IN' as 'IN' | 'OUT' };

  // Simulate camera feed (replace with real stream in production)
  getCameraUrl(): string {
    return 'https://dummyimage.com/600x200/cccccc/000000&text=Vehicle+Top+View';
  }

  addWeighing() {
    if (
      this.newWeigh.vehicle &&
      this.newWeigh.material &&
      typeof this.newWeigh.gross === 'number' &&
      this.newWeigh.gross > 0
    ) {
      if (this.newWeigh.status === 'IN') {
        // Record entry (gross weight)
        if (!this.inProgress[this.newWeigh.vehicle]) this.inProgress[this.newWeigh.vehicle] = [];
        this.inProgress[this.newWeigh.vehicle].push({
          date: new Date(),
          vehicle: this.newWeigh.vehicle,
          material: this.newWeigh.material,
          gross: this.newWeigh.gross,
          tare: 0,
          net: 0,
          cameraUrl: this.getCameraUrl(),
          status: 'IN'
        });
      } else if (
        this.newWeigh.status === 'OUT' &&
        typeof this.newWeigh.tare === 'number' &&
        this.newWeigh.tare > 0 &&
        this.inProgress[this.newWeigh.vehicle] &&
        this.inProgress[this.newWeigh.vehicle].length > 0
      ) {
        // Complete the last IN record for this vehicle/material
        const lastIn = this.inProgress[this.newWeigh.vehicle].find(
          w => w.material === this.newWeigh.material && w.status === 'IN' && w.tare === 0
        );
        if (lastIn) {
          lastIn.tare = this.newWeigh.tare;
          lastIn.net = +(lastIn.gross - lastIn.tare).toFixed(2);
          lastIn.status = 'OUT';
          lastIn.date = new Date();
          lastIn.cameraUrl = this.getCameraUrl();
          this.weighingHistory.unshift({ ...lastIn });
          // Remove from inProgress
          this.inProgress[this.newWeigh.vehicle] = this.inProgress[this.newWeigh.vehicle].filter(w => w !== lastIn);
        }
      }
      this.newWeigh = { vehicle: '', material: '', gross: null, tare: null, cameraUrl: '', status: 'IN' };
    }
  }

  setWeighStatus(status: 'IN' | 'OUT') {
    this.newWeigh.status = status;
  }

  getMaterialTotal(material: string): number {
    return this.weighingHistory
      .filter(w => w.material === material && w.status === 'OUT')
      .reduce((sum, w) => sum + w.net, 0);
  }

  get inProgressKeys() {
    return Object.keys(this.inProgress);
  }
}
