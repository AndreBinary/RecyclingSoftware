import { BranchDetail } from "../../../components/dashboards/branches/branch-details/branch-details.component";

export  const MOCK_DATA: { [key: string]: BranchDetail } = {
      'BOK01': {
        branchName: 'Boksburg', code: 'BOK01', manager: 'Thabo Mokoena', status: 'Active',
        revenueMTD: 1200000, revenueVsTarget: 6.5, profitMargin: 18.5, companyAvgProfitMargin: 15.5,
        onTimePercent: 97.2, missedPickups: 3, daysSinceIncident: 120, safetyIncidents: 1,
        tonnageBreakdown: [
          { type: 'Recycling', tons: 900 },
          { type: 'Landfill', tons: 600 },
          { type: 'Organics', tons: 150 }
        ],
        routes: [
          { id: 'SOW-R1', driver: 'Sipho Dlamini', status: 'Completed', onTimePercent: 99, fuelEfficiency: 6.1 },
          { id: 'SOW-R2', driver: 'Nomsa Khumalo', status: 'In Progress', onTimePercent: 95, fuelEfficiency: 5.8 },
          { id: 'SOW-R3', driver: 'Jabu Nkosi', status: 'Completed', onTimePercent: 98, fuelEfficiency: 6.0 },
        ],
        costBreakdown: [
          { category: 'Labor', cost: 400000, percentOfTotal: 40 },
          { category: 'Disposal Fees', cost: 300000, percentOfTotal: 30 },
          { category: 'Fuel', cost: 200000, percentOfTotal: 20 },
          { category: 'Maintenance', cost: 100000, percentOfTotal: 10 },
        ],
        staff: [
          { id: 101, name: 'Sipho Dlamini', role: 'Driver', safetyScore: 96 },
          { id: 102, name: 'Nomsa Khumalo', role: 'Driver', safetyScore: 94 },
          { id: 103, name: 'Jabu Nkosi', role: 'Driver', safetyScore: 97 },
          { id: 104, name: 'Lerato Mthembu', role: 'Supervisor', safetyScore: 99 },
        ],
        fleet: [
          { vehicleId: 'TRK-201', type: 'Front-Loader', status: 'Operational', nextServiceDate: '2025-12-01' },
          { vehicleId: 'TRK-202', type: 'Rear-Loader', status: 'Operational', nextServiceDate: '2025-11-15' },
          { vehicleId: 'TRK-203', type: 'Roll-Off', status: 'Due for Service', nextServiceDate: '2025-10-20' },
        ]
      },
      'JHB02': {
        branchName: 'Johannesburg North', code: 'JHB02', manager: 'Zanele Ndlovu', status: 'Active',
        revenueMTD: 950000, revenueVsTarget: 3.2, profitMargin: 16.2, companyAvgProfitMargin: 15.5,
        onTimePercent: 94.5, missedPickups: 5, daysSinceIncident: 60, safetyIncidents: 0,
        tonnageBreakdown: [
          { type: 'Recycling', tons: 700 },
          { type: 'Landfill', tons: 400 },
          { type: 'Organics', tons: 100 }
        ],
        routes: [
          { id: 'SDT-R1', driver: 'Mandla Zwane', status: 'Completed', onTimePercent: 97, fuelEfficiency: 6.3 },
          { id: 'SDT-R2', driver: 'Thuli Maseko', status: 'In Progress', onTimePercent: 92, fuelEfficiency: 5.9 },
        ],
        costBreakdown: [
          { category: 'Labor', cost: 350000, percentOfTotal: 37 },
          { category: 'Disposal Fees', cost: 250000, percentOfTotal: 26 },
          { category: 'Fuel', cost: 200000, percentOfTotal: 21 },
          { category: 'Maintenance', cost: 150000, percentOfTotal: 16 },
        ],
        staff: [
          { id: 201, name: 'Mandla Zwane', role: 'Driver', safetyScore: 93 },
          { id: 202, name: 'Thuli Maseko', role: 'Driver', safetyScore: 91 },
          { id: 203, name: 'Sizwe Mokoena', role: 'Supervisor', safetyScore: 95 },
        ],
        fleet: [
          { vehicleId: 'TRK-301', type: 'Rear-Loader', status: 'Operational', nextServiceDate: '2025-09-10' },
          { vehicleId: 'TRK-302', type: 'Front-Loader', status: 'In Shop', nextServiceDate: '2025-08-01' },
        ]
      }
    };