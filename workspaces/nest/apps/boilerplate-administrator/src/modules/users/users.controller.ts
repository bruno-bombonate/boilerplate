import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtGuard } from '../../utils/guards/jwt/jwt.guard.js';
import { BooleanPipe } from '../../utils/pipes/boolean/boolean.pipe.js';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtGuard)
  @Get()
  public async getUsers(
    @Query('userId') userId: null | number,
    @Query('userName') userName: null | string,
    @Query('userEmail') userEmail: null | string,
    @Query('userStatus', BooleanPipe) userStatus: null | boolean,
    @Query('orderBy') orderBy: null | string | any,
    @Query('orderByDirection') orderByDirection: null | string,
    @Query('offset') offset: null | number,
    @Query('limit') limit: null | number
  ) {

    const orderByValue = orderBy || 'userId';
    const orderByDirectionValue = orderByDirection || 'ASC';

    const where = { userId, userName, userEmail, userStatus };
    orderBy = { [orderByValue]: orderByDirectionValue };

    const usersFoundQuery = this.usersService.getUsers({ where, orderBy, offset, limit });
    const usersFound = await usersFoundQuery.getMany();

    const usersFoundCountQuery = this.usersService.getUsers({ where });
    const usersFoundCount = await usersFoundCountQuery.getCount();

    return {
      orderBy: orderByValue,
      orderByDirection: orderByDirectionValue,
      data: usersFound,
      length: usersFoundCount
    };

  }

  @UseGuards(JwtGuard)
  @Get(':userId')
  public async getUser(
    @Param('userId') userId: string
  ) {

    const userFound = await this.usersService.getUser({ where: { userId: userId } });
    if (userFound === null) {
      throw new HttpException('This user does not exist.', HttpStatus.BAD_REQUEST);
    }

    return {
      data: userFound
    };

  }

}
