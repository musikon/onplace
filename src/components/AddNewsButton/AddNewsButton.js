if (global.IS_BROWSER) {
  require('./AddNewsButton.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class AddNewsButton extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    fetchMoreNews: Type.func
  };
  /**
   * Renders 'AddNewsButton' component
   */
  render() {
    const {
      fetchMoreNews
    } = this.props;

    return (
      <button
        className="c-add-news-button"
        onClick={fetchMoreNews}
      >
        Еще новости
      </button>
    );
  }
}
