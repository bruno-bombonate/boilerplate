import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Get, Request, Param, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResetPasswordService } from './users-reset-password.service';
import { JwtService } from '@nestjs/jwt';
import { BoilerplateEmailService } from '@app/boilerplate-email';
import { compare } from 'bcryptjs';
import { JwtGuard } from '../../utils/guards/jwt/jwt.guard';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserResetPasswordCreateDto } from './dto/user-reset-password-create.dto';
import { UserResetPasswordPatchDto } from './dto/user-reset-password-patch.dto';
import { UserChangePasswordDto } from './dto/user-change-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly usersResetPasswordService: UsersResetPasswordService,
    private readonly jwtService: JwtService,
    private readonly boilerplateEmailService: BoilerplateEmailService
  ) { }

  @Post('sign-up')
  public async signUp(
    @Body() userSignUpDto: UserSignUpDto
  ) {

    const userFound = await this.usersService.getUser({ where: { userEmail: userSignUpDto.email } });
    if (userFound !== null) {
      throw new HttpException('An user with that email already exists.', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.createUser(userSignUpDto);

    return {
      message: 'Your account has been successfully created.'
    };

  }

  @Post('sign-in')
  public async signIn(
    @Body() userSignInDto: UserSignInDto
  ) {

    const message = 'Email or password is incorrect.';

    const userFound = await this.usersService.getUserWithPassword({ where: { userEmail: userSignInDto.email } });
    if (userFound === null) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const isPasswordCorrect = await compare(userSignInDto.password, userFound.password);
    if (isPasswordCorrect === false) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    if (userFound.status === false) {
      throw new HttpException('Your user is inactive. Please contact administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Your session has been successfully started.',
      data: {
        accessToken: this.jwtService.sign({ id: userFound.id }),
        expiresIn: +process.env.APP_BOILERPLATE_USER_API_EXPIRES_IN
      }
    };

  }

  @Post('reset-password')
  public async resetPasswordRequest(
    @Body() userResetPasswordCreateDto: UserResetPasswordCreateDto
  ) {

    const userFound = await this.usersService.getUser({ where: { userEmail: userResetPasswordCreateDto.email } });
    if (userFound === null) {
      throw new HttpException('This email is incorrect.', HttpStatus.BAD_REQUEST);
    }

    if (userFound.status === false) {
      throw new HttpException('Your user is inactive. Please contact administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    const userResetPasswordCreatedId = (await this.usersResetPasswordService.createUserResetPassword({ userId: userFound.id })).raw.insertId;
    const userResetPasswordCreated = await this.usersResetPasswordService.getUserResetPassword({ where: { userResetPasswordId: userResetPasswordCreatedId } });

    this.boilerplateEmailService.sendResetPasswordEmail(
      userFound.email,
      userFound.name,
      `${process.env.APP_BOILERPLATE_USER_WEB_URL}/reset-password?token=${userResetPasswordCreated.token}`
    );

    return {
      message: 'The password reset email has been sent successfully.'
    };

  }

  @Patch('reset-password/:userResetPasswordToken')
  public async resetPassword(
    @Param('userResetPasswordToken') userResetPasswordToken: string,
    @Body() userResetPasswordPatchDto: UserResetPasswordPatchDto
  ) {

    const userResetPasswordFound = await this.usersResetPasswordService.getUserResetPassword({ where: { userResetPasswordToken } });
    if (userResetPasswordFound === null) {
      throw new HttpException('This password reset link does not exist.', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.usersService.getUser({ where: { userId: userResetPasswordFound.userId } });

    if (userFound.status === false) {
      throw new HttpException('Your user is inactive. Please contact administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    if (userResetPasswordFound.updatedAt !== null) {
      throw new HttpException('This password reset link has already been used.', HttpStatus.BAD_REQUEST);
    }

    const minutes = 60;
    const minutesInSeconds = minutes * 60;
    const minutesInMilliseconds = minutesInSeconds * 1000;

    const isExpired = (Date.now() - userResetPasswordFound.createdAt) >= minutesInMilliseconds;

    if (isExpired === true) {
      throw new HttpException('This password reset link has expired.', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.updateUser({ id: userFound.id }, { password: userResetPasswordPatchDto.password });
    await this.usersResetPasswordService.updateUserResetPassword({ id: userResetPasswordFound.id }, { updatedAt: Date.now() });

    return {
      message: 'Your password has been successfully reset.'
    };

  }

  @UseGuards(JwtGuard)
  @Get('me')
  public async me(
    @Request() request: any
  ) {

    const userFound = await this.usersService.getUser({ where: { userId: request.user.id } });
    if (userFound === null) {
      throw new HttpException('Your user was not found.', HttpStatus.BAD_REQUEST);
    }

    return {
      data: userFound
    };

  }

  @UseGuards(JwtGuard)
  @Patch('change-password')
  public async changePassword(
    @Request() request: any,
    @Body() userChangePasswordDto: UserChangePasswordDto
  ) {

    const userFound = await this.usersService.getUserWithPassword({ where: { userId: request.user.id } });

    const isPasswordCurrentCorrect = await compare(userChangePasswordDto.passwordCurrent, userFound.password);
    if (isPasswordCurrentCorrect === false) {
      throw new HttpException('The current password entered is incorrect.', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.updateUser({ id: request.user.id }, { password: userChangePasswordDto.passwordNew });

    return {
      message: 'Your password has been successfully changed.'
    };

  }

}
