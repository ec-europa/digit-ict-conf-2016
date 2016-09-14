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

class Layer extends React.PureComponent {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      document.addEventListener('keydown', this.handleKeyDown, true);
    }
  }

  componentDidUpdate() {
    document.removeEventListener('keydown', this.handleKeyDown, true);

    if (this.props.open) {
      document.addEventListener('keydown', this.handleKeyDown, true);
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
  open: React.PropTypes.bool,
  message: React.PropTypes.string,
};

export default Layer;
