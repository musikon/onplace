if (global.IS_BROWSER) {
  require('./DocumentTopBar.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  // PropTypes as Type,
} from 'react';

import MenuItem from 'material-ui/MenuItem';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import IconList from 'material-ui/svg-icons/action/list';
import ArrowDownload from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

const styleDownloadIcon = {
  color: '#1e9df2',
  marginLeft: `${ 16 / 16 }rem`,
  marginRight: `${ 24 / 16 }rem`,
  width: ` ${ 24 / 16 }rem `,
  cursor: 'pointer'
};
const styleListIcon = {
  color: '#1e9df2',
  width: ` ${ 24 / 16 }rem `,
  cursor: 'pointer'
};

const DropStyle = {
  width: ` ${ 18 / 16 }rem `,
  marginLeft: ` ${ 3 / 16 }rem `,
};
const DownloadArrowStyle = {
  width: ` ${ 15 / 16 }rem `,
  marginLeft: ` ${ 3 / 16 }rem `,
  opacity: 0.5
};

export default class DocumentTopBar extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      valueSort: 1,
      open: false
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  /**
   * Renders 'CompanyRegistrationPopup' component
   */

  render() {
    return (
      <div className="root-document-top-bar">
        <div className="left-side">
          <div className="drop-down-menu">
            <div
              className="menu"
              onClick={this.handleTouchTap}
            >
              <span className="title-menu">Все</span>
              <ArrowDropDown
                className="menu-icon"
                style={DropStyle}
              />
            </div>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </div>
          <div className="drop-down-menu">
            <div
              className="menu"
              onClick={this.handleTouchTap}
            >
              <span className="title-menu sort">По дате добавления</span>
              <ArrowDownload
                className="menu-icon"
                style={DownloadArrowStyle}
              />
            </div>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </div>
        </div>

        <div className="right-side">
          <IconList className="image" style={styleListIcon} />
          <DownloadIcon className="image" style={styleDownloadIcon} />
        </div>
      </div>
    );
  }
}
