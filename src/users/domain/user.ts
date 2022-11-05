import { randomUUID } from 'crypto';
import { hashSync, compareSync } from 'bcryptjs';
import { Users } from './namespace';

export class User {
  constructor(private readonly _props: Users.Model) {
    _props.id = _props.id ?? randomUUID();

    this._props.created_at = this._props.created_at ?? new Date();
    this._props.updated_at = this._props.updated_at ?? new Date();
  }

  encrypt_password() {
    this._props.password = hashSync(this._props.password);
  }

  has_valid_password(password: string) {
    return compareSync(password, this._props.password);
  }

  get id() {
    return this._props.id;
  }

  get name() {
    return this._props.name;
  }

  get phone() {
    return this._props.phone;
  }

  get email() {
    return this._props.email;
  }

  get password() {
    return this._props.password;
  }

  get address() {
    return this._props.address;
  }

  get created_at() {
    return this._props.created_at;
  }

  get updated_at() {
    return this._props.updated_at;
  }
}
