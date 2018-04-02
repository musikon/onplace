if (global.IS_BROWSER) {
  require('./NewsContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import {
  NewsCard
} from '../../components';

export default class NewsContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    chunkedNews: Type.array,
    lang: Type.string
  };

  /**
   * Initial props value
   */
  static defaultProps = {
    vertical: false,
    withImage: false
  }

  /**
   * Renders 'NewsContainer' component
   */
  render() {
    const {
      chunkedNews,
      lang
    } = this.props;

    /* eslint-disable */
    return (
      <div className="c-news-container">
        {
          chunkedNews.map((newsChank, newsChankIndex) => (
            <div
              key={newsChankIndex}
              className={`news-container__item-container ${ `news-item-container_${ ++newsChankIndex }` }`}
            >
              {
                newsChank.map((newsItem, index) => (
                  <NewsCard
                    key={index}
                    data={newsItem}
                    withImage={newsItem.withImage}
                    vertical={newsItem.vertical}
                    lang={lang}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}
