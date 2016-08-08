/**
*
* Snackbar/Layer
*
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Component
import Dialog from './Dialog';

// Styles
import styles from './Snackbar.scss';

class Layer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.latestFocusedElement = null;
  }

  componentDidMount() {
    if (this.props.open) {
      document.addEventListener('keydown', this.handleKeyDown, true);
      this.latestFocusedElement = document.activeElement;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.latestFocusedElement = document.activeElement;
    }
  }

  componentDidUpdate(prevProps) {
    document.removeEventListener('keydown', this.handleKeyDown, true);

    if (this.props.open) {
      document.addEventListener('keydown', this.handleKeyDown, true);
    } else if (prevProps.open && this.latestFocusedElement) {
      // Give focus back to the previously focused element
      this.latestFocusedElement.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown(event) {
    // ESC
    if (event.keyCode === 27) {
      event.stopImmediatePropagation();
      this.props.onRequestClose();
    }
  }

  render() {
    const { open, message } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component="div"
        aria-hidden={open}
      >
        {open ?
          <Dialog key={message} {...this.props} />
          : null}
      </ReactCSSTransitionGroup>
    );
  }
}

Layer.propTypes = {
  onRequestClose: React.PropTypes.func,
  onTriggerAction: React.PropTypes.func,
  open: React.PropTypes.bool,
  message: React.PropTypes.string,
  action: React.PropTypes.object,
};

export default Layer;
