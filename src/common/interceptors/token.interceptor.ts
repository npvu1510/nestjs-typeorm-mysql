import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config';

export class TokenInterceptor implements NestInterceptor {
  private jwtService: JwtService;

  constructor(signRefreshToken: boolean) {
    this.jwtService = new JwtService();
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const token = context.req.headers.authorization?.split(' ')[1];
    const res: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((response) => {
        const { email } = response;
        console.log(response);

        const accessToken = this.jwtService.sign(
          { email },
          { secret: envs.JWT_SECRET, expiresIn: envs.JWT_EXPIRES },
        );

        const refreshToken = this.jwtService.sign(
          { email },
          { secret: envs.JWT_SECRET, expiresIn: '7d' },
        );

        res.cookie('accessToken', accessToken, {
          sameSite: 'lax',
          httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
          sameSite: 'lax',
          httpOnly: true,
        });

        response.tokens = { accessToken };
        return response;
      }),
    );
  }
}
