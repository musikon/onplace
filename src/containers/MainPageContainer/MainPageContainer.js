if (global.IS_BROWSER) {
  require('./MainPageContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _chunk from 'lodash/chunk';
import _findIndex from 'lodash/findIndex';
import _size from 'lodash/size';
import _throttle from 'lodash/throttle';
import _clamp from 'lodash/fp/clamp';
import _flow from 'lodash/fp/flow';
import _map from 'lodash/fp/map';
import _sortedIndex from 'lodash/fp/sortedIndex';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  GlobalActions
} from '../../actions';

import {
  animate,
  easings
} from '../../utils';

import {
  Advantages,
  PromoBlockSlider,
  Header,
  HowItWorks,
  FixedFooter,
  InvestmentsModels,
  NewsCard,
  InfoSlider,
  Slider,
  TeamMemberCard,
  ProjectDevelopment,
  ProjectsExamples,
  ProjectsTypes,
  TeamCardsList,
  Footer
} from '../../components';

import { MOBILE_BREAKPOINT } from '../../constants';

import { styles } from '../../commonData';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/* eslint-disable */

const socialItemsHeader = [
  { img: '/images/socials/facebook_white.svg', link: 'https://www.facebook.com/onplace', alt: 'Facebook' },
  { img: '/images/socials/instagram_white.svg', link: 'https://www.instagram.com/on_place/', alt: 'Instagram' },
  { img: '/images/socials/twitter_white.svg', link: 'https://twitter.com/on_place', alt: 'Twitter' },
  { img: '/images/socials/linked_white.svg', link: 'https://www.linkedin.com/company/onplace-inc', alt: 'LinkedIn' },
];

const teamVersions = {};

teamVersions.ru = [
  {
    name: 'Периков Евгений',
    position: 'Директор OnPlace',
    photo: '/images/team/perikov.jpg',
    age: '29 лет',
		socials: [
		  { type: 'facebook', link: 'https://www.facebook.com/john.perikov' },
      { type: 'instagram', link: 'https://www.instagram.com/perikov87/' }
    ],
    description: '<p>Закончил Факультет Прикладной Информатики в Экономике. Шесть лет работал в ГК «Олимпстрой» на должности руководителя отдела логистики. Собственник бизнеса в сфере гостиниц и хостелов, на рынке более 5 лет. За 4 месяца 2016 г. принял и разместил 3 640 туристов из Китая.</p>'
  },
  {
    name: 'Гамов Михаил',
    position: 'Соучредитель OnPlace',
    age: '36 лет',
		socials: [
		  { type: 'facebook', link: 'https://www.facebook.com/gamov.michael' },
      { type: 'instagram', link: 'https://www.instagram.com/mrx_rus/' }
    ],
    infoLargeText: '11',
    infoMiddleText: 'лет',
    infoSmallText: 'в сфере оценки проектных рисков',
    photo: '/images/team/gamov.jpg',
    description: '<p>Руководитель и собственник консалтинговой компании (11 лет в сфере оценки проектных рисков, управленческого консалтинга и финансового планирования). Действующий член Экспертного совета Саморегулируемой организации (СРО) специалистов - оценщиков. Муж, отец двух дочерей.</p>'
  },
  {
    name: 'Есипенко Олег Владимирович',
    position: 'Коммерческий директор',
    photo: '/images/team/esipenko.jpg',
    infoLargeText: '13',
    infoMiddleText: 'лет',
    infoSmallText: 'успешного инвестирования',
    socials: [
      { type: 'facebook', link: 'https://www.facebook.com/Esipenko.O' },
      { type: 'instagram', link: 'https://www.instagram.com/esipenko.oleg/' }

    ],
    age: '47 лет',
    description: '<p>Организация Коммерческой деятельности с иностранными поставщиками в сфере продовольственных товаров 7 лет. Импорт и сбыт промышленных товаров 5 лет. Индивидуальное строительство и частные инвестпроекты 10 лет.</p>'
  },
  {
    name: 'Диденок Кирилл',
    age: '26 лет',
		socials: [
      { type: 'facebook', link: 'https://www.facebook.com/didenok' },
		  { type: 'instagram', link: 'https://www.instagram.com/didenok/' }
    ],
    position: 'Директор по маркетингу',
    photo: '/images/team/didenok.jpg',
    description: '<p>Закончил университет, отслужил в армии, женился. Автор популярного блога в Instagram и YouTube, суммарная аудитория превышает 350,000 человек. Известный пиарщик, среди клиентов такие бренды как LG, Сбербанк, MEGA IKEA, Макдоналдс, 20th Century Fox, Hyundai, Warner Bros. и другие.</p>',
  },
  {
    name: 'Майкл Горден',
    age: '33 года',
    socials: [
      { type: 'facebook', link: 'https://www.facebook.com/mikemikegorden' },
      { type: 'instagram', link: 'https://www.instagram.com/_m_mike_m_/' }
    ],
    photo: '/images/team/gorden.jpg',
    position: 'Руководитель аналитического отдела',
    description: '<p>Вашингтон, США.</p><p>Ради проекта OnPlace отказался от строительной компании, которую сам организовал.</p><p>Работал в компании ICON GLOBAL руководителем проект аналитического департамента.</p>'
  },
  {
    name: 'Соловьянов Илья',
    position: 'IT Директор',
    photo: '/images/team/solovyanov.jpg',
    age: '22 года',
    socials: [
      { type: 'instagram', link: 'https://www.instagram.com/ilyakmet/' }
    ],
    description: '<p>Магистрант направления «Анализ Больших данных», Национальный исследовательский университет, «Высшая школа экономики».</p>'
  },
  {
    name: 'Дмитрий Провоторов',
    position: 'Менеджер цифровых продуктов',
    photo: '/images/team/provotorov.jpg',
		socials: [
		  { type: 'facebook', link: 'https://www.facebook.com/provotorov' },
      { type: 'instagram', link: 'https://www.instagram.com/provotorov/' }
    ],
    age: '31 год',
    description: '<p>Отец троих детей. Спроектированный под его руководством Sizer стал App of the Week по мнению Apple и был номинирован на The Webby Awards. Работал над продуктами для YOTAPHONE 2, Аэрофлот, HONDA, ЭКСМО и Digital October.</p>'
  },
];

teamVersions.en = [
  {
    name: 'Evgeny Perikov',
    position: 'OnPlace Director',
    photo: '/images/team/perikov.jpg',
		socials: [
		  { type: 'facebook', link: 'https://www.facebook.com/john.perikov' },
      { type: 'instagram', link: 'https://www.instagram.com/perikov87/' }
    ],
    age: '29 years',
    description: `<p>Graduated from the faculty of Applied Informatics in Economics. Worked at Olympstroy as the head
      of logistics department for 6 years.</p><p>Owner of the hotel and hostel business for 5 years. Hosted 3 640 
      Chinese tourists during the four-month period in 2016.</p>`
  },
  {
    name: 'Mikhail Gamov',
    position: 'OnPlace Co-Founder',
    age: '36 years',
		socials: [
      { type: 'facebook', link: 'https://www.facebook.com/gamov.michael' },
      { type: 'instagram', link: 'https://www.instagram.com/mrx_rus/' }
    ],
    photo: '/images/team/gamov.jpg',
    description: `<p>The Director and owner of a consulting company (11 years in the field, risks project assessment, 
      management consulting and financial planning). Member of the Expert Council of the self-regulatory organization
      (SRO) professional appraisers. Husband, father of two daughters.</p>`
  },
  {
    name: 'Esipenko Oleg Vladimirovich',
    position: 'Commercial director',
    photo: '/images/team/esipenko.jpg',
    socials: [
      { type: 'facebook', link: 'https://www.facebook.com/Esipenko.O' },
      { type: 'instagram', link: 'https://www.instagram.com/esipenko.oleg/' }
    ],
    age: '47 years',
    description: `<p>The organization of Commercial activity with foreign suppliers in the sphere of food products of
     7 years. Import and sale of industrial goods of 5 years. Individual construction and private investment projects of 
     10 years. Private investments into apartment houses 3 years.</p>`
  },
  {
    name: 'Kirill Didenok',
    age: '26 years',
		socials: [
      { type: 'facebook', link: 'https://www.facebook.com/didenok' },
      { type: 'instagram', link: 'https://www.instagram.com/didenok/' }
    ],
    position: 'Marketing Director',
    photo: '/images/team/didenok.jpg',
    description: `<p>The author of the popular blog in Instagram and YouTube, total audience exceeds 350,000 people. 
      The famous PR manager, among clients there are such brands as LG, Sberbank, MEGA IKEA, McDonald's, 20th Century 
      Fox, Hyundai, Warner Bros. and others. </p>`,
  },
  {
    name: 'Michael Gorden',
    age: '33 years',
		socials: [
      { type: 'facebook', link: 'https://www.facebook.com/mikemikegorden' },
      { type: 'instagram', link: 'https://www.instagram.com/_m_mike_m_/' }
    ],
    photo: '/images/team/gorden.jpg',
    position: 'Head of the analytical department',
    description: '<p>Washington, USA.</p><p>CEO of the construction company.</p><p>Worked at ICON GLOBAL as the head of analytical department, and project management.</p>'
  },
  {
    name: 'Solovyanov Ilya',
    position: 'IT Director',
    photo: '/images/team/solovyanov.jpg',
    age: '22 years',
		socials: [
      { type: 'instagram', link: 'https://www.instagram.com/ilyakmet/' }
    ],
    description: '<p>Master of Big Data Analysis, National Research University, Higher School of Economics.</p>'
  },
  {
    name: 'Dmitry Provotorov',
    position: 'Digital products Manager',
    photo: '/images/team/provotorov.jpg',
		socials: [
      { type: 'facebook', link: 'https://www.facebook.com/provotorov' },
      { type: 'instagram', link: 'https://www.instagram.com/provotorov/' }
    ],
    age: '31 years',
    description: `<p>Sizer designed under his management became App of the Week according to Apple and has been 
      nominated for The Webby Awards. Aeroflot, HONDA, EKSMO and Digital October worked on products for YOTAPHONE 2.
      Participant of development more than 200 IT projects.</p>`
  },
];

const teamTitleVersions = {
  ru: 'Команда',
  en: 'Team'
};

const newsTitleVersion = {
  ru: 'Новости и статьи',
  en: 'News and articles'
};

const newsTitleProjects = {
  ru: 'Примеры проектов',
  en: 'Projects'
};

const allItemsNews = {
  ru: 'Все новости',
  en: 'All News'
}

const closeVersions = {
  ru: 'Закрыть',
  en: 'Hide'
};

/* eslint-enable */

const headerHeight = 72;
const numberOfFetchedNews = 10;

const animatedScrollTo = (value, duration = 600, easingType = 'easeInQuad') => (animate({
  duration,
  easing: easings[easingType],
  drawFunctionParams: {
    element: document.body,
    property: 'scrollTop',
    value: value - headerHeight
  }
}));

@connect(state => ({
  mainPage: state.GlobalReducer
}), dispatch => ({
  actions: bindActionCreators(GlobalActions, dispatch)
}))
export default class MainPageContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    actions: Type.object,
    mainPage: Type.object,
    location: Type.object,
    routes: Type.array,
    newsActions: Type.object,
    setMediaQueryId: Type.func,
    mediaQueryId: Type.string
  };

  static initialFetchData = [
    ({ store, location }) => {
      let lang = location.pathname.split('/')[1];

      if (lang === '') {
        lang = 'ru';
      }

      return store.dispatch(GlobalActions.fetchNews(numberOfFetchedNews, lang));
    },
    ({ store, location }) => {
      let lang = location.pathname.split('/')[1];

      if (lang === '') {
        lang = 'ru';
      }

      return store.dispatch(GlobalActions.fetchPublications(lang));
    }
  ];

  constructor(props) {
    super(props);

    this.anchors = {};

    this.isPlug = false;

    this.updateActiveMenuItem = ::this.updateActiveMenuItem;
    this.positionRegistrationButton = ::this.positionRegistrationButton;
    this.onWindowResize = _throttle(::this.onWindowResize, 450);

    this.state = {
      isMobile: false,
      dialogIsShowing: false,
      dialogTitle: '',
      dialogContent: '',
      mainPageActiveSection: null,
      registrationButtonMargin: 0,
    };
  }

  componentWillMount() {
    if (global.IS_BROWSER) {
      this.props.actions.langSwitch(this.props.routes[1].path, this.props.location.pathname);

      if (!this.props.mainPage[`newsArray${ this.props.mainPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
        this.props.actions.fetchNews(numberOfFetchedNews, this.props.mainPage.lang);
      }

      if (!this.props.mainPage[`publications${ this.props.mainPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
        this.props.actions.fetchPublications(this.props.mainPage.lang);
      }
    }
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    document.addEventListener('scroll', this.updateActiveMenuItem);
    window.addEventListener('resize', this.onWindowResize);

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      this.setState({
        isMobile: true
      });
    }

    this.updateActiveMenuItem();
    this.goToActiveSection();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mainPage.lang !== this.props.mainPage.lang) {
      if (!this.props.mainPage[`publications${ nextProps.mainPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
        this.props.actions.fetchPublications(nextProps.mainPage.lang);
      }

      if (!this.props.mainPage[`newsArray${ nextProps.mainPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
        this.props.actions.fetchNews(numberOfFetchedNews, nextProps.mainPage.lang);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.updateActiveMenuItem);
    window.removeEventListener('resize', this.onWindowResize);
  }

  onMenuItemClick(menuItemName) {
    const targetNode = this.anchors[menuItemName];
    const targetOffsetTop = targetNode && targetNode.offsetTop;

    if (targetOffsetTop) {
      animatedScrollTo(targetOffsetTop);
    }
  }

  onLangSwitch(lang) {
    this.props.actions.langSwitch(lang, this.props.location.pathname);
    this.updateActiveMenuItem();
  }
  onWindowResize() {
    if (window.innerWidth < MOBILE_BREAKPOINT && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }

    if (window.innerWidth >= MOBILE_BREAKPOINT && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    }

    //this.positionRegistrationButton();
  }

  positionRegistrationButton(heightSlider) {
    /* indentation from the bottom of the slider in full screen 70px*/
    if ((window.innerHeight - heightSlider) === 70) {
      this.setState({ registrationButtonMargin: 10 });
    } else if (window.innerWidth < 1400) {
      this.setState({ registrationButtonMargin: 30 });
    } else {
      this.setState({ registrationButtonMargin: window.innerHeight - heightSlider - 56 });
    }
  }

  handleClose() {
    this.setState({
      dialogIsShowing: false
    });
  }

  showDialog(title, content) {
    this.setState({
      dialogIsShowing: true,
      dialogTitle: title,
      dialogContent: content
    });
  }

  goToActiveSection() {
    if (this.props.mainPage.mainPageActiveSection) {
      const targetNode = this.anchors[this.props.mainPage.mainPageActiveSection];
      const targetOffsetTop = targetNode && targetNode.offsetTop;

      if (targetOffsetTop) {
        window.scrollTo(0, targetOffsetTop - headerHeight);

        this.props.actions.disableGoToMainPage();
      }
    } else window.scrollTo(0, 0);
  }

  updateActiveMenuItem() {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const currentActiveItemIndex = _findIndex(this.props.mainPage.menuItems, 'active');
    const viewportOffset = window.innerHeight / 3;

    const activeMenuItemIndex = _flow(
      _map(item => item.offsetTop),
      _sortedIndex()(currentScrollTop - viewportOffset),
      _clamp()(0, _size(this.anchors) - 1)
    )(this.anchors);

    if (currentActiveItemIndex === activeMenuItemIndex) {
      return;
    }

    this.props.actions.setActiveMenuItemIndex(activeMenuItemIndex);
  }

  renderPlugMainPage() {
    const {
      newsArrayEn,
      newsArrayRu,
      publicationsRu,
      publicationsEn,
      mediaQueryId
    } = this.props.mainPage;

    const {
      setMediaQueryId
    } = this.props.actions;


    const { menuItems, lang } = this.props.mainPage;

    const newsArray = (lang === 'ru' ? newsArrayRu : newsArrayEn);
    const chunkedNews = _chunk(newsArray, 2);
    const chunkedTeams = _chunk(teamVersions[lang], 4);

    const publications = lang === 'ru' ? publicationsRu : publicationsEn;

    const actions = (<RaisedButton
      label={closeVersions[lang]}
      style={styles.buttonContainer}
      buttonStyle={styles.button}
      overlayStyle={styles.buttonOverlay}
      backgroundColor="#1e9df2"
      labelColor="#ffffff"
      onClick={::this.handleClose}
    />);

    const {
      isMobile,
      dialogTitle,
      dialogContent,
      dialogIsShowing
    } = this.state;

    return (
      <div className="c-home-page-root">
        <div
          id="js-header"
          className="header-wrapper"
        >
          <Header
            menuItems={menuItems}
            lang={lang}
            onLangSwitch={::this.onLangSwitch}
            onMenuItemClick={::this.onMenuItemClick}
            isMain={true}
          />
        </div>
        <div className="main-page-content-container">
          <div className="socials-icons-container">
            {
              socialItemsHeader.map((item, index) => (
                <a key={index} target="_blank" href={item.link} className="social-icon">
                  <img src={item.img} alt={item.alt} />
                </a>
              ))
            }
          </div>
          <div className="content-animated-slider-wrapper">
            <div
              className="fixed-footer-wrapper"
              style={{ bottom: `${ this.state.registrationButtonMargin }px` }}
              id="js-fixed-footer"
            >
              <FixedFooter lang={lang} />
            </div>
            <PromoBlockSlider
              positionRegistrationButton={this.positionRegistrationButton}
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="projects-wrapper"
            ref={projectsExamples => (this.anchors.projectsExamples = projectsExamples)}
          >
            <ProjectsExamples
              lang={lang}
              showDialog={::this.showDialog}
              title={newsTitleProjects[lang]}
            />
          </div>
          <div
            className="news-wrapper"
            ref={newsBlock => (this.anchors.news = newsBlock)}
          >
            <Slider
              allItemsLink={`${ lang }/news`}
              allItemsText={allItemsNews[lang]}
              title={newsTitleVersion[lang]}
              withArrows={true}
              isMobile={isMobile}
              chunksLength={chunkedNews.length}
              withPagination={true}
            >
              <div>
                {
                  (!newsArray[0]) ? '' :
                    ((isMobile ? [[newsArray[0]]] : chunkedNews)).map((newsChunk, newsChunkIndex) => (
                      <div
                        key={newsChunkIndex}
                        className="slide"
                      >
                        {
                          newsChunk.map((newsItem, index) => (
                            <NewsCard
                              key={index}
                              lang={lang}
                              data={newsItem}
                              withImage={!!(index % 2)}
                            />
                          ))
                        }
                      </div>
                    ))
                }
              </div>
            </Slider>
          </div>
          <div
            className="info-slider"
          >
            <Slider
              withArrows={publications.length > 1}
              isMobile={isMobile}
              chunksLength={publications.length}
              arrowsMidle={publications.length > 1}
              slidesRootClassName="info-slider"
            >
              <div>
                {
                  publications.map((infoItem, infoIndex) => (
                    <div className="slide" key={infoIndex}>
                      <InfoSlider
                        className="slide"
                        key={infoIndex}
                        data={infoItem}
                      />
                    </div>
                  ))
                }
              </div>

            </Slider>
          </div>
          <div className="project-development-wrapper">
            <ProjectDevelopment
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="projects-types-wrapper"
            ref={projectsTypes => (this.anchors.projectsTypes = projectsTypes)}
          >
            <ProjectsTypes
              lang={lang}
            />
          </div>
          <div className="investments-models-wrapper">
            <InvestmentsModels
              showDialog={::this.showDialog}
              lang={lang}
              mediaQueryId={mediaQueryId}
              setMediaQueryId={setMediaQueryId}
            />
          </div>
          <div
            className="how-it-works-wrapper"
            ref={howItWorks => (this.anchors.howItWorks = howItWorks)}
          >
            <HowItWorks
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="advantages-wrapper"
            ref={advantages => (this.anchors.advantages = advantages)}
          >
            <Advantages
              lang={lang}
            />
          </div>
          <div
            className="team-wrapper"
            ref={teamBlock => (this.anchors.team = teamBlock)}
          >
            {
              !isMobile && (
                <Slider
                  title={teamTitleVersions[lang]}
                  slidesRootClassName="team-slider"
                  specialMove={true}
                  numItemInLastChunk={teamVersions[lang].length % 3}
                  itemsInChunk={4}
                  withArrows={true}
                  chunksLength={chunkedTeams.length}
                  isTeam={true}
                  withPagination={true}
                >
                  <div>
                    {
                      chunkedTeams.map((teamChunk, teamChunkIndex) => (
                        <div
                          key={teamChunkIndex}
                          className="slide"
                        >
                          {
                            teamChunk.map((teamItem, index) => (
                              <TeamMemberCard
                                key={index}
                                data={teamItem}
                              />
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                </Slider>
              )
            }
            {
              isMobile && (
                <TeamCardsList
                  team={teamVersions[lang]}
                  lang={lang}
                />
              )
            }
          </div>
        </div>
        <div className="footer-wrapper__main">
          <Footer
            isPlug={true}
            lang={lang}
            isMobile={isMobile}
          />
        </div>
        <Dialog
          title={dialogTitle}
          actions={actions}
          modal={false}
          open={dialogIsShowing}
          actionsContainerStyle={styles.actionsContainer}
          contentStyle={{ maxWidth: 570 }}
          titleStyle={styles.dialogTitle}
          bodyStyle={styles.dialog}
          onRequestClose={::this.handleClose}
        >
          {dialogContent}
        </Dialog>
      </div>
    );
  }

  renderFullMainPage() {
    const {
      newsArrayEn,
      newsArrayRu,
      publicationsRu,
      publicationsEn,
      mediaQueryId
    } = this.props.mainPage;

    const {
      setMediaQueryId
    } = this.props.actions;


    const { menuItems, lang } = this.props.mainPage;

    const newsArray = (lang === 'ru' ? newsArrayRu : newsArrayEn);
    const chunkedNews = _chunk(newsArray, 2);
    const chunkedTeams = _chunk(teamVersions[lang], 4);

    const publications = lang === 'ru' ? publicationsRu : publicationsEn;

    const actions = (<RaisedButton
      label={closeVersions[lang]}
      style={styles.buttonContainer}
      buttonStyle={styles.button}
      overlayStyle={styles.buttonOverlay}
      backgroundColor="#1e9df2"
      labelColor="#ffffff"
      onClick={::this.handleClose}
    />);

    const {
      isMobile,
      dialogTitle,
      dialogContent,
      dialogIsShowing
    } = this.state;

    return (
      <div className="c-home-page-root">
        <div
          id="js-header"
          className="header-wrapper"
        >
          <Header
            menuItems={menuItems}
            lang={lang}
            onLangSwitch={::this.onLangSwitch}
            onMenuItemClick={::this.onMenuItemClick}
            isMain={true}
          />
        </div>
        <div className="main-page-content-container">
          <div className="socials-icons-container">
            {
              socialItemsHeader.map((item, index) => (
                <a key={index} target="_blank" href={item.link} className="social-icon">
                  <img src={item.img} alt={item.alt} />
                </a>
              ))
            }
          </div>
          <div className="content-animated-slider-wrapper">
            <div
              className="fixed-footer-wrapper"
              style={{ bottom: `${ this.state.registrationButtonMargin }px` }}
              id="js-fixed-footer"
            >
              <FixedFooter lang={lang} />
            </div>
            <PromoBlockSlider
              positionRegistrationButton={this.positionRegistrationButton}
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="projects-wrapper"
            ref={projectsExamples => (this.anchors.projectsExamples = projectsExamples)}
          >
            <ProjectsExamples
              lang={lang}
              showDialog={::this.showDialog}
              title={newsTitleProjects[lang]}
            />
          </div>
          <div
            className="news-wrapper"
            ref={newsBlock => (this.anchors.news = newsBlock)}
          >
            <Slider
              allItemsLink={`${ lang }/news`}
              allItemsText={allItemsNews[lang]}
              title={newsTitleVersion[lang]}
              withArrows={true}
              isMobile={isMobile}
              chunksLength={chunkedNews.length}
              withPagination={true}
            >
              <div>
                {
                  (!newsArray[0]) ? '' :
                  ((isMobile ? [[newsArray[0]]] : chunkedNews)).map((newsChunk, newsChunkIndex) => (
                    <div
                      key={newsChunkIndex}
                      className="slide"
                    >
                      {
                        newsChunk.map((newsItem, index) => (
                          <NewsCard
                            key={index}
                            lang={lang}
                            data={newsItem}
                            withImage={!!(index % 2)}
                          />
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </Slider>
          </div>
          <div
            className="info-slider"
          >
            <Slider
              withArrows={publications.length > 1}
              isMobile={isMobile}
              chunksLength={publications.length}
              arrowsMidle={publications.length > 1}
              slidesRootClassName="info-slider"
            >
              <div>
                {
                  publications.map((infoItem, infoIndex) => (
                    <div className="slide" key={infoIndex}>
                      <InfoSlider
                        className="slide"
                        key={infoIndex}
                        data={infoItem}
                      />
                    </div>
                  ))
                }
              </div>

            </Slider>
          </div>
          <div className="project-development-wrapper">
            <ProjectDevelopment
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="projects-types-wrapper"
            ref={projectsTypes => (this.anchors.projectsTypes = projectsTypes)}
          >
            <ProjectsTypes
              lang={lang}
            />
          </div>
          <div className="investments-models-wrapper">
            <InvestmentsModels
              showDialog={::this.showDialog}
              lang={lang}
              mediaQueryId={mediaQueryId}
              setMediaQueryId={setMediaQueryId}
            />
          </div>
          <div
            className="how-it-works-wrapper"
            ref={howItWorks => (this.anchors.howItWorks = howItWorks)}
          >
            <HowItWorks
              isMobile={isMobile}
              lang={lang}
            />
          </div>
          <div
            className="advantages-wrapper"
            ref={advantages => (this.anchors.advantages = advantages)}
          >
            <Advantages
              lang={lang}
            />
          </div>
          <div
            className="team-wrapper"
            ref={teamBlock => (this.anchors.team = teamBlock)}
          >
            {
              !isMobile && (
                <Slider
                  title={teamTitleVersions[lang]}
                  slidesRootClassName="team-slider"
                  specialMove={true}
                  withArrows={true}
                  numItemInLastChunk={teamVersions[lang].length % 3}
                  itemsInChunk={4}
                  chunksLength={chunkedTeams.length}
                  isTeam={true}
                  withPagination={true}
                >
                  <div>
                    {
                      chunkedTeams.map((teamChunk, teamChunkIndex) => (
                        <div
                          key={teamChunkIndex}
                          className="slide"
                        >
                          {
                            teamChunk.map((teamItem, index) => (
                              <TeamMemberCard
                                key={index}
                                data={teamItem}
                              />
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                </Slider>
              )
            }
            {
              isMobile && (
                <TeamCardsList
                  team={teamVersions[lang]}
                  lang={lang}
                />
              )
            }
          </div>
        </div>
        <div className="footer-wrapper__main">
          <Footer
            isMobile={isMobile}
            lang={lang}
          />
        </div>
        <Dialog
          title={dialogTitle}
          actions={actions}
          modal={false}
          open={dialogIsShowing}
          actionsContainerStyle={styles.actionsContainer}
          contentStyle={{ maxWidth: 570 }}
          titleStyle={styles.dialogTitle}
          bodyStyle={styles.dialog}
          onRequestClose={::this.handleClose}
        >
          {dialogContent}
        </Dialog>
      </div>
    );
  }

  /**
   * Renders 'MainPageContainer' component
   */
  render() {
    return this.isPlug ? this.renderPlugMainPage() : this.renderFullMainPage();
  }
}
