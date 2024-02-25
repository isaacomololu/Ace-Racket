import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.model';
import { UserDto } from './dtos/user.dto';
import { USER_REPOSITORY } from 'src/database/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        private readonly jwtService: JwtService,
        ) {}

    async create(payload: UserDto): Promise<User> {
        return await this.userRepository.create<User>(payload);
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    public async createUser(user: UserDto) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.create({ ...user, password: pass });
        const { password, ...result } = newUser['dataValues'];
        const token = await this.generateToken(result);
        return { user: result, token };
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: {email} });
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: {id} });
    } 

    async validateUser(username: string, pass: string) {
        const user = await this.findByEmail(username);
        if (!user) {
            return null;
        }

        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        const { password, ...result } = user['dataValues']
        return result;
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enterdPassword, dbPassword) {
        const match = await bcrypt.compare(enterdPassword, dbPassword);
        return match; 
    }
}
