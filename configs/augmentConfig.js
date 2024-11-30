import { SwordWeapon } from '../weapons/SwordWeapon.js';
import { Bow } from '../weapons/Bow.js';
import { Hammer } from '../weapons/Hammer.js';
import { Shotgun } from '../weapons/Shotgun';
import { AK } from '../weapons/AK';
import { Mace } from '../weapons/Mace';

export const AUGMENT_TYPES = {
  HEALTH: 'health',
  SPEED: 'speed',
  DEFENSE: 'defence',
  DAMAGE: 'damage',
  WEAPON: 'weapon',
};

export const AUGMENT_CONFIG = [
  {
    id: 'health_boost',
    type: AUGMENT_TYPES.HEALTH,
    name: 'Health Boost',
    description: 'Increase max health by 20%',
    rarity: 'common',
    apply: (player) => {
      player.stats.maxHealth *= 1.2;
      player.stats.currentHealth = player.stats.maxHealth;
    },
  },
  {
    id: 'speed_boost',
    type: AUGMENT_TYPES.SPEED,
    name: 'Speed Up',
    description: 'Increase movement speed by 15%',
    rarity: 'common',
    apply: (player) => {
      player.stats.speed *= 1.15;
    },
  },
  {
    id: 'defense_up',
    type: AUGMENT_TYPES.DEFENSE,
    name: 'Defense Up',
    description: 'Increase defense by 5',
    rarity: 'common',
    apply: (player) => {
      player.stats.defence += 5;
    },
  },
  {
    id: 'sword_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'Sword Master',
    description: 'Add a sword weapon',
    rarity: 'rare',
    apply: (player) => {
      player.weaponManager.addWeapon(SwordWeapon);
    },
  },
  {
    id: 'bow_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'Bow Master',
    description: 'Add a bow weapon',
    rarity: 'rare',
    apply: (player) => {
      player.weaponManager.addWeapon(Bow);
    },
  },
  {
    id: 'hammer_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'Hammer Master',
    description: 'Add a hammer weapon',
    rarity: 'rare',
    apply: (player) => {
      player.weaponManager.addWeapon(Hammer);
    },
  },
  {
    id: 'mace_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'Mace Master',
    description: 'Add a mace weapon',
    rarity: 'rare',
    apply: (player) => {
      player.weaponManager.addWeapon(Mace);
    },
  },
  {
    id: 'ak_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'AK Master',
    description: 'Add an AK weapon',
    rarity: 'epic',
    apply: (player) => {
      player.weaponManager.addWeapon(AK);
    },
  },
  {
    id: 'shotgun_master',
    type: AUGMENT_TYPES.WEAPON,
    name: 'Shotgun Master',
    description: 'Add a shotgun weapon',
    rarity: 'epic',
    apply: (player) => {
      player.weaponManager.addWeapon(Shotgun);
    },
  },
];
