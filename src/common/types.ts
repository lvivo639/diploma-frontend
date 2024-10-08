export type RootState = {
  auth: AuthState;
  user: UserState;
};

export type Token = {
  token: string;
};

export interface AuthStateKeys {
  [key: string]: unknown;
}

export interface AuthState extends AuthStateKeys {
  token: Token | null;
}

export type UserState = {
  currentUser: User | null;
  isLoading: boolean;
  isSignIn: boolean;
  error: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  created_at: string;
  supplier_setting?: SupplierSetting;
  dropshipper_setting?: DropshipperSetting;
}

export interface Role {
  name: string;
  type: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  image: UploadedFile;
  description: string;
  category?: string;
  price: number;
  oldPrice?: number;
  count: number;
  suplier_setting_id: number;
}

export interface UploadedFile {
  _id: string;
  name: string;
  url: string;
}

export interface SupplierSetting {
  id: number;
  storageName: string;
  description: string;
  users_permissions_user: User;
  header: UploadedFile;
  uniqueHash: string;
}

export interface DropshipperSetting {
  id: number;
  users_permissions_user: User;
  supplier_settings: Array<SupplierSetting>;
  telegramUsername?: string;
  phoneNumber?: string;
  cardNumber?: string;
  telegramId?: number;
  telegramCode?: string;
}

export interface ProductOrder {
  id: number;
  product: Product;
  price: number;
  count: number;
}

export type OrderStatus = 'packaging' | 'sent' | 'received' | 'sentBack';
export interface Order {
  id: number;
  product_orders: Array<ProductOrder>;
  address: string;
  price: number;
  fullName: string;
  description: string;
  status: OrderStatus;
}

export interface Payment {
  id: number;
  paymentDateTime?: string; // ISO string || undefined
  amount: number;
  supplier_setting: SupplierSetting;
  dropshipper_setting: DropshipperSetting;
}
