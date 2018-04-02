if (global.IS_BROWSER) {
  require('./ProjectPageContainer.styl'); // eslint-disable-line global-require
}

import InvestorRegistrationPopup
  from '../../components/InvestorRegistrationPopup/InvestorRegistrationPopup';

import { styles } from '../../commonData';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _throttle from 'lodash/throttle';
import _size from 'lodash/size';
import _uniqBy from 'lodash/uniqBy';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import { StickyContainer, Sticky } from 'react-sticky';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  GlobalActions,
  ProjectActions,
} from '../../actions';

/* eslint-disable */
import {
  Header,
  ProjectCard,
  ArticleContent,
  Footer,
  ProjectsExamples,
  ProjectHead,
  Author,
  ProjectTabs,
  ProjectDocuments
} from '../../components';
/* eslint-enable */

import { MOBILE_BREAKPOINT } from '../../constants';

const aboutCardTop = 120;
const similarProject = {
  ru: 'Похожие проекты',
  en: 'Similar projects'
};

@connect(state => ({
  globalPage: state.GlobalReducer,
  projectPage: state.ProjectReducer
}), dispatch => ({
  actions: bindActionCreators(GlobalActions, dispatch),
  projectActions: bindActionCreators(ProjectActions, dispatch)
}))
export default class ProjectPageContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    actions: Type.object,
    testData: Type.object,
    menuItems: Type.array,
    mainPage: Type.object,
    projectPage: Type.object,
    projectActions: Type.object,
    routeParams: Type.object,
    globalPage: Type.object,
    location: Type.object,
    routes: Type.array
  };

  static initialFetchData = [
    ({ store, location, host }) => {
      const lang = location.pathname.split('/')[1];
      const projectId = location.pathname.split('/')[3];
      return store.dispatch(ProjectActions.fetchProject(projectId, host, lang));
    }
  ];

  constructor() {
    super();

    this.isPlug = true;

    this.onWindowResize = _throttle(::this.onWindowResize, 450);

    this.actions = [
      <RaisedButton
        label="Закрыть"
        style={styles.buttonContainer}
        buttonStyle={styles.button}
        overlayStyle={styles.buttonOverlay}
        backgroundColor="#1e9df2"
        labelColor="#ffffff"
        onClick={::this.handleClose}
      />
    ];

    this.state = {
      bottomFixed: false,
      bottomOffset: 0,
      dialogContent: '',
      dialogIsShowing: false,
      dialogTitle: '',
      isMobile: false,
      openRegistrationAsInvestor: false,
      topOffset: 0
    };

    this.anchors = {};

    this.videos = [];
  }

  componentWillMount() {
    if (global.IS_BROWSER) {
      this.props.actions.langSwitch(this.props.routes[1].path, this.props.location.pathname);
    }

    if (!this.props.projectPage.projectArray.length && global.IS_BROWSER) {
      this.props.projectActions.fetchProject(this.props.routeParams.projectId,
           document.location.host, this.props.globalPage.lang);
    }
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);

    // first initial on router redirect
    const intervalId = setInterval(this._isDomLoaded.bind(this, 'aboutCard',
      ::this._calculateProjectCardOffset), 200);

    this.setState({
      intervalId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.projectActions.fetchProject(nextProps.routeParams.projectId,
           document.location.host, nextProps.globalPage.lang);
    }
  }

  componentWillUnmount() {
    this.props.projectActions.unmountProject();

    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    const statePropertiesForUpdate = {};
    ::this._isMobileSetState();

    if (_size(statePropertiesForUpdate)) {
      this.setState(statePropertiesForUpdate);
    }

    if (this.state.isMobile === true) {
      this.setState({
        bottomFixed: false
      });
    }

    this.resizeVideo.call(this);
    this._calculateProjectCardOffset();
  }

  onLangSwitch(lang) {
    this.props.actions.langSwitch(lang, this.props.location.pathname);
  }

  onMenuItemClick(menuItemName) {
    this.props.actions.goToMainPage(menuItemName);
  }

  onClickRegistrationAsInvestor() {
    this.setState({
      openRegistrationAsInvestor: true
    });
  }

  onCloseRegistrationAsInvestor() {
    this.setState({
      openRegistrationAsInvestor: false
    });
  }

  onStickyStateChange(isSticky) {
    ::this._isMobileSetState();
    if (!isSticky) {
      // ToDo --> change 500
      if (document.body.scrollTop >= 500 && !this.state.isMobile) { // if footer - fix to bottom
        // add class
        this.setState({
          bottomFixed: true
        });
      } else {
        this.setState({
          bottomFixed: false
        });
      }
    } else {
      // delete absolute
      this.setState({
        bottomFixed: false
      });
    }
  }

  /**
   * Check and set state for IsMobile
   * @private
   */
  _isMobileSetState() {
    const statePropertiesForUpdate = {};

    if (window.innerWidth < MOBILE_BREAKPOINT && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }

    if (window.innerWidth >= MOBILE_BREAKPOINT && this.state.isMobile === true) {
      statePropertiesForUpdate.isMobile = false;
    }

    if (_size(statePropertiesForUpdate)) {
      this.setState(statePropertiesForUpdate);
    }
  }

  /**
   * Set top & bottom offset for <ProjectCard />
   * Fire on: resize, componentDidMount
   * @private
   */
  _calculateProjectCardOffset() {
    const aboutCardRect = this._getOffset(this.aboutCard);

    // represent @media fontSize coeficient
    const rfs = 16;
    const projectCardHeight = 460;
    const windowWidth = window.innerWidth;

    let coef = 16;
    if (windowWidth < 826) {
      coef = 10 / rfs;
    } else if (windowWidth > 826 && windowWidth < 1141) {
      coef = 12 / rfs;
    } else if (windowWidth > 1142 && windowWidth < 1300) {
      coef = 14 / rfs;
    } else {
      coef = 16 / rfs;
    }

    const topOffset = (-projectCardHeight) * coef - aboutCardTop;
    const bottomOffset = aboutCardRect.height + aboutCardTop + 80 * coef;

    // set height when element render
    this.setState({
      topOffset,
      bottomOffset,
      ...(window.innerWidth < MOBILE_BREAKPOINT
        ? {
          isMobile: true,
        } : null)
    });
  }

  _getOffset(el) {
    const rect = el.getBoundingClientRect();
    return rect;
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

  /*
   * resize video
   */
  resizeVideo() {
    let videos = this.videos;

    // delete empty
    videos = videos.filter((video) => {
      if (!(video === null) && !(video === undefined)) {
        return 1;
      }
      return 0;
    });

    // delete duplicate
    videos = _uniqBy(videos, (e) => e);

    // resize each video
    videos.forEach((video) => {
      const iframe = video.querySelector('iframe');
      iframe.style.height = `${ iframe.clientWidth * (9 / 16) }px`;
    });
  }

  _switchTab(index) {
    this.props.projectActions.switchActiveTab(index);
  }

  /**
   * Run passed mutate func,
   * when DOM element is ready
   *
   * @param fChangeDOM
   * @private
   */
  _isDomLoaded(refString, fChangeDOM) {
    // check if ref work
    if (!this.aboutCard) {
      return;
    }

    const aboutCardRect = this._getOffset(this[refString]);

    // ToDo --> to universal function
    // change check
    if (aboutCardRect.height < 1000) {
      clearInterval(this.state.intervalId);
    }

    // set Offset
    fChangeDOM();
  }

  render() {
    const {
      projectArray,
      isFetched
    } = this.props.projectPage;

    const {
      isDomReady,
      isPlug
    } = this.props.globalPage;

    const {
      setDomReady
    } = this.props.actions;

    const middleColor = '#7F7F7B';

    const head = projectArray.filter((articleItem) => articleItem.type === 'head');
    const aboutCardObj = projectArray.filter((articleItem) => articleItem.type === 'about-card')[0];
    const content = projectArray.filter((articleItem) => articleItem['is-article-content'] !== false);

    const {
      bottomFixed,
      bottomOffset,
      dialogContent,
      dialogIsShowing,
      dialogTitle,
      isMobile,
      topOffset
    } = this.state;

    const { menuItems, lang } = this.props.globalPage;

    return (
      <div className="c-about-page-root" >

        <div
          className="g-header-wrapper"
          style={{ backgroundColor: middleColor }}
        >
          <Header
            menuItems={menuItems}
            isPlug={true}
            onLangSwitch={::this.onLangSwitch}
            middleColor={middleColor}
            onMenuItemClick={::this.onMenuItemClick}
            lang={lang}
            isDomReady={isDomReady}
            setDomReady={setDomReady}
          />
        </div>

        {
          projectArray.length &&
            <div className="common-page-content-container">
              <div className="about-header-wrapper">
                {/*first item - head*/}
                <ProjectHead
                  aboutItemsHead={head[0]}
                  lang={lang}
                  showDialog={::this.showDialog}
                />
              </div>

              <LinearProgress
                mode="indeterminate"
                className={`${ isFetched ? 'hidden' : '' }`}
              />

              <div className={`about-content__container ${ !isFetched ? 'hidden' : '' }`}>
                <div className="left-column">
                  <div className="author-wrapper">
                    <Author
                      aboutItemsHead={head[0]}
                      lang={lang}
                    />
                  </div>

                  {
                    content.map((articleItem, articleItemIndex) => {
                      const articleClass = (articleItem.width === 'full') ? 'g-content-wrapper-full'
                        : 'g-about__content-wrapper';
                      return (
                        <div className={articleClass} key={articleItemIndex} >
                          <ArticleContent articleItem={articleItem} videoRefFunc={video => (this.videos.push(video))} />
                        </div>
                      );
                    })
                  }
                </div>
                <StickyContainer
                  className={`right-column-wrapper ${ bottomFixed ? 'bottom-fixed' : '' }`}
                >

                  <div className="right-column">

                    {/*header + imageHeader - card -top */}
                    <Sticky
                      isActive={!this.state.isMobile}
                      topOffset={topOffset}
                      bottomOffset={bottomOffset}
                      style={{
                        transform: this.state.bottomFixed ? 'none' : 'translateZ(0)'
                      }}
                      stickyClassName={'stickyCard_fixed'}
                      onStickyStateChange={::this.onStickyStateChange}
                    >
                      <ProjectCard
                        aboutCardObj={aboutCardObj}
                        onClickRegistrationAsInvestor={::this.onClickRegistrationAsInvestor}
                        lang={lang}
                        aboutCardRefFunc={(aboutCard) => { this.aboutCard = aboutCard; }}
                      />
                    </Sticky>

                  </div>
                </StickyContainer>

              </div>

              <div
                className="projects-full-inner-wrapper"
                ref={projectsExamples => (this.anchors.projectsExamples = projectsExamples)}
              >
                <ProjectsExamples
                  title={similarProject[lang]}
                  isSubpage={true}
                  lang={lang}
                  showDialog={::this.showDialog}
                />
              </div>

              <Footer
                isPlug={isPlug}
                lang={lang}
                isMobile={isMobile}
              />

            </div>
        }

        <div>
          {
            this.state.openRegistrationAsInvestor &&
              <InvestorRegistrationPopup
                closeRegistration={::this.onCloseRegistrationAsInvestor}
                lang={lang}
              />
          }
        </div>

        <Dialog
          title={dialogTitle}
          actions={this.actions}
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
}
