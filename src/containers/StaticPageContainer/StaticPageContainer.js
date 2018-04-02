if (global.IS_BROWSER) {
  require('./StaticPageContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _throttle from 'lodash/throttle';
import _size from 'lodash/size';
import _pick from 'lodash/pick';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  GlobalActions
} from '../../actions';

import {
  Header,
  SimpleTitle,
  EditorContentContainer,
  Footer
} from '../../components';

import { MOBILE_BREAKPOINT } from '../../constants';

@connect(state => ({
  globalPage: state.GlobalReducer
}), dispatch => ({
  actions: bindActionCreators(GlobalActions, dispatch)
}))
export default class StaticPageContainer extends Component {
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
      const pageId = location.pathname.split('/')[3];
      
      return store.dispatch(GlobalActions.fetchStaticPageData(pageId));
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
    
    if (!_size(this.props.globalPage.staticPageData)) {
      this.props.actions.fetchStaticPageData(this.props.routeParams.pageId);
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
    const nextPageId = nextProps.routeParams.pageId;
    
    if (nextPageId !== this.props.routeParams.pageId) {
      this.props.actions.fetchStaticPageData(nextPageId, () => (window.scrollTo(0, 0)));
    }
  }
  
  componentWillUnmount() {
    this.props.actions.resetStaticPageData();
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
   * Renders 'StaticPageContainer' component
   */
  render() {
    const {
      menuItems,
      staticPageData,
      isPlug
    } = this.props.globalPage;
    
    const simpleTitleObj = _pick(staticPageData, ['title', 'date', 'author']);
    const activeIndex = 1;
    
    const { isMobile } = this.state;
    const { lang } = this.props.globalPage;

    return (
      <div className="c-article-page-root">
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
              needShowDate={false}
              needShowShares={false}
              simpleTitleObj={simpleTitleObj}
              lang={lang}
            />}
        </div>
        <EditorContentContainer htmlContent={staticPageData.html} />
        <Footer
          isPlug={isPlug}
          isMobile={isMobile}
          lang={lang}
        />
      </div>
    );
  }
}

const middleColor = '#7F7F7B';
