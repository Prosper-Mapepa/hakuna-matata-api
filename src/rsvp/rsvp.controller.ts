import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  async create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.rsvpService.create(createRsvpDto);
  }

  @Get()
  async findAll(@Query('password') password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword || password !== adminPassword) {
      throw new UnauthorizedException('Invalid admin password');
    }

    return this.rsvpService.findAll();
  }
}

