import React, {PropTypes} from 'react';
import Chest from './Chest';

class OutputBar extends React.Component {

  render() {
    let chestElements = this.props.chestList
      .map((item, i) => <Chest key={i} index={i} chest={item}
                               update={() => this.props.updateChest(i)}
                               open={() => this.props.openChest(i)} />);

    return (
      <div className="output-bar">
        <div className="panel panel-success">
          <div className="panel-heading">Результаты</div>
          <div className="panel-body">
            <div className="row">
              {chestElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OutputBar.displayName = 'OutputBar';
OutputBar.propTypes = {
  chestList: PropTypes.array.isRequired,
  openChest: PropTypes.func.isRequired,
  updateChest: PropTypes.func.isRequired
};
OutputBar.defaultProps = {};

export default OutputBar;
