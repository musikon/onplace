if (global.IS_BROWSER) {
  require('./ProjectsExamples.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _chunk from 'lodash/chunk';
import { Link } from 'react-router';

import {
  DOMUtils,
  formatNumberWithSpaces
} from '../../utils';

import {
  Slider
} from '../../components';

const {
  closest,
  hasClass
} = DOMUtils;

/* eslint-disable max-len */
const projects = {
  ru: [
    {
      type: 'стандартный проект',
      noteLargeText: '10 000 Р',
      noteSmallText: 'мин. вложения от',
      noteColor: '#ffc200',
      title: 'Строительство пяти индивидуальных жилых домов эконом-класса в Прикубанском округе г. Краснодара ',
      description: 'Строительство пяти типовых одноэтажных домов в формате «под ключ».',
      imageUrl: '/images/data/project-about-background-small-1.jpg',
      percent: 28,
      targetSum: 7200000,
      currency: ';',
      roi: 25,
      link: '/ru/project/project1'
    },
    {
      type: 'Стартап',
      noteLargeText: 'С',
      ratingDescription: 'Высокий риск: нестабильность. На данный момент есть опасность непогашения или невыплаты процентов. В случае неблагоприятного стечения обстоятельств вероятно прекращение платежей. ',
      noteSmallText: 'рейтинг',
      noteColor: '#f59800',
      explainingDialog: true,
      title: 'Развитие бизнеса проекта компании «ЧИСТО»',
      description: 'Компания "ЧИСТО" позиционирует себя надежным партнером и помощником в сфере клининга для всего Краснодарского края',
      imageUrl: '/images/data/project-about-background-small-2.jpg',
      percent: 11,
      targetSum: 3000000,
      currency: ';',
      roi: 70,
      link: '/ru/project/project2'
    },
    {
      type: 'Крупный проект',
      noteLargeText: 'АA',
      ratingDescription: 'Очень хорошие: возможности эмитента по выплате долга и процентов оцениваются как очень высокие.',
      isAaa: true,
      explainingDialog: true,
      noteSmallText: 'Рейтинг',
      noteColor: '#f64300',
      title: 'Инвестиционный проект развития производства ООО «Росмет»',
      description: 'Завод крепежных изделий «РосМет» — на сегодняшний день является крупнейшим и единственным в России производителем качественной крепежной и метизной продукции для кровельных работ',
      imageUrl: '/images/data/project-about-background-small-3.jpg',
      percent: 2,
      targetSum: 12000000,
      currency: ';',
      roi: 20,
      link: '/ru/project/project3'
    },
    {
      type: 'Стартап',
      noteLargeText: 'А',
      ratingDescription: 'Хорошие: вложения выше среднего, привлекательны, но подвержены определенному влиянию, приводящему к риску в долгосрочной перспективе.',
      isAaa: true,
      explainingDialog: true,
      noteSmallText: 'Рейтинг',
      noteColor: '#f64300',
      title: 'Покупка акций / доли в бизнесе компании UBER',
      description: 'Uber Technologies Inc.  (Убер) — американская международная компания из Сан-Франциско, создавшая одноимённое мобильное приложение для поиска, вызова и оплаты такси или частных водителей.',
      imageUrl: '/images/data/uber.png',
      percent: 5,
      targetSum: 3000000,
      currency: ';',
      roi: 82,
      link: '/ru/project/project4'
    }
  ],
  en: [
    {
      currency: '$',
      title: 'The construction of five individual houses economy class  in Prikubansky district of Krasnodar',
      description: 'The construction of five single storey houses with "Finish"',
      imageUrl: '/images/data/project-about-background-small-1.jpg',
      link: '/en/project/project1',
      noteColor: '#ffc200',
      noteLargeText: '170 $',
      noteSmallText: 'min. investment from',
      percent: 28,
      roi: 25,
      targetSum: 120000,
      type: 'STANDARD PROJECT'
    },
    {
      type: 'Startup',
      noteLargeText: 'С',
      noteSmallText: 'rating',
      noteColor: '#f59800',
      explainingDialog: true,
      title: 'Business development of Chisto company project',
      description: 'The company "CHISTO" position itself as a reliable partner and assistant in the field of cleaning for the entire Krasnodar region',
      imageUrl: '/images/data/project-about-background-small-2.jpg',
      percent: 11,
      targetSum: 50000,
      currency: '$',
      roi: 70,
      link: '/en/project/project2'
    },
    {
      type: 'MAJOR PROJECT',
      noteLargeText: 'Аа',
      isAaa: true,
      noteSmallText: 'rating',
      noteColor: '#f64300',
      explainingDialog: true,
      title: 'Industrial project, increasing of production of LLC "Rosmet"',
      description: '"Rosmet" is the factory of fasteners  — today is the largest and the only Russian manufacturer of high-quality fasteners and hardware products for roofing',
      imageUrl: '/images/data/project-about-background-small-3.jpg',
      percent: 2,
      targetSum: 12000000,
      currency: '$',
      roi: 20,
      link: '/en/project/project3'
    },
    {
      type: 'Startup',
      noteLargeText: 'BBB',
      ratingDescription: '(Перевода нет) Средние: на текущий момент адекватно защищены, но может нехватать некоторых защитных элементов или они недостаточно надежны в долгосрочной перспективе.',
      isAaa: true,
      explainingDialog: true,
      noteSmallText: 'rating',
      noteColor: '#f64300',
      title: 'Project for purchasing shares / share of Chinese company Xiaomi',
      description: 'Xiaomi Inc. - a Chinese company founded by Lei Jun in 2010. \'Saami\' was founded by eight partners on 6 April 2010. August 16, 2010, Xiaomi officially launched the MIUI firmware based on Android.',
      imageUrl: '/images/data/xiaomi.png',
      percent: 13,
      targetSum: 5000000,
      currency: '$',
      roi: 65,
      link: '/en/project/project4'
    },
    {
      type: 'Startup',
      noteLargeText: 'А',
      ratingDescription: 'Good projects are attractive projects that require above average investing, but that are a subject to a certain influence leading to long-term risks.',
      isAaa: true,
      explainingDialog: true,
      noteSmallText: 'rating',
      noteColor: '#f64300',
      title: 'Share purchase/share in UBER',
      description: 'Uber Technologies Inc.  (Uber) is an American multinational company from San Francisco, who created the eponymous mobile app to search, call and pay taxi or private drivers.',
      imageUrl: '/images/data/uber.png',
      percent: 5,
      targetSum: 3000000,
      currency: '$',
      roi: 82,
      link: '/en/project/project5'
    }
  ]
};

const cardText = {
  ru: {
    annual: 'доходность за год',
    percent: 'привлечено',
    from: 'из'
  },
  en: {
    annual: 'annual income',
    percent: 'collected',
    from: 'of the'
  }
};

/* eslint-enable max-len */

export default class ProjectsExamples extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    title: Type.string,
    lang: Type.string,
    isSubpage: Type.bool,
    showDialog: Type.func
  };

  onClick(event) {
    const noteElement = closest(event.target, element => hasClass(element, 'g-question-mark-cursor'));

    if (noteElement) {
      event.preventDefault();
    }
  }

  /**
   * Renders 'ProjectsExamples' component
   */
  render() {
    const {
      lang,
      title,
      isSubpage,
      showDialog
    } = this.props;

    const chunkedProjects = _chunk(projects[lang], 3);

    return (
      <div className={`c-projects-examples-root ${ lang }`}>
        <h2 className={isSubpage ? 'g-main-page-inner-title' : 'g-main-page-title'}>
          {title ? this.props.title : 'Примеры проектов'}
        </h2>
        <div className="projects-container">
          <Slider
            allItemsText=""
            title=""
            withArrows={true}
            isProjectsSlider={true}
            isMobile={false}
            itemsInChunk={3}
            numItemInLastChunk={projects[lang].length % 3}
            chunksLength={chunkedProjects.length}
            withPagination={true}
          >
            <div>
              {
                (chunkedProjects).map((projectChunk, projectChunkIndex) => (
                  <div
                    key={projectChunkIndex}
                    className="slide"
                  >
                    {
                      projectChunk.map((project, index) => (
                        <Link
                          to={project.link}
                          className="project-item"
                          onClick={this.onClick}
                          key={index}
                        >
                          <div className="project-item-inner">
                            <div className="header">
                              <div className="information">
                                <div
                                  className="type"
                                  style={{ color: project.noteColor }}
                                >
                                  {project.type}
                                </div>
                                <div
                                  className={`note ${ project.explainingDialog ? 'g-question-mark-cursor' : '' }`}
                                  onClick={project.explainingDialog
                                  && showDialog.bind(null, project.noteLargeText, project.ratingDescription)}
                                >
                                  {
                                    project.explainingDialog &&
                                      <img alt="/" className="question" src="/images/question.svg" />
                                  }
                                  <div className="note-small-text">
                                    {project.noteSmallText}
                                  </div>
                                  <div className="note-large-text">
                                    {project.noteLargeText}
                                  </div>
                                </div>
                              </div>
                              <div className="g-content-title">
                                {project.title}
                              </div>
                              <div className="g-content-description">
                                {project.description}
                              </div>
                            </div>
                            <div className="image-container">
                              <img
                                className="image"
                                src={project.imageUrl}
                                alt={project.title}
                              />
                            </div>
                            <div className="footer">
                              <div className="footer-left-column">
                                <div
                                  style={{ width: `${ project.percent }%` }}
                                  className="footer-left-column-overlay"
                                ></div>
                                <div className="footer-left-column-inner">
                                  <div className="footer-small-text">
                                    {cardText[lang].percent} {project.percent}% {cardText[lang].from}
                                  </div>
                                  <div className="footer-large-text">
                                    {formatNumberWithSpaces(project.targetSum)}
                                    &nbsp;
                                    <span className="currency">{project.currency}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="footer-right-column">
                                <div className="footer-very-small-text">
                                  {cardText[lang].annual}
                                </div>
                                <div className="footer-large-text">
                                  ROI {project.roi}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
