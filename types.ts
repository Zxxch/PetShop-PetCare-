export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  breed: string;
  age: number;
  photoUrl: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
}