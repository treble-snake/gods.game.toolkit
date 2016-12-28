import React from 'react';
import './app.less';
import 'bootstrap/dist/css/bootstrap.css';

import InputBar from './InputBar';
import OutputBar from './OutputBar';
import Helper from '../helpers/ChestGenerator';

import 'whatwg-fetch';

class AppComponent extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      chests: [],
      /**
       * @type object
       * @property {object} items
       * @property {object} chests
       * @property {object} mobs
       */
      lootConfig: null,
      availableItems: [],
      availableUniqueItems: {}
    }
  }

  componentWillMount() {
    fetch('static/config.json').then(response => response.json())
      .then(config => {
        let lootConfig = config.loot;
        let availableUniqueItems = {};

        let itemsChanceSum = lootConfig.items.list
          .reduce((prev, current) => {
            return prev + current.chance;
          }, 0);

        lootConfig.items.list.forEach(item => {
          item.chance = item.chance / itemsChanceSum;
          if (item.unique)
            availableUniqueItems[item.name] = true;
        });

        this.setState({
          ...this.state, lootConfig: lootConfig,
          availableItems: lootConfig.items.list,
          availableUniqueItems: availableUniqueItems
        })
      }).catch(err => {
      console.error("Config load failed", err);
    })

  }

  setChests(value, callback) {
    this.setState({...this.state, chests: value}, callback);
  }

  clear() {
    this.setChests([]);
  };

  generate(chestsQty, mobsQty) {
    let chests = [];
    let {lootConfig, availableItems} = this.state;
    availableItems = [...availableItems];

    function modifyAvailable(lootItems, currentAvailable) {
      let uniques = lootItems.filter(loot => loot.unique).map(loot => loot.name);
      return currentAvailable.filter(item => !uniques.includes(item.name));
    }

    for (let id in chestsQty) {
      let config = lootConfig.chests.list[id];
      if (!config)
        continue;

      if (!config.mimicChance)
        config.mimicChance = lootConfig.chests.baseMimicChance;

      for (let i = 0; i < chestsQty[id]; i++) {
        var chest = Helper.getChest(config, availableItems);
        chests.push(chest);
        availableItems = modifyAvailable(chest.rawItems, availableItems);
      }
    }

    for (let id in mobsQty) {
      let config = lootConfig.mobs.list[id];
      if (!config)
        continue;

      for (let i = 0; i < mobsQty[id]; i++) {
        chests.push(Helper.getMobLoot(config, availableItems));
      }
    }
    this.setChests(chests);
  };

  checkUniques(items) {
    items.filter(loot => loot.unique)
      .forEach(loot => this.setUniqueUsage(loot.name, false));
  }

  open(index) {
    if (index >= this.state.chests.length)
      return;

    let chests = this.state.chests.slice();
    let chest = chests[index];
    chest.open();

    this.setChests(chests, () => {
      if(!chest.isMimic) {
        this.checkUniques(chest.rawItems);
      }
    });
  }

  kill(index) {
    if (index >= this.state.chests.length)
      return;

    let chests = this.state.chests.slice();
    var chest = chests[index];
    chest.kill();


    this.setChests(chests, () => this.checkUniques(chest.rawItems));
  }

  toggleUnique(name) {
    this.setUniqueUsage(name, !this.state.availableUniqueItems[name])
  }

  setUniqueUsage(name, value) {
    let items = {...this.state.availableUniqueItems};
    if (!items.hasOwnProperty(name)) {
      return;
    }
    items[name] = value;
    let availableItems = [];

    if (value) {
      let hasOne =
        this.state.availableItems.find(item => item.name === name) !== undefined;
      if (!hasOne) {
        availableItems = [...this.state.availableItems];
        let item = this.state.lootConfig.items.list.find(item => item.name === name);
        if (item) {
          availableItems.push(item);
        }
      }
    }
    else {
      availableItems = this.state.availableItems
        .filter(item => item.name !== name);
    }

    this.setState({
      ...this.state,
      availableItems: availableItems,
      availableUniqueItems: items
    });
  }

  render() {
    let chestsConfig = [];
    let mobsConfig = [];

    if (this.state.lootConfig) {
      chestsConfig = this.state.lootConfig.chests.list;
      mobsConfig = this.state.lootConfig.mobs.list;
    }

    return (
      <div className="main container">
        <InputBar clear={this.clear.bind(this)}
                  generate={this.generate.bind(this)}
                  chestConfig={chestsConfig}
                  mobsConfig={mobsConfig}
                  availableUniqueItems={this.state.availableUniqueItems}
                  toggleUnique={this.toggleUnique.bind(this)}
        />
        <OutputBar chestList={this.state.chests}
                   openChest={this.open.bind(this)}
                   killChest={this.kill.bind(this)}
        />
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
