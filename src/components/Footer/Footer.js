if (global.IS_BROWSER) {
  require('./Footer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { Link } from 'react-router';

import _takeRight from 'lodash/takeRight';

const pathToLogoVersions = {
  ru: '/images/made_in_m_ru.svg',
  en: '/images/made_in_m_en.svg'
};

const socialItemsFooter = [
  { img: '/images/socials/facebook.svg', link: 'https://www.facebook.com/onplace', alt: 'Facebook' },
  { img: '/images/socials/instagram.svg', link: 'https://www.instagram.com/on_place/', alt: 'Instagram' },
  { img: '/images/socials/twitter.svg', link: 'https://twitter.com/on_place', alt: 'Twitter' },
  { img: '/images/socials/linked.svg', link: 'https://www.linkedin.com/company/onplace-inc', alt: 'LinkedIn' },
];

const payIcon = [
  { img: '/images/footer/visa.svg', alt: 'visa' },
  { img: '/images/footer/mastercard.png', alt: 'mastercard' },
  { img: '/images/footer/bitcoin.png', alt: 'bitcoin' }
];

const footerList = [
  { url: { ru: '/ru/pages/13', en: '/en/pages/12' }, text: { ru: 'Как это работает', en: 'How it works' } },
  { url: { ru: '/ru/pages/11', en: '/en/pages/10' }, text: { ru: 'Пользовательское соглашение', en: 'Terms of use' } },
  { url: { ru: '/ru/pages/14', en: '/en/pages/15' }, text: { ru: 'Вопросы и ответы', en: 'FAQ' } },
  {
    url: { ru: '/ru/demo', en: '/en/demo' },
    text: { ru: 'Пример личного кабинета инвестора', en: 'Example of investor dashboard' }
  },
];

export default class Footer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    isSubpage: Type.bool,
    isMobile: Type.bool,
    isPlug: Type.bool,
    lang: Type.string
  };

  constructor(props) {
    super(props);

    this.state = {
      license: false
    };
  }
  /**
   * Renders 'Footer' component
   */
  render() {
    const {
      //isSubpage,
      //isMobile,
      isPlug,
      lang
    } = this.props;

    const { license } = this.state;

    return (
      <div className={`c-footer ${ isPlug ? 'is-plug' : '' }`}>
        <div className="footer-content">
          <div className="footer-left-side">
            {
              (isPlug ? _takeRight(footerList, 1) : footerList).map((item, index) => {
                if (item.url[lang]) {
                  return (
                    <Link
                      to={item.url[lang]}
                      key={index}
                      className="footer-list-item"
                    >
                      {item.text[lang]}
                    </Link>
                  );
                } else {
                  return <a href="/" key={index} className="footer-list-item">{item.text[lang]}</a>;
                }
              })
            }
            {
              license &&
                <div className="button-error">
                  Сообщить об ошибке
                </div>
            }
          </div>
          {
            license &&
              <div className="fotter-middle-side">
                <img className="middle-image" alt="/" src="/images/footer/coat.svg" />
                <div className="middle-title">ЛИЦЕНЗИРОВАНО ЦЕНТРОБАНКОМ</div>
                <div className="middle-text">
                  Лицензия Банка России от 11.09.2015: СЛ №0621, СИ №0621, ОС №0621-03,
                  ОС №0621-04, ОС №0621-05, ПС №0621
                </div>
              </div>
          }
          <div className="footer-right-side">
            <div className="pay-icon-container">
              {
                payIcon.map((item, index) => (
                  <span className="pay-icon" key={index}>
                    <img src={item.img} alt={item.alt} />
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copywriting">
            &copy; OnPlace 2016
          </div>
          <div className={`socials-icons-container ${ license ? '' : 'socials-icons-absolute' }`}>
            {
              socialItemsFooter.map((item, index) => (
                <a key={index} target="_blank" href={item.link} className="social-icon">
                  <img src={item.img} alt={item.alt} />
                </a>
              ))
            }
          </div>
          <a
            className="r-m-logo"
            href="http://factory.mn"
            target="_blank"
          >
            <img
              src={pathToLogoVersions[lang]}
              alt="Factory"
            />
          </a>
        </div>
      </div>
    );
  }
}
