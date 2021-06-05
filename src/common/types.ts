export type RootState = {
  auth: AuthState;
  user: UserState;
  supplierProductList: SupplierProductListState;
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

export type SupplierProductListState = {
  productList: Array<Product>;
  isLoading: boolean;
  error: string;
};

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  first_name: string;
  last_name: string;
  created_at: string;
  supplier_setting?: SupplierSetting;
  dropshipper_setting?: DropshipperSettings;
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
  price: number;
  oldPrice: number;
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
  users_permissions_user: number;
  header: UploadedFile;
}

export interface DropshipperSettings {
  id: number;
  users_permissions_user: number;
  supplier_settings: Array<SupplierSetting>;
}
