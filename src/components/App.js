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
      lootConfig: null
    }
  }

  componentWillMount() {
    fetch('static/config.json').then(response => response.json())
      .then(config => {
        this.setState({...this.state, lootConfig: config.loot})
      }).catch(err => {
      console.error("Config load failed", err);
    })

  }

  setChests(value) {
    this.setState({...this.state, chests: value});
  }

  clear() {
    this.setChests([]);
  };

  generate(chestsQty, mobsQty) {
    let chests = [];
    // for (let i = 0; i < qty; i++) {
    //   chests.push(Helper.getChest());
    // }
    for(let id in mobsQty) {
      let config = this.state.lootConfig.mobs.list[id];
      if(!config)
        continue;

      for(let i = 0; i < mobsQty[id]; i++) {
        chests.push(Helper.getMobLoot(config));
      }
    }
    this.setChests(chests);
  };

  update(index) {
    if (index >= this.state.chests.length)
      return;

    let chests = this.state.chests.slice();
    chests[index].update();

    this.setChests(chests);
  }

  open(index) {
    if (index >= this.state.chests.length)
      return;

    let chests = this.state.chests.slice();
    chests[index].open();

    this.setChests(chests);
  }

  render() {
    let chestsConfig = [];
    let mobsConfig = [];

    if(this.state.lootConfig) {
      chestsConfig = this.state.lootConfig.chests.list;
      mobsConfig = this.state.lootConfig.mobs.list;
    }

    return (
      <div className="main container">
        <InputBar clear={this.clear.bind(this)}
                  generate={this.generate.bind(this)}
                  chestConfig={chestsConfig}
                  mobsConfig={mobsConfig}
                  />
        <OutputBar chestList={this.state.chests}
                   updateChest={this.update.bind(this)}
                   openChest={this.open.bind(this)}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
