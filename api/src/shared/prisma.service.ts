import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL não está definida. Copie api/.env.example para api/.env e use a URI do Postgres do Supabase (Project Settings → Database).',
      );
    }
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }
}