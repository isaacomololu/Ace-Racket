import { User } from 'src/database/models/user.model';
import { USER_REPOSITORY } from 'src/database/constants';

export const authProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];