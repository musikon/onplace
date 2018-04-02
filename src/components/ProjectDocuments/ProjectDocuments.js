if (global.IS_BROWSER) {
  require('./ProjectDocuments.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  // PropTypes as Type,
} from 'react';

import DownloadIcon from 'material-ui/svg-icons/editor/publish';
import DocumentTopBar from './DocumentTopBar/DocumentTopBar';

const styleDownloadIcon = {
  color: '#ffffff',
  width: 24,
  transform: 'rotate(180deg)',
  cursor: 'pointer'
};
const documentsFiles = [
  {
    img: '/images/documents/docimg.jpg',
  },
  {
    img: '/images/documents/docimg.jpg',
  },
  {
    img: '/images/documents/docimg.jpg',
  },
  {
    img: '/images/documents/docimg.jpg',
  },
  {
    img: '/images/documents/docimg.jpg',
  },
  {
    img: '/images/documents/docimg.jpg',
  },
];

export default class ProjectDocuments extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  /**
   * Renders 'FixedFooter' component
   */
  render() {
    return (
      <div className="root-about-documents">
        <DocumentTopBar />
        <div className="document-prev">
          {
            documentsFiles.map((file, index) => (
              <div className="file" key={index} >
                <img className="document-img" alt="" src={file.img} />
                <div className="mask">
                  <DownloadIcon className="image" style={styleDownloadIcon} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
