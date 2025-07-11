import { Expose, Transform, Type } from 'class-transformer';

export class CaseUserViewDto {
  @Expose()
  user_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.phone_number)
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.full_name)
  full_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.role?.description || null)
  description: string;
}

export class CaseUserDto {
  @Expose()
  user_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.phone_number)
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.full_name)
  full_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.zone)
  zone: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.present_status)
  present_status: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.role?.description || null)
  description: string;
}