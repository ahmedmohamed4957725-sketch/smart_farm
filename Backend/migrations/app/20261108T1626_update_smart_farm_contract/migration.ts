#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract';
import startContract from '../../snapshots/0a72143a1544bbc04e8e7c63949833ccc97603c09df722965024bf1bff96a297/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a3f932678557d9a6eee9bc31b4c1318b6a8f8195a7991a4842b62bebaa45c5a3/contract';
import endContract from '../../snapshots/a3f932678557d9a6eee9bc31b4c1318b6a8f8195a7991a4842b62bebaa45c5a3/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  placeholder,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'ai_analyses',
        columns: [
          col('analysis_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('field_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('input_end_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('input_start_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('model_version', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('result', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('COMPLETED'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'alerts',
        columns: [
          col('alert_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('farm_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('field_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sensor_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('severity', 'character varying(30)', {
            notNull: true,
            default: lit('WARNING'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'crop',
        columns: [
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'device_fields',
        columns: [
          col('assigned_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('field_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['device_id', 'field_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'devices',
        columns: [
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('device_uid', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('last_seen_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('name', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('OFFLINE'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'disease_detections',
        columns: [
          col('ai_result', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('confidence', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('disease_name', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('field_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('image_path', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('model_version', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'farm',
        columns: [
          col('area', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('location', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'field',
        columns: [
          col('area', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('crop_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('farm_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'irrigation_devices',
        columns: [
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('device_type', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('field_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('relay_channel', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('INACTIVE'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('water_tank_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'irrigation_events',
        columns: [
          col('command_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('ended_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('failure_reason', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('irrigation_device_id', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('mode', 'character varying(20)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
          }),
          col('requested_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('started_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('triggered_by', 'character varying(20)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'irrigation_recommendations',
        columns: [
          col('analysis_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('approved_by_user_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('field_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('irrigation_device_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('recommendation', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('suggested_duration', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'notifications',
        columns: [
          col('alert_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('is_read', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('notification_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('title', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'sensor_readings',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('received_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('recorded_at', 'timestamptz(6)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('sensor_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('value', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'sensors',
        columns: [
          col('channel_key', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('field_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('hardware_model', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sensor_type', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('unit', 'character varying(30)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'water_tanks',
        columns: [
          col('capacity', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1', typeParams: { precision: 6 } },
          }),
          col('farm_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('status', 'character varying(30)', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('role', 'character varying(20)', {
          notNull: true,
          default: lit('USER'),
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
        }),
      }),
      this.dataTransform(endContract, 'typechange-users-created_at', {
        check: () => placeholder('typechange-users-created_at:check'),
        run: () => placeholder('typechange-users-created_at:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'created_at',
        options: {
          qualifiedTargetType: 'timestamptz(6)',
          formatTypeExpected: 'timestamptz(6)',
          rawTargetTypeForLabel: 'timestamptz(6)',
        },
      }),
      this.dataTransform(endContract, 'typechange-users-email', {
        check: () => placeholder('typechange-users-email:check'),
        run: () => placeholder('typechange-users-email:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'email',
        options: {
          qualifiedTargetType: 'character varying(255)',
          formatTypeExpected: 'character varying(255)',
          rawTargetTypeForLabel: 'character varying(255)',
        },
      }),
      this.dataTransform(endContract, 'typechange-users-id', {
        check: () => placeholder('typechange-users-id:check'),
        run: () => placeholder('typechange-users-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'id',
        options: {
          qualifiedTargetType: 'int4',
          formatTypeExpected: 'integer',
          rawTargetTypeForLabel: 'int4',
        },
      }),
      this.dataTransform(endContract, 'typechange-users-password', {
        check: () => placeholder('typechange-users-password:check'),
        run: () => placeholder('typechange-users-password:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'password',
        options: {
          qualifiedTargetType: 'character varying(255)',
          formatTypeExpected: 'character varying(255)',
          rawTargetTypeForLabel: 'character varying(255)',
        },
      }),
      this.dataTransform(endContract, 'typechange-users-updated_at', {
        check: () => placeholder('typechange-users-updated_at:check'),
        run: () => placeholder('typechange-users-updated_at:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'updated_at',
        options: {
          qualifiedTargetType: 'timestamptz(6)',
          formatTypeExpected: 'timestamptz(6)',
          rawTargetTypeForLabel: 'timestamptz(6)',
        },
      }),
      this.addUnique({
        schema: 'public',
        table: 'devices',
        constraint: 'devices_device_uid_key',
        columns: ['device_uid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'irrigation_events',
        constraint: 'irrigation_events_command_id_key',
        columns: ['command_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ai_analyses',
        index: 'ai_analyses_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'alerts',
        index: 'alerts_device_id_idx_8f329912',
        columns: ['device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'alerts',
        index: 'alerts_farm_id_idx_434cdf2c',
        columns: ['farm_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'alerts',
        index: 'alerts_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'alerts',
        index: 'alerts_sensor_id_idx_2c92121f',
        columns: ['sensor_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'device_fields',
        index: 'device_fields_device_id_idx_8f329912',
        columns: ['device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'device_fields',
        index: 'device_fields_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'disease_detections',
        index: 'disease_detections_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'disease_detections',
        index: 'disease_detections_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'farm',
        index: 'farm_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'field',
        index: 'field_crop_id_idx_5463731e',
        columns: ['crop_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'field',
        index: 'field_farm_id_idx_434cdf2c',
        columns: ['farm_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_devices',
        index: 'irrigation_devices_device_id_idx_8f329912',
        columns: ['device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_devices',
        index: 'irrigation_devices_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_devices',
        index: 'irrigation_devices_water_tank_id_idx_80f6e9ac',
        columns: ['water_tank_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_events',
        index: 'irrigation_events_irrigation_device_id_idx_128c9d8f',
        columns: ['irrigation_device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_recommendations',
        index: 'irrigation_recommendations_analysis_id_idx_069c6c63',
        columns: ['analysis_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_recommendations',
        index: 'irrigation_recommendations_approved_by_user_id_idx_d9adadeb',
        columns: ['approved_by_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_recommendations',
        index: 'irrigation_recommendations_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'irrigation_recommendations',
        index: 'irrigation_recommendations_irrigation_device_id_idx_128c9d8f',
        columns: ['irrigation_device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_alert_id_idx_331211af',
        columns: ['alert_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_user_id_is_read_idx_d34c4b82',
        columns: ['user_id', 'is_read'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sensor_readings',
        index: 'sensor_readings_sensor_id_idx_2c92121f',
        columns: ['sensor_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sensor_readings',
        index: 'sensor_readings_sensor_id_recorded_at_idx_18dcf488',
        columns: ['sensor_id', 'recorded_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sensors',
        index: 'sensors_device_id_field_id_idx_fae078a8',
        columns: ['device_id', 'field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sensors',
        index: 'sensors_device_id_idx_8f329912',
        columns: ['device_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sensors',
        index: 'sensors_field_id_idx_a58bbd5b',
        columns: ['field_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'water_tanks',
        index: 'water_tanks_farm_id_idx_434cdf2c',
        columns: ['farm_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ai_analyses',
        foreignKey: {
          name: 'ai_analyses_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'alerts',
        foreignKey: {
          name: 'alerts_farm_id_fkey',
          columns: ['farm_id'],
          references: { schema: 'public', table: 'farm', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'alerts',
        foreignKey: {
          name: 'alerts_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'alerts',
        foreignKey: {
          name: 'alerts_device_id_fkey',
          columns: ['device_id'],
          references: { schema: 'public', table: 'devices', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'alerts',
        foreignKey: {
          name: 'alerts_sensor_id_fkey',
          columns: ['sensor_id'],
          references: { schema: 'public', table: 'sensors', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'device_fields',
        foreignKey: {
          name: 'device_fields_device_id_fkey',
          columns: ['device_id'],
          references: { schema: 'public', table: 'devices', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'device_fields',
        foreignKey: {
          name: 'device_fields_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'disease_detections',
        foreignKey: {
          name: 'disease_detections_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'disease_detections',
        foreignKey: {
          name: 'disease_detections_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'farm',
        foreignKey: {
          name: 'farm_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'field',
        foreignKey: {
          name: 'field_farm_id_fkey',
          columns: ['farm_id'],
          references: { schema: 'public', table: 'farm', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'field',
        foreignKey: {
          name: 'field_crop_id_fkey',
          columns: ['crop_id'],
          references: { schema: 'public', table: 'crop', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_devices',
        foreignKey: {
          name: 'irrigation_devices_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_devices',
        foreignKey: {
          name: 'irrigation_devices_device_id_fkey',
          columns: ['device_id'],
          references: { schema: 'public', table: 'devices', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_devices',
        foreignKey: {
          name: 'irrigation_devices_water_tank_id_fkey',
          columns: ['water_tank_id'],
          references: { schema: 'public', table: 'water_tanks', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_events',
        foreignKey: {
          name: 'irrigation_events_irrigation_device_id_fkey',
          columns: ['irrigation_device_id'],
          references: { schema: 'public', table: 'irrigation_devices', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_recommendations',
        foreignKey: {
          name: 'irrigation_recommendations_field_id_fkey',
          columns: ['field_id'],
          references: { schema: 'public', table: 'field', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_recommendations',
        foreignKey: {
          name: 'irrigation_recommendations_irrigation_device_id_fkey',
          columns: ['irrigation_device_id'],
          references: { schema: 'public', table: 'irrigation_devices', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_recommendations',
        foreignKey: {
          name: 'irrigation_recommendations_analysis_id_fkey',
          columns: ['analysis_id'],
          references: { schema: 'public', table: 'ai_analyses', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'irrigation_recommendations',
        foreignKey: {
          name: 'irrigation_recommendations_approved_by_user_id_fkey',
          columns: ['approved_by_user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_alert_id_fkey',
          columns: ['alert_id'],
          references: { schema: 'public', table: 'alerts', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sensor_readings',
        foreignKey: {
          name: 'sensor_readings_sensor_id_fkey',
          columns: ['sensor_id'],
          references: { schema: 'public', table: 'sensors', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sensors',
        foreignKey: {
          name: 'sensors_device_id_field_id_fkey',
          columns: ['device_id', 'field_id'],
          references: {
            schema: 'public',
            table: 'device_fields',
            columns: ['device_id', 'field_id'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'water_tanks',
        foreignKey: {
          name: 'water_tanks_farm_id_fkey',
          columns: ['farm_id'],
          references: { schema: 'public', table: 'farm', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
