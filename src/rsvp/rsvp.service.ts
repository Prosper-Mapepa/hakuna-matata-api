import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(private prisma: PrismaService) {}

  async create(createRsvpDto: CreateRsvpDto) {
    return this.prisma.rsvp.create({
      data: createRsvpDto,
    });
  }

  async findAll() {
    return this.prisma.rsvp.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

