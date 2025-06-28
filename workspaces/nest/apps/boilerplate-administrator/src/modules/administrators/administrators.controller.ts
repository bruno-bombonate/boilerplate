import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Get, Request, Query, Param, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsResetPasswordService } from './administrators-reset-password.service';
import { JwtService } from '@nestjs/jwt';
import { BoilerplateEmailService } from '@app/boilerplate-email';
import { compare } from 'bcryptjs';
import { JwtGuard } from 'apps/boilerplate-administrator/src/utils/guards/jwt/jwt.guard';
import { AdministratorSignInDto } from './dto/administrator-sign-in.dto';
import { AdministratorResetPasswordCreateDto } from './dto/administrator-reset-password-create.dto';
import { AdministratorResetPasswordPatchDto } from './dto/administrator-reset-password-patch.dto';
import { AdministratorChangePasswordDto } from './dto/administrator-change-password.dto';
import { BooleanPipe } from 'apps/boilerplate-administrator/src/utils/pipes/boolean/boolean.pipe';
import { AdministratorCreateDto } from './dto/administrator-create.dto';
import { AdministratorUpdateDto } from './dto/administrator-update.dto';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorsController {

  constructor(
    private readonly administratorsService: AdministratorsService,
    private readonly administratorsResetPasswordService: AdministratorsResetPasswordService,
    private readonly jwtService: JwtService,
    private readonly boilerplateEmailService: BoilerplateEmailService
  ) { }

  @Post('sign-in')
  public async signIn(
    @Body() administratorSignInDto: AdministratorSignInDto
  ) {

    const message = 'Email or password is incorrect.';

    const administratorFound = await this.administratorsService.getAdministratorWithPassword({ where: { administratorEmail: administratorSignInDto.email } });
    if (administratorFound === null) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const isPasswordCorrect = await compare(administratorSignInDto.password, administratorFound.password);
    if (isPasswordCorrect === false) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    if (administratorFound.status === false) {
      throw new HttpException('Your administrator is inactive. Please contact your administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Your session has been successfully started.',
      data: {
        accessToken: this.jwtService.sign({ id: administratorFound.id }),
        expiresIn: +process.env.APP_BOILERPLATE_ADMINISTRATOR_API_EXPIRES_IN
      }
    };

  }

  @Post('reset-password')
  public async resetPasswordRequest(
    @Body() administratorResetPasswordCreateDto: AdministratorResetPasswordCreateDto
  ) {

    const administratorFound = await this.administratorsService.getAdministrator({ where: { administratorEmail: administratorResetPasswordCreateDto.email } });
    if (administratorFound === null) {
      throw new HttpException('This email is incorrect.', HttpStatus.BAD_REQUEST);
    }

    if (administratorFound.status === false) {
      throw new HttpException('Your administrator is inactive. Please contact your administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    const administratorResetPasswordCreatedId = (await this.administratorsResetPasswordService.createAdministratorResetPassword({ administratorId: administratorFound.id })).raw.insertId;
    const administratorResetPasswordCreated = await this.administratorsResetPasswordService.getAdministratorResetPassword({ where: { administratorResetPasswordId: administratorResetPasswordCreatedId } });

    this.boilerplateEmailService.sendResetPasswordEmail(
      administratorFound.email,
      administratorFound.name,
      `${process.env.APP_BOILERPLATE_ADMINISTRATOR_WEB_URL}/reset-password?token=${administratorResetPasswordCreated.token}`
    );

    return {
      message: 'The password reset email has been sent successfully.'
    };

  }

  @Patch('reset-password/:administratorResetPasswordToken')
  public async resetPassword(
    @Param('administratorResetPasswordToken') administratorResetPasswordToken: string,
    @Body() administratorResetPasswordPatchDto: AdministratorResetPasswordPatchDto
  ) {

    const administratorResetPasswordFound = await this.administratorsResetPasswordService.getAdministratorResetPassword({ where: { administratorResetPasswordToken: administratorResetPasswordToken } });
    if (administratorResetPasswordFound === null) {
      throw new HttpException('This password reset link does not exist.', HttpStatus.BAD_REQUEST);
    }

    if (administratorResetPasswordFound.administrator.status === false) {
      throw new HttpException('Your administrator is inactive. Please contact your administrator to enable it.', HttpStatus.BAD_REQUEST);
    }

    if (administratorResetPasswordFound.updatedAt !== null) {
      throw new HttpException('This password reset link has already been used.', HttpStatus.BAD_REQUEST);
    }

    const minutes = 60;
    const minutesInSeconds = minutes * 60;
    const minutesInMilliseconds = minutesInSeconds * 1000;

    const isExpired = (Date.now() - administratorResetPasswordFound.createdAt) >= minutesInMilliseconds;

    if (isExpired === true) {
      throw new HttpException('This password reset link has expired.', HttpStatus.BAD_REQUEST);
    }

    await this.administratorsService.updateAdministrator({ id: administratorResetPasswordFound.administrator.id }, { password: administratorResetPasswordPatchDto.password });
    await this.administratorsResetPasswordService.updateAdministratorResetPassword({ id: administratorResetPasswordFound.id }, { updatedAt: Date.now() });

    return {
      message: 'Your password has been successfully reset.'
    };

  }

  @UseGuards(JwtGuard)
  @Get('me')
  public async me(
    @Request() request: any
  ) {

    const administratorFound = await this.administratorsService.getAdministrator({ where: { administratorId: request.user.id } });
    if (administratorFound === null) {
      throw new HttpException('Your administrator was not found.', HttpStatus.BAD_REQUEST);
    }

    return {
      data: administratorFound
    };

  }

  @UseGuards(JwtGuard)
  @Patch('change-password')
  public async changePassword(
    @Request() request: any,
    @Body() administratorChangePasswordDto: AdministratorChangePasswordDto
  ) {

    const administratorFound = await this.administratorsService.getAdministratorWithPassword({ where: { administratorId: request.user.id } });

    const isPasswordCurrentCorrect = await compare(administratorChangePasswordDto.passwordCurrent, administratorFound.password);
    if (isPasswordCurrentCorrect === false) {
      throw new HttpException('The current password entered is incorrect.', HttpStatus.BAD_REQUEST);
    }

    await this.administratorsService.updateAdministrator({ id: request.user.id }, { password: administratorChangePasswordDto.passwordNew });

    return {
      message: 'Your password has been successfully changed.'
    };

  }

  @UseGuards(JwtGuard)
  @Get()
  public async getAdministrators(
    @Query('administratorId') administratorId: null | number,
    @Query('administratorName') administratorName: null | string,
    @Query('administratorEmail') administratorEmail: null | string,
    @Query('administratorStatus', BooleanPipe) administratorStatus: null | boolean,
    @Query('orderBy') orderBy: null | string | any,
    @Query('orderByDirection') orderByDirection: null | string,
    @Query('offset') offset: null | number,
    @Query('limit') limit: null | number
  ) {

    const orderByValue = orderBy || 'administratorId';
    const orderByDirectionValue = orderByDirection || 'ASC';

    const where = { administratorId, administratorName, administratorEmail, administratorStatus };
    orderBy = { [orderByValue]: orderByDirectionValue };

    const administratorsFoundQuery = this.administratorsService.getAdministrators({ where, orderBy, offset, limit });
    const administratorsFound = await administratorsFoundQuery.getMany();

    const administratorsFoundCountQuery = this.administratorsService.getAdministrators({ where });
    const administratorsFoundCount = await administratorsFoundCountQuery.getCount();

    return {
      orderBy: orderByValue,
      orderByDirection: orderByDirectionValue,
      data: administratorsFound,
      length: administratorsFoundCount
    };

  }

  @UseGuards(JwtGuard)
  @Get(':administratorId')
  public async getAdministrator(
    @Param('administratorId') administratorId: number
  ) {

    const administratorFound = await this.administratorsService.getAdministrator({ where: { administratorId } });
    if (administratorFound === null) {
      throw new HttpException('This administrator does not exist.', HttpStatus.BAD_REQUEST);
    }

    return {
      data: administratorFound
    };

  }

  @UseGuards(JwtGuard)
  @Post('')
  public async createAdministrator(
    @Body() administratorCreateDto: AdministratorCreateDto
  ) {

    const administratorFound = await this.administratorsService.getAdministrator({ where: { administratorEmail: administratorCreateDto.email } });
    if (administratorFound) {
      throw new HttpException('An administrator with that email already exists.', HttpStatus.BAD_REQUEST);
    }

    await this.administratorsService.createAdministrator(administratorCreateDto);

    return {
      message: 'Administrator has been successfully added.'
    };

  }

  @UseGuards(JwtGuard)
  @Patch(':administratorId')
  public async updateAdministrator(
    @Param('administratorId') administratorId: string,
    @Body() administratorUpdateDto: AdministratorUpdateDto
  ) {

    const administratorFound = await this.administratorsService.getAdministrator({ where: { administratorEmail: administratorUpdateDto.email } });
    if (administratorFound) {
      if (administratorFound.id !== +administratorId) {
        throw new HttpException('An administrator with that email already exists.', HttpStatus.BAD_REQUEST);
      }
    }

    await this.administratorsService.updateAdministrator({ id: administratorFound.id }, administratorUpdateDto);

    return {
      message: 'Administrator has been successfully changed.'
    };

  }

}
