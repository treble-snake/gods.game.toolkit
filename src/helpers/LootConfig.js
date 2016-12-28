const LOOT_TYPES = {
  LOCKPICK: 'LOCKPICK',
  EXPENDABLE: 'EXPENDABLE',
  WEAPON: 'WEAPON',
  ARMOR: 'ARMOR'
};

const QTYS = [1, 2, 3]; // how many items can I get

const TYPES = [LOOT_TYPES.LOCKPICK,
  LOOT_TYPES.LOCKPICK,
  LOOT_TYPES.EXPENDABLE,
  LOOT_TYPES.EXPENDABLE,
  LOOT_TYPES.WEAPON,
  LOOT_TYPES.ARMOR]; // what can I get

const EXPENDABLES = ['Зелье здоровья',
  'Зелье маны',
  'Взрывающееся зелье',
  'Парализующее зелье',
  'Камень душ',
  'Скелетный ключ'];

const WEAPON_MATERIAL = [
  'Железн.',
  'Стальн.',
  'Серебрян.',
  'Эльфийск.'
];

const WEAPON_TYPE = [
  'Одноручный меч',
  'Одноручный топор',
  'Одноручная булава',
  'Двуручный меч',
  'Двуручный топор',
  'Двуручный молот',
  'Кинжал',
  'Лук',
  'Копьё',
  'Посох'
];

const ARTIFACT_WEAPON = [
  'Камень душ',
  'Ледяной топор скальда',
  'Святой клинок',
  'Лук-костегрыз',
  'Булава Забвения',
  'Копьё горькой милости'
];

const ARMOR_LIST = [
  'Кольчуга',
  'Кольчуга',
  'Кольчуга',
  'Кольчуга',
  'Кожаный доспех',
  'Кожаный доспех',
  'Кожаный доспех',
  'Кожаный доспех',
  'Латы',
  'Латы',
  'Латы',
  'Меховой доспех',
  'Меховой доспех',
  'Меховой доспех',
  'Костяной доспех',
  'Костяной доспех',
  'Хитиновый доспех',
  'Хитиновый доспех',
  'Адамантиновый доспех',
  'Эльфийский доспех',
  'Щит дерево',
  'Щит дерево',
  'Щит дерево',
  'Щит железо',
  'Щит железо',
  'Щит шипы',
  'Льняная мантия',
  'Льняная мантия',
  'Шерстяная мантия',
  'Шерстяная мантия',
  'Мантия из шелка',
  'Мантия колдуна',
  'Драконий доспех',
  'Доспех апостола',
  'Мантия архимага',
  'Разрушитель заклинаний',
];

const CHEST_LABELS = [
  'Это сундук. Впрочем, ничего нового.',
  'Здесь могла бы быть ваша реклама',
  'О божечкеи, да ведь в этом сундуке!..',
  'Кажется, там кто-то сдох...',
  'Открой меня полностью',
  'Сундук-хуюндук',
  'Давайте посмотрим, что же там...',
  'Ржавый сундук',
  'Ветхий деревянный сундук',
  'Крепкий дубовый сундук',
  'Металлический сундук',
  'Сундук из кожи с жопы дракона',
  'Сундук из жопы дракона',
  'Выбери меня, выбери меня!',
  'Только бы не кроницирукль...',
  'На сундуке написано: "А мастер - гомосек ^_^". Придумают же.'
];

export default {
  LOOT_TYPES: LOOT_TYPES,
  QTYS: QTYS,
  TYPES: TYPES,
  EXPENDABLES: EXPENDABLES,
  WEAPON_MATERIAL: WEAPON_MATERIAL,
  WEAPON_TYPE: WEAPON_TYPE,
  ARTIFACT_WEAPON: ARTIFACT_WEAPON,
  ARMOR_LIST: ARMOR_LIST,
  CHEST_LABELS: CHEST_LABELS
}
