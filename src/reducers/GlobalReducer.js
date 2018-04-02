import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';

import * as actionTypes from '../constants/GlobalConstants';

const menuItemsVersions = {};

const isPlug = false;

menuItemsVersions.ru = [
  {
    name: 'Проекты',
    type: 'projectsExamples',
    active: false
  },
  {
    name: 'Новости и статьи',
    type: 'news',
    active: false
  },
  {
    name: 'Типы проектов',
    type: 'projectsTypes',
    active: false
  },
  {
    name: 'Как это работает',
    type: 'howItWorks',
    active: false
  },
  {
    name: 'Преимущества',
    type: 'advantages',
    active: false
  },
  {
    name: 'Команда',
    type: 'team',
    active: false
  }
];

menuItemsVersions.en = [
  {
    name: 'Projects',
    type: 'projectsExamples',
    active: false
  },
  {
    name: 'News',
    type: 'news',
    active: false
  },
  {
    name: 'Project types',
    type: 'projectsTypes',
    active: false
  },
  {
    name: 'How it works',
    type: 'howItWorks',
    active: false
  },
  {
    name: 'Advantages',
    type: 'advantages',
    active: false
  },
  {
    name: 'Team',
    type: 'team',
    active: false
  }
];

const initialState = {
  lang: 'ru',
  menuItems: menuItemsVersions.ru,
  mainPageActiveSection: false,
  newsArrayRu: [],
  newsArrayEn: [],
  publicationsRu: [],
  publicationsEn: [],
  staticPageData: {},
  mediaQueryId: 'medium',
  isDomReady: false,
  isPlug
};

export default function GlobalReducer(state = initialState, action) {
  const {
    activeMenuItemIndex,
    lang,
    type,
    mainPageActiveSection,
    isFetched,
    newsArray,
    publicationsLang,
    publications,
    mediaQueryId,
    newsLang,
    staticPageData
  } = action;

  switch (type) {
    case actionTypes.SET_ACTIVE_MENU_ITEM_INDEX: {
      const menuItemsClone = _cloneDeep(state.menuItems);
      const currentActiveMenuItem = _find(menuItemsClone, 'active');

      if (currentActiveMenuItem) {
        currentActiveMenuItem.active = false;
      }

      menuItemsClone[activeMenuItemIndex].active = true;

      return {
        ...state,
        menuItems: menuItemsClone
      };
    }
    case actionTypes.SET_SITE_LANG: {
      return {
        ...state,
        lang,
        menuItems: menuItemsVersions[lang]
      };
    }
    case actionTypes.SET_MAIN_PAGE_SECTION: {
      return {
        ...state,
        mainPageActiveSection
      };
    }
    case actionTypes.SET_MAIN_PAGE_SECTION_TO_FALSE: {
      return {
        ...state,
        mainPageActiveSection
      };
    }
    case actionTypes.GET_ALL_NEWS: {
      return {
        ...state,
        isFetched,
        ...(newsLang === 'ru'
          ? { newsArrayRu: newsArray }
          : { newsArrayEn: newsArray })
      };
    }

    case actionTypes.SET_PUBLICATIONS: {
      return {
        ...state,
        ...(publicationsLang === 'ru'
          ? { publicationsRu: publications }
          : { publicationsEn: publications })
      };
    }
    case actionTypes.SET_MEDIA_QUERY_ID: {
      return {
        ...state,
        mediaQueryId
      };
    }

    case actionTypes.SET_STATIC_PAGE_DATA: {
      return {
        ...state,
        staticPageData
      };
    }
    case actionTypes.SET_DOM_READY: {
      return {
        ...state,
        isDomReady: true
      };
    }

    case actionTypes.RESET_STATIC_PAGE_DATA: {
      return {
        ...state,
        staticPageData: {}
      };
    }

    default:
      return state;
  }
}
