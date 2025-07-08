import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';

interface Order {
    id: string;
    customerName: string;
    address: string;
    serviceType: 'Roll-Off Delivery' | 'Residential Pickup' | 'Commercial Dumpster' | 'Hazardous Waste';
    estimatedHours: number;
}

interface Driver {
    id: number;
    name: string;
    vehicleId: string;
    shiftHours: number;
    assignedOrders: Order[];
}

@Component({
    selector: 'app-schedule-plan',
    standalone: true,
    imports: [
        CommonModule,
        DragDropModule
    ],
    templateUrl: './schedule-plan.component.html',
    styleUrls: ['./schedule-plan.component.scss']
})
export class SchedulePlanComponent implements OnInit {
    public unassignedOrders: Order[] = [];
    public drivers: Driver[] = [];
    public allDropLists: string[] = [];

    ngOnInit(): void {
        this.loadMockData();
        this.allDropLists = [
            'unassignedList',
            ...this.drivers.map(driver => `driverList-${driver.id}`)
        ];
    }

    drop(event: CdkDragDrop<Order[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    getScheduledHours(driver: Driver): number {
        return driver.assignedOrders.reduce((sum, order) => sum + order.estimatedHours, 0);
    }

    getWorkloadPercent(driver: Driver): number {
        const scheduled = this.getScheduledHours(driver);
        if (driver.shiftHours === 0) return 100;
        return (scheduled / driver.shiftHours) * 100;
    }

    loadMockData(): void {
        this.unassignedOrders = [
            { id: 'ORD-7890', customerName: 'Mabaso Construction', address: '12 Vilakazi St, Soweto', serviceType: 'Roll-Off Delivery', estimatedHours: 1.5 },
            { id: 'ORD-7891', customerName: 'Cape Town Bistro', address: '45 Long St, Cape Town', serviceType: 'Commercial Dumpster', estimatedHours: 0.75 },
            { id: 'ORD-7892', customerName: 'Chris Hani Baragwanath Hospital', address: '26 Chris Hani Rd, Diepkloof', serviceType: 'Hazardous Waste', estimatedHours: 2.5 },
            { id: 'ORD-7893', customerName: 'Umhlanga Ridge HOA', address: '1 Lagoon Dr, Umhlanga', serviceType: 'Residential Pickup', estimatedHours: 3.0 },
        ];

        this.drivers = [
            {
                id: 1, name: 'Sipho Nkosi', vehicleId: 'TRK-101', shiftHours: 8,
                assignedOrders: [
                    { id: 'ORD-7880', customerName: 'Sandton City Mall', address: '83 Rivonia Rd, Sandton', serviceType: 'Commercial Dumpster', estimatedHours: 1.0 }
                ]
            },
            {
                id: 2, name: 'Thandi Mthembu', vehicleId: 'TRK-201', shiftHours: 8,
                assignedOrders: []
            },
            {
                id: 3, name: 'Jabu Dlamini', vehicleId: 'TRK-102', shiftHours: 8,
                assignedOrders: [
                    { id: 'ORD-7881', customerName: 'Durban Old Mill', address: '5 Smith St, Durban', serviceType: 'Roll-Off Delivery', estimatedHours: 2.0 },
                    { id: 'ORD-7882', customerName: 'Pretoria Gardens', address: '101 Church St, Pretoria', serviceType: 'Residential Pickup', estimatedHours: 2.5 }
                ]
            },
            {
                id: 4, name: 'Lerato Molefe', vehicleId: 'HZ-01', shiftHours: 8,
                assignedOrders: []
            },
        ];
    }
}