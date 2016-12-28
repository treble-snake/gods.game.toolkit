import Config from './LootConfig';
import ChestModel from '../model/ChestModel';
import Option from '../model/ChanceOptionModel';
/**
 *
 * @param items - array of items
 * @returns {*}
 */
function chooseOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 *
 * @param options - array of callbacks with chances
 * @returns {*}
 */
function takeChance(options) {
  let roll = Math.random();
  let result = options[options.length - 1];
  let chance = 0;
  options = options.slice(0, -1);

  for (let i in options) {
    chance += options[i].chance;
    if (roll < chance)
      return options[i].callback();
  }

  return result.callback();
}

function isChange(chance) {
  return Math.random() < chance;
}

function getGold(value) {
  return `${value} золотых`;
}

function getItem(itemsList) {
  let itemsOptions = itemsList.map(item =>
    new Option(item.chance, () => item));
  var item = takeChance(itemsOptions);
  return composeItemName(item);
}

function composeItemName(item) {
  return `${item.name} (цена: ${item.value})`;
}

function generateItems(maxQty, maxValue, itemsList) {
  let itemsOptions = itemsList.map(item =>
    new Option(item.chance, () => item));

  let result = [];
  let rawItems = [];
  let items = {};
  let value = 0;
  let hasUnique = false;

  for (let i = 0; i < maxQty; i++) {
    let item;
    do {
      item = takeChance(itemsOptions);
    } while (hasUnique && item.unique);

    if(item.unique) {
      hasUnique = true;
    }

    rawItems.push(item);
    name = composeItemName(item);
    if (items.hasOwnProperty(name)) {
      items[name]++;
      continue;
    }

    items[name] = 1;
    value += item.value;
    if (value >= maxValue)
      break;
  }

  for (let name in items) {
    let entry = name;
    let qty = items[name];
    if (qty > 1)
      entry = `${qty} x ${entry}`;

    result.push(entry);
  }

  if (value < maxValue) {
    let gold = 10 * Math.round((maxValue - value) / 10);
    result.push(getGold(gold));
  }

  return {
    textItems: result,
    rawItems: rawItems
  };
}

function generateChest(chestConfig, itemsList) {
  var items = generateItems(chestConfig.capacity, chestConfig.value, itemsList);
  var chest = new ChestModel(chestConfig.name,
    chooseOne(Config.CHEST_LABELS), items.textItems);
  chest.rawItems = items.rawItems;
  if (isChange(chestConfig.mimicChance))
    chest.makeMimic();

  return chest;
}

function generateMobLoot(config, itemsList) {
  let item = takeChance([
    new Option(config.emptyChance, () => 'Нихрена'),
    new Option(config.itemChance, () => getItem(itemsList)),
    new Option(0, () => getGold(config.gold)),
  ]);
  return new ChestModel(config.name, "Кровь, кишки, распидарасило", [item])
}

export default {
  getChest: generateChest,
  getMobLoot: generateMobLoot
}