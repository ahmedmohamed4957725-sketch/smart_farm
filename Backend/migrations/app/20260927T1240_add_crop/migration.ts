#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract';
import startContract from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ee130832d76786f06f6b670f6c69429ccd263eb465391f75d816196b026a6afc/contract';
import endContract from '../../snapshots/ee130832d76786f06f6b670f6c69429ccd263eb465391f75d816196b026a6afc/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'users' }),
      this.createTable({
        schema: 'public',
        table: 'crop',
        columns: [
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'BIGSERIAL', { notNull: true, codecRef: { codecId: 'pg/int8@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
