import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const existentUser = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!existentUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isValidLogin = await compare(password, existentUser.password);

    if (!isValidLogin) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateJwtAccessToken(existentUser.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, password, email } = signupDto;
    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('O email informado já está sendo utilizado.');
    }

    const hashedPassword = await hash(password, 12);
    const user = await this.usersRepo.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateJwtAccessToken(user.id);

    return { accessToken };
  }

  private async generateJwtAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
