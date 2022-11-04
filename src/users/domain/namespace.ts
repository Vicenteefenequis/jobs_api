import { User } from './user';

export namespace Users {
  export interface Address {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    zip: string;
  }

  export interface Model {
    id?: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    address: Address;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface CreateRepository {
    run(user: User): Promise<User>;
  }

  export interface FindOneRepository {
    run(filter: Partial<Model>): Promise<User>;
  }
}
