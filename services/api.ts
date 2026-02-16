
import { Product, User, Requisition, StockMovement } from '../types';

/**
 * ApiService - Camada de abstração para dados.
 * Atualmente utiliza localStorage, mas está preparada para se tornar uma API REST/GraphQL.
 */
export const ApiService = {
  async getProducts(): Promise<Product[]> {
    const data = localStorage.getItem('sm_products');
    return data ? JSON.parse(data) : [];
  },

  async saveProducts(products: Product[]): Promise<void> {
    localStorage.setItem('sm_products', JSON.stringify(products));
  },

  async getUsers(): Promise<User[]> {
    const data = localStorage.getItem('sm_users_list');
    return data ? JSON.parse(data) : [];
  },

  async saveUsers(users: User[]): Promise<void> {
    localStorage.setItem('sm_users_list', JSON.stringify(users));
  },

  async getRequisitions(): Promise<Requisition[]> {
    const data = localStorage.getItem('sm_requisitions');
    return data ? JSON.parse(data) : [];
  },

  async saveRequisition(req: Requisition): Promise<void> {
    const current = await this.getRequisitions();
    localStorage.setItem('sm_requisitions', JSON.stringify([req, ...current]));
  },

  async getMovements(): Promise<StockMovement[]> {
    const data = localStorage.getItem('sm_movements');
    return data ? JSON.parse(data) : [];
  },

  async saveMovements(movements: StockMovement[]): Promise<void> {
    const current = await this.getMovements();
    localStorage.setItem('sm_movements', JSON.stringify([...movements, ...current]));
  }
};
