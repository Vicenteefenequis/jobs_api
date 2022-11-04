import { Exclude, Expose } from 'class-transformer';
import { Users } from 'src/users/domain/namespace';

@Exclude()
export class UserDTO {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() phone: string;
  @Expose() email: string;
  @Expose() address: Users.Address;
  @Expose() created_at?: Date;
  @Expose() updated_at?: Date;
}
