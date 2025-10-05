import * as migration_20251004_204708 from './20251004_204708';

export const migrations = [
  {
    up: migration_20251004_204708.up,
    down: migration_20251004_204708.down,
    name: '20251004_204708'
  },
];
