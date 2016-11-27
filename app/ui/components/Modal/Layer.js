/**
* Layer
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Styles
import styles from './Modal.scss';

class Layer extends React.PureComponent {
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

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
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
    const { children, isOpen, onRequestClose, pathname } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component="div"
        aria-hidden={!isOpen}
      >
        {isOpen && [
          <div className={styles.obfuscator} key="overlay" />,
          <ReactCSSTransitionGroup
            transitionName={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              leave: styles.leave,
              leaveActive: styles.leaveActive,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            component="div"
            key={pathname}
          >
            {React.cloneElement(children, {
              isModal: true,
              onRequestClose,
              key: pathname,
            })}
          </ReactCSSTransitionGroup>,
        ]}
      </ReactCSSTransitionGroup>
    );
  }
}

Layer.propTypes = {
  children: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  pathname: React.PropTypes.string,
};

export default Layer;
