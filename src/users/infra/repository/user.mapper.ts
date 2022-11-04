import { User } from 'src/users/domain/user';
import { UserModel } from './user.entity';

export class UserMapper {
  static domainToModel(domain: User): UserModel {
    const {
      address,
      created_at,
      email,
      id,
      name,
      password,
      phone,
      updated_at,
    } = domain;

    const { city, country, neighborhood, state, zip } = address;

    return Object.assign(new UserModel(), {
      id,
      name,
      password,
      phone,
      updated_at,
      created_at,
      email,
      city,
      country,
      neighborhood,
      state,
      zip,
    });
  }

  static modelToDomain(model: UserModel): User {
    if (!model?.id) return;

    const {
      city,
      country,
      created_at,
      email,
      name,
      neighborhood,
      password,
      phone,
      state,
      updated_at,
      zip,
      id,
    } = model;

    return new User({
      name,
      password,
      phone,
      created_at,
      updated_at,
      id,
      email,
      address: { city, country, state, zip, neighborhood },
    });
  }
}
