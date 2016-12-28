import React, {PropTypes} from 'react';

class InputBar extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      chests: {},
      mobs: {}
    }
  }

  changeQty(category, id, value) {
    let items = {...this.state[category]};
    let qty = items[id] || 0;
    qty += value;
    if(qty < 0)
      return;

    items[id] = qty;
    let newState = {...this.state};
    newState[category] = items;
    this.setState(newState)

  }

  renderBlock(title, items, category) {
    let controls = items.map((item, i) => {
      let qty = this.state[category][i] || 0;
      let minusBtnClasses = "btn btn-xs btn-default";
      if(qty === 0)
        minusBtnClasses += " disabled";

      return <div className="control" key={i}>
        <button className={minusBtnClasses}
        onClick={() => this.changeQty(category, i, -1)}>
          <i className="glyphicon glyphicon-minus" />
        </button>
        <span className="name">{item.name}: {qty}</span>
        <button className="btn btn-xs btn-default"
                onClick={() => this.changeQty(category, i, 1)}>
          <i className="glyphicon glyphicon-plus" />
        </button>
      </div>
    });

    return <div className="controls-group">
      <div className="title">{title}</div>
      <div className="controls-container">
        {controls}
      </div>
    </div>;
  }

  reset() {
    this.setState({...this.state, chests: {}, mobs: {}})
  }

  generate() {
    this.props.generate(this.state.chests, this.state.mobs);
  }

  render() {
    return (
      <div className="input-bar">

        <div className="panel panel-primary">
          <div className="panel-heading">Панель управления</div>
          <div className="panel-body">
            {this.renderBlock('Сундуки', this.props.chestConfig, 'chests')}
            {this.renderBlock('Монстры', this.props.mobsConfig, 'mobs')}
          </div>
          <div className="panel-footer">
            <button className="btn btn-primary"
                    onClick={this.generate.bind(this)}>Go!</button>
            <button className="btn btn-default" onClick={this.reset.bind(this)}>
              Reset numbers
            </button>
            <button className="btn btn-default" onClick={this.props.clear}>
              Clear chests
            </button>
          </div>
        </div>

      </div>
    );
  }
}

InputBar.displayName = 'InputBar';
InputBar.propTypes = {
  generate: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  chestConfig: PropTypes.array.isRequired,
  mobsConfig: PropTypes.array.isRequired
};
InputBar.defaultProps = {};

export default InputBar;
