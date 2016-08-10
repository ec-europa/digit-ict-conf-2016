/**
* Layer
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

    // Press on ESC
    if (event.keyCode === 27) {
      event.preventDefault();
      onRequestClose();
    }
  }

  render() {
    const { children, isOpen } = this.props;

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
        {children ?
          <div>
            <div className={styles.obfuscator} />
            {children}
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

Layer.propTypes = {
  children: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

export default Layer;
