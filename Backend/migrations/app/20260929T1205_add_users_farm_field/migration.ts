#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract';
import endContract from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ee130832d76786f06f6b670f6c69429ccd263eb465391f75d816196b026a6afc/contract';
import startContract from '../../snapshots/ee130832d76786f06f6b670f6c69429ccd263eb465391f75d816196b026a6afc/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'farm',
        columns: [
          col('area', 'numeric(10,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 2 } },
          }),
          col('createdAt', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
          col('id', 'BIGSERIAL', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('location', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'field',
        columns: [
          col('area', 'numeric(10,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 2 } },
          }),
          col('createdAt', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
          col('cropId', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('farmId', 'int8', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'BIGSERIAL', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('created_at', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('google_id', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'BIGSERIAL', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'users_pkey' })],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_google_id_key',
        columns: ['google_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'farm',
        index: 'farm_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'field',
        index: 'field_cropId_idx_879e8d63',
        columns: ['cropId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'field',
        index: 'field_farmId_idx_786bd89b',
        columns: ['farmId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'farm',
        foreignKey: {
          name: 'farm_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'field',
        foreignKey: {
          name: 'field_farmId_fkey',
          columns: ['farmId'],
          references: { schema: 'public', table: 'farm', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'field',
        foreignKey: {
          name: 'field_cropId_fkey',
          columns: ['cropId'],
          references: { schema: 'public', table: 'crop', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
