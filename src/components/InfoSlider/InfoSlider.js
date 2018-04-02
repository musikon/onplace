if (global.IS_BROWSER) {
  require('./InfoSlider.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class InfoSlider extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    team: Type.array,
    lang: Type.string,
    data: Type.object
  };

  render() {
    const data = this.props.data;

    return (
      <a
        href={data.url}
        target="_blank"
        className="c-info-slider"
      >
        <div className="info-slider-text">{data.title}</div>
        <div className="info-logo">
          {
            data.image && <img alt="" src={data.image} />
          }
        </div>
      </a>
    );
  }
}
