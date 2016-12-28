import Config from './LootConfig';
import ChestModel from '../model/ChestModel';

const ITEM_GENERATORS = {
  [Config.LOOT_TYPES.LOCKPICK]: () => 'Отмычка',
  [Config.LOOT_TYPES.EXPENDABLE]: () => getExpendable(),
  [Config.LOOT_TYPES.WEAPON]: () => getWeapon(),
  [Config.LOOT_TYPES.ARMOR]: () => getArmor()
};

function chooseOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function takeChance(options) {
  let roll = Math.random();
  let result = options[options.length - 1];
  let chance = 0;
  options = options.slice(0, -1);

  for(let i in options) {
    chance += options[i].chance;
    if(roll < chance)
      return options[i].callback();
  }

  return result.callback();
}

function getExpendable() {
  return chooseOne(Config.EXPENDABLES);
}

function getWeapon() {
  if (Math.ceil(Math.random() * 100) <= 90) {
    return [chooseOne(Config.WEAPON_MATERIAL),
      chooseOne(Config.WEAPON_TYPE).toLowerCase()].join(' ')
  } else {
    return chooseOne(Config.ARTIFACT_WEAPON);
  }
}

function getArmor() {
  return chooseOne(Config.ARMOR_LIST);

}

function getItem() {
  let type = chooseOne(Config.TYPES);
  return ITEM_GENERATORS[type]();
}

function generateItems() {
  let qty = chooseOne(Config.QTYS);
  let items = [];
  for (let i = 0; i < qty; i++) {
    items.push(getItem());
  }
  return items;
}

function generateGold() {
  var gold = Math.ceil(Math.random() * 200);
  var round = Math.round(gold / 10) * 10 + 10;
  return `${round} золотых`;
}

function generateChest() {
  var items = generateItems();
  items.push(generateGold());
  return new ChestModel(chooseOne(Config.CHEST_LABELS), items);
}



function generateMobLoot(config) {
  let item = takeChance([
    {
      callback: () => 'Нихрена',
      chance: config.emptyChance
    },
    {
      callback: getItem,
      chance: config.itemChance
    },
    {
      callback: () => `${config.gold} золота`
    }
  ]);
  return new ChestModel(config.name, "Лежит и не шевелится", [item])
}

export default {
  getChest: generateChest,
  getItems: generateItems,
  getMobLoot: generateMobLoot
}