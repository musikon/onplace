if (global.IS_BROWSER) {
  require('./AdminNavigation.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { Link } from 'react-router';

const listNavigation = [
  { text: { ru: 'Главное', en: 'Main' }, img: '/images/admin/main.svg' },
  { text: { ru: 'Счет', en: 'Account' }, img: '/images/admin/purse.svg' },
  { text: { ru: 'Портфель', en: 'Portfolio' }, img: '/images/admin/bag.svg' },
  { text: { ru: 'Документы', en: 'Documents' }, img: '/images/admin/docs.svg' },
];
const admin = {
  name: 'dm.provotorov'
};

export default class AdminNavigation extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string,
    showDialog: Type.func
  };

  constructor() {
    super();
    this.state = {
      indexNavigation: 0,
    };
  }

  _clickNavigation(index) {
    this.setState({ indexNavigation: index });
  }

  /**
   * Renders 'AddNewsButton' component
   */
  render() {
    const { indexNavigation } = this.state;
    const { lang, showDialog } = this.props;

    return (
      <div className="admin-navigation-root">
        <Link to="/">
          <img className="logo" alt="" src="/images/logo-white.svg" />
        </Link>
        <div className="admin-avatar">
          <img alt="" src="/images/avatar.jpg" />
        </div>
        <div className="admin-name">{admin.name}</div>
        {listNavigation.map((item, index) => (
          <div
            className={`navigation ${ indexNavigation === index ? 'navigation-active ' : '' }`}
            key={index}
            onClick={showDialog}
          >
            <img className="navigation-img" alt="" src={item.img} />
            <span className="navigation-text">{item.text[lang]}</span>
          </div>
        ))}
      </div>
    );
  }
}
