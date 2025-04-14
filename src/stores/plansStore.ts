import { makeAutoObservable } from 'mobx';
import { PlanItem } from '../components/PlanList';

// Initial mock data
const initialPlans: PlanItem[] = [
  {
    id: '1',
    title: '杭州西湖之旅',
    destination: '浙江杭州',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    participants: 4,
    status: 'not_started',
    budget: 3000,
  },
  {
    id: '2',
    title: '云南丽江古城游',
    destination: '云南丽江',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    participants: 2,
    status: 'in_progress',
    budget: 5000,
  },
  {
    id: '3',
    title: '北京长城一日游',
    destination: '北京密云',
    startDate: '2024-02-28',
    endDate: '2024-02-28',
    participants: 3,
    status: 'completed',
    budget: 1500,
  },
];

export class PlansStore {
  plans: PlanItem[] = initialPlans;
  
  constructor() {
    makeAutoObservable(this);
  }

  // Add a new plan
  addPlan(plan: Omit<PlanItem, 'id'>) {
    const newPlan: PlanItem = {
      ...plan,
      id: String(this.plans.length + 1), // In a real app, this would be generated on the server
    };
    this.plans.push(newPlan);
    return newPlan;
  }

  // Get a plan by ID
  getPlanById(id: string) {
    return this.plans.find(plan => plan.id === id);
  }

  // Get filtered plans
  getFilteredPlans(status?: string) {
    if (!status) return this.plans;
    return this.plans.filter(plan => plan.status === status);
  }

  // Get completed plans
  get completedPlans() {
    return this.plans.filter(plan => plan.status === 'completed');
  }

  // Get in-progress plans
  get inProgressPlans() {
    return this.plans.filter(plan => plan.status === 'in_progress');
  }

  // Get not-started plans
  get notStartedPlans() {
    return this.plans.filter(plan => plan.status === 'not_started');
  }

  // Update an existing plan
  updatePlan(id: string, updatedPlan: Partial<PlanItem>) {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      this.plans[index] = { ...this.plans[index], ...updatedPlan };
    }
  }

  // Delete a plan
  deletePlan(id: string) {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      this.plans.splice(index, 1);
    }
  }
}

export const plansStore = new PlansStore();