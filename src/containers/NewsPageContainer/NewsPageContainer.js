if (global.IS_BROWSER) {
  require('./NewsPageContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import LinearProgress from 'material-ui/LinearProgress';

import _throttle from 'lodash/throttle';
import _pick from 'lodash/pick';
import _reject from 'lodash/reject';
import _take from 'lodash/take';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  GlobalActions,
  NewsActions
} from '../../actions';

import {
  Header,
  SimpleTitle,
  NewsCard,
  Footer,
  EditorContentContainer
} from '../../components';

import { MOBILE_BREAKPOINT } from '../../constants';

const numberOfFetchedNews = 10;

@connect(state => ({
  globalPage: state.GlobalReducer,
  articlePage: state.NewsReducer,
}), dispatch => ({
  actions: bindActionCreators(GlobalActions, dispatch),
  newsActions: bindActionCreators(NewsActions, dispatch)
}))
export default class NewsPageContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    actions: Type.object,
    activeIndex: Type.number,
    articlePage: Type.object,
    globalPage: Type.object,
    headerClass: Type.string,
    testData: Type.object,
    newsActions: Type.object,
    routeParams: Type.object,
    location: Type.object,
    routes: Type.array
  };

  static initialFetchData = [
    ({ store, location }) => {
      const newsId = location.pathname.split('/')[3];

      return store.dispatch(NewsActions.fetchArticle(newsId));
    },
    ({ store, location }) => {
      const lang = location.pathname.split('/')[1];

      return store.dispatch(GlobalActions.fetchNews(numberOfFetchedNews, lang));
    }
  ];

  constructor() {
    super();

    this.isPlug = true;

    this.onWindowResize = _throttle(::this.onWindowResize, 450);

    this.state = {
      isMobile: false
    };
  }

  componentWillMount() {
    if (global.IS_BROWSER) {
      this.props.actions.langSwitch(this.props.routes[1].path, this.props.location.pathname);
    }
    
    if (!this.props.articlePage.articleArray.length) {
      this.props.newsActions.fetchArticle(this.props.routeParams.newsId);
    }
  
    if (!this.props.globalPage[`newsArray${ this.props.globalPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
      this.props.actions.fetchNews(numberOfFetchedNews, this.props.globalPage.lang);
    }
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      this.setState({
        isMobile: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextNewsId = nextProps.routeParams.newsId;
    
    if (nextNewsId !== this.props.routeParams.newsId) {
      this.props.newsActions.fetchArticle(nextNewsId, () => (window.scrollTo(0, 0)));
    }
  }

  componentWillUnmount() {
    this.props.newsActions.unmountArticle();
  }

  onWindowResize() {
    if (window.innerWidth < MOBILE_BREAKPOINT && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }

    if (window.innerWidth >= MOBILE_BREAKPOINT && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    }
  }

  onLangSwitch(lang) {
    this.props.actions.langSwitch(lang, this.props.location.pathname);
  }

  onMenuItemClick(menuItemName) {
    this.props.actions.goToMainPage(menuItemName);
  }

  /**
   * Renders 'NewsPageContainer' component
   */
  render() {
    const {
      menuItems,
      newsArrayEn,
      newsArrayRu,
      isPlug
    } = this.props.globalPage;

    const {
      articleArray,
      isFetched
    } = this.props.articlePage;

    const simpleTitleObj = _pick(articleArray, ['title', 'date', 'author']);
    const activeIndex = 1;

    const { isMobile } = this.state;
    const { lang } = this.props.globalPage;
    const newsArray = (lang === 'ru' ? newsArrayRu : newsArrayEn);
    const filteredNewsArray = _reject(newsArray, { id: articleArray.id });

    return (
      <div className={`c-article-page-root ${ isFetched ? '' : '' }`} >
        <div
          className="g-header-wrapper"
          style={{ backgroundColor: middleColor }}
        >
          <Header
            middleColor={middleColor}
            activeIndex={activeIndex}
            onLangSwitch={::this.onLangSwitch}
            menuItems={menuItems}
            isPlug={true}
            onMenuItemClick={::this.onMenuItemClick}
            lang={lang}
          />
        </div>
        <div className="simple-title-wrapper">
          {simpleTitleObj &&
            <SimpleTitle
              simpleTitleObj={simpleTitleObj}
              lang={lang}
            />}
        </div>
        <LinearProgress
          mode="indeterminate"
          className={`${ isFetched ? 'hidden' : '' }`}
        />
        <EditorContentContainer htmlContent={articleArray.html} />
        <div
          className={`news-wrapper ${ !filteredNewsArray.length ? 'hide' : '' }`}
        >
          <div className="news-container">
            <div className="news-container-inner">
              <div>
                <h2 className="g-main-page-title news-container-inner-title">
                  Похожие статьи
                </h2>
                <div className="news-card-container">
                  {
                    filteredNewsArray.length && _take(filteredNewsArray, 2).map((newsItem, newsItemIndex) => (
                      <NewsCard
                        key={newsItemIndex}
                        data={newsItem}
                        lang={lang}
                        withImage={!!(newsItemIndex % 2)}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer
          isMobile={isMobile}
          lang={lang}
          isPlug={isPlug}
        />
      </div>
    );
  }
}

const middleColor = '#7F7F7B';
