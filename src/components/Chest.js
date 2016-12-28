import React, {PropTypes} from 'react';

class Chest extends React.Component {

  renderItems(items) {
    let result = items.map((item, i) => <li key={i}>{item}</li>);
    return <ul>{result}</ul>;
  }

  renderLabel(text) {
    return <div className="chest-label">{text}</div>
  }

  renderMimic() {
    return this.renderLabel("Вас укусили за жопу!")
  }

  render() {
    /**
     * @type {ChestModel}
     */
    let chest = this.props.chest;
    let chestContent = chest.opened ?
      (chest.isMimic && !chest.isDead ?
        this.renderMimic() : this.renderItems(chest.items))
      : this.renderLabel(chest.label);

    let control = null;
    if (!chest.opened) {
      control =
        <button className="btn btn-primary open" onClick={this.props.open}>
          <span className="glyphicon glyphicon-eye-open"/></button>;
    } else if (chest.isMimic && !chest.isDead) {
      control =
        <button className="btn btn-danger reload" onClick={this.props.kill}>
          <span className="glyphicon glyphicon-screenshot"/></button>;
    }

    return (
      <div className="chest col-md-4 col-sm-6 col-xs-12">
        <div className="panel panel-info">
          <div className="panel-heading">
            {control}
            <span
              className="chest-name">{chest.name} {this.props.index + 1}</span>
          </div>
          <div className="panel-body">
            {chestContent}
          </div>
        </div>
      </div>
    );
  }
}

Chest.displayName = 'Chest';
Chest.propTypes = {
  chest: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  open: PropTypes.func.isRequired,
  kill: PropTypes.func.isRequired
};
Chest.defaultProps = {};

export default Chest;
