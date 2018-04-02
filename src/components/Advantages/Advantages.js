if (global.IS_BROWSER) {
  require('./Advantages.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

/* eslint-disable max-len */
const advantagesVersions = {
  ru: [
    {
      title: 'Надежность',
      description: 'On Place проводит аудит всех проектов. На сайте нет мошенников и безнадежных компаний.',
      imageUrl: '/images/advantage-bank.svg',
      type: 'bank'
    },
    {
      title: 'Низкий порог входа',
      description: 'Вкладывайте от 10 000 <span class="g-currency">;</span> (в стартапы — от 1 000 <span class="g-currency">;</span>).',
      imageUrl: '/images/advantage-low.svg',
      type: 'low'
    },
    {
      title: 'Несколько валют',
      description: 'Инвестируйте не только в рублях, долларах, евро, но также в криптовалюте.',
      imageUrl: '/images/advantage-numbers.svg',
      type: 'numbers'
    },
    {
      title: 'Оценка риска',
      description: 'Оцениваем надежность проектов по методам международных рейтинговых агентств.',
      imageUrl: '/images/advantage-rating.svg',
      type: 'rating'
    },
    {
      title: 'Опытная команда',
      description: 'Основатели On Place — специалисты в аудите и оценке компаний, инвесторы.',
      imageUrl: '/images/advantage-libra.svg',
      type: 'libra'
    },
    {
      title: 'Международное участие',
      description: 'On Place привлекает инвесторов из США, Европы и Китая.',
      imageUrl: '/images/advantage-flags.svg',
      type: 'flags'
    }
  ],
  en: [
    {
      title: 'High reliability',
      description: 'Responsibility for the implementation of activities',
      imageUrl: '/images/advantage-bank.svg',
      type: 'bank'
    },
    {
      title: 'Low entry threshold',
      description: 'Possibility to invest&nbsp;from 1000 RUB',
      imageUrl: '/images/advantage-low.svg',
      type: 'low'
    },
    {
      title: 'Currency variety',
      description: 'We work with all major currency, including cryptocurrency',
      imageUrl: '/images/advantage-numbers.svg',
      type: 'numbers'
    },
    {
      title: 'Rating',
      description: 'The risk assessment&nbsp;by accredited rating agencies',
      imageUrl: '/images/advantage-rating.svg',
      type: 'rating'
    },
    {
      title: 'Services we provide',
      description: 'Legal. Financial. Design. Media.&nbsp;Marketing. Software development.',
      imageUrl: '/images/advantage-libra.svg',
      type: 'libra'
    },
    {
      title: 'Global platform',
      description: 'Investors from different countries',
      imageUrl: '/images/advantage-flags.svg',
      type: 'flags'
    }
  ]
};

const titleVersions = {
  ru: 'Преимущества On Place',
  en: 'Platform advantages'
};
/* eslint-enable max-len */

export default class Advantages extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  /**
   * Renders 'Advantages' component
   */
  render() {
    const { lang } = this.props;

    return (
      <div className="c-advantages-root">

        <h2 className="g-main-page-title">
          {titleVersions[lang]}
        </h2>
        <div className="advantages-list">
          {
            advantagesVersions[lang].map((advantage, index) => (
              <div
                className="advantage"
                key={index}
              >
                <div className="icon-container">
                  <img
                    className={`icon ${ advantage.type }`}
                    src={advantage.imageUrl}
                    alt={advantage.title}
                  />
                </div>
                <div className="title">
                  {advantage.title}
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: advantage.description }}
                >
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
