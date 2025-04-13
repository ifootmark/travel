import { makeAutoObservable } from 'mobx';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

class AuthStore {
  user: User | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
    this.isAuthenticated = !!user;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }
}

export const authStore = new AuthStore();