#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract';
import endContract from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f80b66aa7174742de260b45a5f0d3021da2d4f332cf698c1bc9f82df4b8efa24/contract';
import startContract from '../../snapshots/f80b66aa7174742de260b45a5f0d3021da2d4f332cf698c1bc9f82df4b8efa24/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('updated_at', 'timestamp', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamp-temporal@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
