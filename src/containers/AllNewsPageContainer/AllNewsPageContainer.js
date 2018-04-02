if (global.IS_BROWSER) {
  require('./AllNewsPageContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _throttle from 'lodash/throttle';
import _chunk from 'lodash/chunk';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  AllNewsActions,
  GlobalActions
} from '../../actions';

import {
  Header,
  NewsTitle,
  NewsContainer,
  AddNewsButton,
  Footer
} from '../../components';

import { MOBILE_BREAKPOINT } from '../../constants';

const numberOfFetchedNews = 6;

function chunkOn(initialArray, numberOfItemsInChunkArray) {
  const array = initialArray;
  const result = [];
  let iteration = 0;

  while (array.length) {
    result.push(array.splice(0, numberOfItemsInChunkArray[iteration] || Infinity));
    iteration++;
  }

  return result;
}

const pathToItemsWithImage = ['[0][1]', '[1][2]', '[2][0]'];
const pathToVerticalItem = ['[2][0]'];

@connect(state => ({
  globalPage: state.GlobalReducer,
  AllNewsReducer: state.AllNewsReducer
}), dispatch => ({
  AllNewsActions: bindActionCreators(AllNewsActions, dispatch),
  actions: bindActionCreators(GlobalActions, dispatch)
}))
export default class AllNewsPageContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    AllNewsActions: Type.object,
    activeIndex: Type.number,
    articlePage: Type.object,
    headerClass: Type.string,
    testData: Type.object,
    menuItems: Type.object,
    newsBlockArray: Type.array,
    isFetched: Type.bool,
    globalPage: Type.object,
    AllNewsReducer: Type.object,
    actions: Type.object,
    location: Type.object
  };

  static initialFetchData = [
    ({ store, location }) => {
      const lang = location.pathname.split('/')[1];

      return store.dispatch(AllNewsActions.fetchNews(numberOfFetchedNews, lang));
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

  /**
   * Invokes after the initial rendering of component
   */
  componentWillMount() {
    if (!this.props.AllNewsReducer[`newsBlockArray${ this.props.globalPage.lang === 'ru' ? 'Ru' : 'En' }`].length) {
      this.props.AllNewsActions.fetchNews(numberOfFetchedNews, this.props.globalPage.lang);
    }
  }
  // /**
  //  * Invokes after the initial rendering of component
  //  */
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        isMobile: true
      });
    }
  }

  onLangSwitch(lang) {
    this.props.actions.langSwitch(lang, this.props.location.pathname);
  }

  onMenuItemClick(menuItemName) {
    this.props.actions.goToMainPage(menuItemName);
  }

  onWindowResize() {
    if (window.innerWidth < MOBILE_BREAKPOINT && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }

    if (window.innerWidth >= MOBILE_BREAKPOINT && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    }
  }

  fetchMoreNews() {
    const { lang } = this.props.globalPage;
    const currentNewsLength = this.props.AllNewsReducer[`newsBlockArray${ lang === 'ru' ? 'Ru' : 'En' }`].length;

    this.props.AllNewsActions.fetchNews(numberOfFetchedNews, lang, currentNewsLength);
  }

  /**
   * Renders 'AllNewsPageContainer' component
   */
  render() {
    const {
      newsBlockArrayRu,
      newsBlockArrayEn,
      isFetched,
      totalCount
    } = this.props.AllNewsReducer;

    const { menuItems, lang, isPlug } = this.props.globalPage;

    const newsBlockArray = (lang === 'ru' ? newsBlockArrayRu : newsBlockArrayEn);
    const chunkedBlockArray = _chunk(newsBlockArray, 6);
    const copyNewsBlockArray = _map(chunkedBlockArray, chunk => chunkOn(chunk, [2, 3, 1]));


    _forEach(copyNewsBlockArray, array => {
      _forEach(pathToItemsWithImage, path => {
        const item = _get(array, path);

        if (item) {
          item.withImage = true;
        }
      });

      _forEach(pathToVerticalItem, path => {
        const item = _get(array, path);

        if (item) {
          item.vertical = true;
        }
      });
    });

    const middleColor = '#7F7F7B';
    const activeIndex = 1;
    const { isMobile } = this.state;

    return (
      <div className={`c-news-page-root ${ isFetched ? '' : 'hide-news' }`}>

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
        <div className="common-page-content-container">
          <div className="news-title-wrapper">
            <NewsTitle title={'Новости'} />
          </div>

          <div className="news-containers">
            <div className="news-containers-inner">
              {
                copyNewsBlockArray.map((newsBlock, idx) => (
                  <NewsContainer
                    key={idx}
                    chunkedNews={newsBlock}
                    lang={lang}
                  />
                ))
              }
            </div>
          </div>
          {
            newsBlockArray.length < totalCount &&
              <div className="add-news-button-container ">
                <AddNewsButton fetchMoreNews={::this.fetchMoreNews} />
              </div>
          }
          <Footer
            isMobile={isMobile}
            lang={lang}
            isPlug={isPlug}
          />

        </div>

      </div>
    );
  }
}
