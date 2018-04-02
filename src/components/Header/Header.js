if (global.IS_BROWSER) {
  require('./Header.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { Link } from 'react-router';

import {
  colorFunc,
  googleAnalytics
} from '../../utils';

const hexToRgb = colorFunc.hexToRgb;
const isWhiteTheme = colorFunc.isWhiteTheme;

export default class Header extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    activeIndex: Type.number,
    whiteColorTheme: Type.string,
    isPlug: Type.bool,
    menuItems: Type.array,
    middleColor: Type.string,
    onMenuItemClick: Type.func,
    onLangSwitch: Type.func,
    isMain: Type.bool,
    lang: Type.string,
    isDomReady: Type.bool,
    setDomReady: Type.func
  };

  constructor() {
    super();

    this.handlePageScroll = ::this.handlePageScroll;

    this.state = {
      showShadow: false
    };
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    document.addEventListener('scroll', this.handlePageScroll);
    this.handlePageScroll();
    const middleColor = (this.props.middleColor && this.props.middleColor.search(/#/) === -1 ?
        `#${ this.props.middleColor } ` : this.props.middleColor) || 'white';
    this.setState({ middleColor });

    document.addEventListener('readystatechange', () => {
      if ((document.readyState === 'complete') && this.props.setDomReady) {
        this.props.setDomReady();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handlePageScroll);
  }

  /*
   * set color theme for header
   */
  setColorTheme(middleColor) {
    const rgbMiddleColor = hexToRgb(middleColor);
    const hexArray = rgbMiddleColor.substring(5, rgbMiddleColor.length - 3).split(',');
    return isWhiteTheme(hexArray);
  }

  menuItemClickHandler(item, onMenuItemClick) {
    onMenuItemClick ? onMenuItemClick(item.type) : () => {};

    switch (item.type) {
      case 'projectsExamples':
        googleAnalytics({
          category: 'Menu',
          action: 'Project types',
        });
        break;
      case 'news':
        googleAnalytics({
          category: 'Menu',
          action: 'News',
        });
        break;
      case 'projectsTypes':
        googleAnalytics({
          category: 'Menu',
          action: 'Projects',
        });
        break;
      case 'howItWorks':
        googleAnalytics({
          category: 'Menu',
          action: 'How it works',
        });
        break;
      case 'advantages':
        googleAnalytics({
          category: 'Menu',
          action: 'Advantages',
        });
        break;
      case 'about':
        googleAnalytics({
          category: 'Menu',
          action: 'How it works',
        });
        break;
      case 'team':
        googleAnalytics({
          category: 'Menu',
          action: 'Team',
        });
        break;
      default:
    }
  }

  langSwitchHandler(onLangSwitch, lang) {
    onLangSwitch ? onLangSwitch.call(null, lang) : () => {};

    if (lang === 'ru') {
      googleAnalytics({
        category: 'Menu',
        action: 'Russian On',
      });
    } else {
      googleAnalytics({
        category: 'Menu',
        action: 'English On',
      });
    }
  }

  handlePageScroll() {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScrollTop && !this.state.showShadow) {
      this.setState({
        showShadow: true
      });
    }

    if (!currentScrollTop && this.state.showShadow) {
      this.setState({
        showShadow: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDomReady !== this.props.isDomReady) {
      if (nextProps.isDomReady) {
        document.querySelector('html').style.background = this.state.middleColor;
      }
    }
  }

  /**
   * Renders 'Header' component
   */
  render() {
    const {
      menuItems,
      isPlug,
      onMenuItemClick,
      onLangSwitch,
      isMain,
      lang
    } = this.props;

    const { showShadow, middleColor } = this.state;

    const whiteColorTheme = this.setColorTheme.call(this, middleColor);

    return (
      <div
        className={`c-header-root ${ showShadow ? 'with-shadow' : '' }
                  ${ isPlug ? 'is-plug' : '' } ${ whiteColorTheme ? 'header_white_theme' : 'header_blue_theme' }`}
        style={{ backgroundColor: middleColor }}
      >
        <div className="header-inner">
          <div className="header-left-column">
            <Link to={`/${ lang }`}>
              <img
                className="header-logo"
                src={whiteColorTheme ? '/images/on-place-logo-white.svg' : '/images/on-place-logo.svg'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="header-center-column">
            <ul className="header-navigation" >
              {
                menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`header-navigation-item ${ isMain && item.active && 'active' } `}
                  >
                    <div
                      className="header-navigation-item-text"
                      onClick={this.menuItemClickHandler.bind(this, item, onMenuItemClick)}
                    >
                      {item.name}
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="header-right-column">
            <Link to="/ru">
              <span
                className={`header-site-lang-icon ${ lang === 'ru' ? 'active' : '' }`}
                onClick={this.langSwitchHandler.bind(this, onLangSwitch, 'ru')}
              >
                <img
                  src="/images/ru-flag.svg"
                  alt="русский"
                />
              </span>
            </Link>
            <Link to="/en">
              <span
                className={`header-site-lang-icon ${ lang === 'en' ? 'active' : '' }`}
                onClick={this.langSwitchHandler.bind(this, onLangSwitch, 'en')}
              >
                <img
                  src="/images/us-flag.png"
                  alt="english"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
