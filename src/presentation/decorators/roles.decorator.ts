import { SetMetadata } from '@nestjs/common';
import { Role, Constants } from '../enums';

export const RolesGate = (...role: Role[]) => SetMetadata(Constants.ROLE, role);
