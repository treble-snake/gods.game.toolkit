import Helper from '../helpers/ChestGenerator';

class ChestModel {
  constructor(name, label, items) {
    this.name = name;
    this.opened = false;
    this.isMimic = false;
    this.label = label;
    this.items = items;
  }

  update() {
    this.items = Helper.getItems();
  }

  open() {
    this.opened = true;
  }

  makeMimic() {
    this.isMimic = true;
  }
}

ChestModel.create = () => {
  return Helper.getChest();
};

export default ChestModel;