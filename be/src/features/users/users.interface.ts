export interface IUser {
  userName: string;
  password: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  role: {
    roleId: number;
    description: string;
    permissions?: {
      permissionId: number;
      description: string;
      apiPath: string;
      method: string;
      module: string;
    }[]
  }
}