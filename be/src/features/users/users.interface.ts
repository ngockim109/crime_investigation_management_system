import { UserPositionType } from "src/common/enum/user.enum";

export interface IUser {
  user_name: string;
  password: string;
  full_name: string;
  phone_number: string;
  position: UserPositionType;
  date_of_birth: Date;
  day_attended: Date;
  status: string;
  zone: string;
  role: {
    role_id: string;
    description: string;
    permissions?: {
      permission_id: number;
      description: string;
      api_path: string;
      method: string;
      module: string;
    }[]
  }
}