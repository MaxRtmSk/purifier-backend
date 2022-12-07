import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const knexConfig: Knex.Config = {
    client: 'postgresql',
    connection: {
        host: configService.get('VERCEL_POSTGRES_HOST'),
        port: configService.get('VERCEL_POSTGRES_PORT'),
        user: configService.get('VERCEL_POSTGRES_USER'),
        password: configService.get('VERCEL_POSTGRES_PASSWORD'),
        database: configService.get('VERCEL_POSTGRES_DB'),
    },
};

module.exports = knexConfig;