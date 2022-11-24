import { Exclude, Type } from 'class-transformer';
import { Role } from 'src/user/enums/user.enum';
class UserSerializer {
  name: string;
  email: string;
  role: Role;

  @Exclude()
  userName: string;
  @Exclude()
  password: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}

export class UserLoginSerializer {
  @Type(() => UserSerializer)
  user: UserSerializer;

  access_token: string;

  constructor(partial: Partial<UserLoginSerializer>) {
    Object.assign(this, partial);
  }
}
