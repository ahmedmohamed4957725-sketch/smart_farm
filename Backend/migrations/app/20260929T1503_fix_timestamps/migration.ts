#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract';
import startContract from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/3840795480a74e920e07a0a2cb9ab87e54db71d3c4fbdd8bc3a49480d5283597/contract';
import endContract from '../../snapshots/3840795480a74e920e07a0a2cb9ab87e54db71d3c4fbdd8bc3a49480d5283597/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'farm', column: 'updatedAt' }),
      this.dropColumn({ schema: 'public', table: 'field', column: 'updatedAt' }),
      this.addColumn({
        schema: 'public',
        table: 'farm',
        column: col('updated_At', 'timestamp', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamp-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'field',
        column: col('updated_At', 'timestamp', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamp-temporal@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
