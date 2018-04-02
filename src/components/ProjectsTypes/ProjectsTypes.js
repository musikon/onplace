if (global.IS_BROWSER) {
  require('./ProjectsTypes.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { formatNumberWithSpaces } from '../../utils';

/* eslint-disable max-len */
const typesVersions = {};

typesVersions.ru = [
  {
    title: 'СТАРТАПЫ',
    img: '/images/cafe.svg',
    description: 'Стартапам требуются небольшие инвестиции на первое время, для регистрации компании и интеллектуальной собственности. Риск большой, возможная прибыль — тоже.',
    min: 1000,
    max: 100000,
    currency: ';',
    currencySmall: 'Р'
  },
  {
    title: 'МАЛЫЙ БИЗНЕС',
    img: '/images/factory.svg',
    description: 'Это небольшие проекты, проверенные аудиторами On Place. Они ищут оборотные средства или планируют расширяться. Риск небольшой. Отличная возможность попробовать себя в роли инвестора.',
    min: 10000,
    max: 100000,
    currency: ';',
    currencySmall: 'Р'
  },
  {
    title: 'БОЛЬШИЕ ПРОЕКТЫ',
    img: '/images/garage.svg',
    description: 'Вложения в крупный бизнес для опытных инвесторов. Сделки страхуются, залоговое имущество хранится на балансе администратора.',
    min: 300000,
    max: 50000000,
    currency: ';',
    currencySmall: 'Р'
  }
];

typesVersions.en = [
  {
    title: 'STANDARD PROJECT',
    img: '/images/cafe.svg',
    description: 'OnPlace is the guarantee for some types of loan rating of reliability «AAA». There is a possibility of investment insurance.',
    min: 10000,
    max: 100000,
    currency: ';',
    currencySmall: 'Р'
  },
  {
    title: 'MAJOR INVESTMENT PROJECT',
    img: '/images/factory.svg',
    description: 'Conditions of participation in the project is determined individually for each kind, the interaction with such projects is carried out with an appointed project Manager.',
    min: 300000,
    max: 50000000,
    currency: ';',
    currencySmall: 'Р'
  },
  {
    title: 'STARTUP',
    img: '/images/garage.svg',
    description: 'Projects with high risk and high profit potential. Return on investment is not guaranteed.',
    min: 1000,
    max: 100000,
    currency: ';',
    currencySmall: 'Р'
  }
];

const fromVersions = {
  ru: 'Проекты привлекают от ',
  en: 'from '
};

const investFromVersions = {
  ru: 'Инвесторы вкладывают от ',
  en: 'investment from '
};

const titleVersions = {
  ru: 'Типы проектов',
  en: 'Project types'
};

const descriptionVersions = {
  ru: 'От типа проекта зависит объем вложений, риски и потенциал инвестирования.',
  en: `Project type determines risks, investment prospects, minimum investment amounts and total amount of
  investments requires.`
};

/* eslint-enable max-len */

export default class ProjectsTypes extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  /**
   * Renders 'ProjectsTypes' component
   */
  render() {
    const { lang } = this.props;
    const types = typesVersions[lang];

    return (
      <div className={`c-projects-types-root ${ lang }`}>
        <h2 className="g-main-page-title">
          {titleVersions[lang]}
        </h2>
        <div className="descriptions">
          {descriptionVersions[lang]}
        </div>
        <div className="types-list-projects">
          {
            types.map((item, index) => (
              <div className="type" key={index}>
                <div className="img-container">
                  <img alt="/" src={item.img} />
                </div>
                <div className="title">{item.title}</div>
                <div className="type-text">{item.description}</div>
                <div className={`large-text ${ lang === 'en' ? 'large-text-en' : '' }`}>
                  {fromVersions[lang]}
                  {formatNumberWithSpaces(item.max)}
                  &nbsp;
                  <span className="currency">{item.currency}</span>
                </div>
                <div className="small-text">
                  {investFromVersions[lang]}
                  {formatNumberWithSpaces(item.min)}
                  &nbsp;
                  {item.currencySmall}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
