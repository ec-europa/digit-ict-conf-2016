/**
* Layer
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Component
import Dialog from './Dialog';

// Styles
import styles from './Modal.scss';

class Layer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.latestFocusedElement = null;
  }

  componentDidMount() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.latestFocusedElement = document.activeElement;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.latestFocusedElement = document.activeElement;
    }
  }

  componentDidUpdate(prevProps) {
    document.removeEventListener('keydown', this.handleKeyDown);

    if (this.props.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
    } else if (prevProps.isOpen && this.latestFocusedElement) {
      // Give focus back to the previously focused element
      this.latestFocusedElement.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { onRequestClose } = this.props;

    if (event.keyCode === 27) {
      // Press on ESC
      event.preventDefault();
      onRequestClose();
    }
  }

  render() {
    const { children, pathname, isOpen, onRequestClose } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        component="div"
        aria-hidden={!isOpen}
      >
        {isOpen ?
          <div>
            <div className={styles.obfuscator} />
            <ReactCSSTransitionGroup
              transitionName={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                leave: styles.leave,
                leaveActive: styles.leaveActive,
              }}
              transitionEnterTimeout={400}
              transitionLeaveTimeout={400}
              component="div"
            >
              <Dialog onRequestClose={onRequestClose} key={pathname}>{children}</Dialog>
            </ReactCSSTransitionGroup>
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

Layer.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

export default Layer;
