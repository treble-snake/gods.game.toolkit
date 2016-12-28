class ChestModel {
  constructor(name, label, items) {
    this.name = name;
    this.opened = false;
    this.isMimic = false;
    this.isDead = false;
    this.label = label;
    this.items = items;
    this.rawItems = [];
  }

  open() {
    this.opened = true;
  }

  kill() {
    this.isDead = true;
  }

  makeMimic() {
    this.isMimic = true;
  }
}

export default ChestModel;