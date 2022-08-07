import { Request } from 'express';
import UserModel from 'src/database/models/user.model';

export interface CredsDTO {
  password: string;
  email: string;
  name: string;
}

export interface RequestWithUser extends Request {
  user: UserModel;
}

export interface TokenPayload {
  userId: number;
  isSecondFactorAuthenticated?: boolean;
}
