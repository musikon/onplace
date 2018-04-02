if (global.IS_BROWSER) {
  require('./SimpleTitle.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import {
  formatDate
} from '../../utils';

import ShareIcon from '../../components/ShareIcon/ShareIcon';

export default class SimpleTitle extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    simpleTitleObj: Type.object,
    needShowDate: Type.bool,
    needShowShares: Type.bool,
    lang: Type.string
  };
  
  static defaultProps = {
    needShowDate: true,
    needShowShares: true
  };
  
  constructor() {
    super();
  
    this.state = {
      showShareIcon: false
    };
  }
  
  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    this.setState({
      showShareIcon: true
    });
  }
  
  /**
   * Renders 'SimpleTitle' component
   */
  render() {
    const {
      simpleTitleObj = {},
      lang,
      needShowDate,
      needShowShares
    } = this.props;
    
    const {
      date,
      title,
      author
    } = simpleTitleObj;
    
    const {
      showShareIcon
    } = this.state;

    return (
      <div className="c-simple-title">
        {
          needShowDate &&
            <div className="simple-title-date">
              {formatDate(date, lang)}
            </div>
        }
        {
          title &&
            <h1 className="simple-title-title">
              {title}
            </h1>
        }
        {
          author &&
            <div className="simple-title-name">
              {author}
            </div>
        }
        {
          (showShareIcon && needShowShares) && <ShareIcon />
        }
      </div>
    );
  }
}
