if (global.IS_BROWSER) {
  require('./ProjectTabs.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

const tabs = [
  {
    text: 'Описание',
    number: null
  },
  {
    text: 'Комметарии',
    number: 5
  },
  {
    text: 'Документы',
    number: 10
  }
];


export default class ProjectTabs extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    index: Type.number,
    switchTab: Type.func
  };

  _clickTab(index) {
    this.props.switchTab(index);
  }
  /**
   * Renders 'FixedFooter' component
   */
  render() {
    const indexTab = this.props.index;
    return (
      <div className="root-about-tabs">
        {tabs.map((item, index) => (
          <div
            className={`tab ${ indexTab === index ? 'tab-active ' : '' }`}
            key={index}
          >
            <span
              className="tab-name"
              onClick={this._clickTab.bind(this, index)}
            >
              {item.text}
            </span>
            {item.number && <span className="tab-quantity">{item.number}</span>}
            <div className="tab-border"></div>
          </div>
        ))}
      </div>
    );
  }
}
