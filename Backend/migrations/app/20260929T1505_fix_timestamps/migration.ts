#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0175796f07adc786f2187727ccf4662d6a7033a3611f047850c12637b094eb27/contract';
import endContract from '../../snapshots/0175796f07adc786f2187727ccf4662d6a7033a3611f047850c12637b094eb27/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract';
import startContract from '../../snapshots/3592988902b36ef39cb2dc516782faef8285c6c3eab73c40b7df528532968204/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dataTransform(endContract, 'typechange-farm-updatedAt', {
        check: () => placeholder('typechange-farm-updatedAt:check'),
        run: () => placeholder('typechange-farm-updatedAt:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'farm',
        column: 'updatedAt',
        options: {
          qualifiedTargetType: 'timestamp',
          formatTypeExpected: 'timestamp without time zone',
          rawTargetTypeForLabel: 'timestamp',
        },
      }),
      this.dataTransform(endContract, 'typechange-field-updatedAt', {
        check: () => placeholder('typechange-field-updatedAt:check'),
        run: () => placeholder('typechange-field-updatedAt:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'field',
        column: 'updatedAt',
        options: {
          qualifiedTargetType: 'timestamp',
          formatTypeExpected: 'timestamp without time zone',
          rawTargetTypeForLabel: 'timestamp',
        },
      }),
      this.setDefault({
        schema: 'public',
        table: 'farm',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'field',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
