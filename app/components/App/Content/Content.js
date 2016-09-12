/**
* Content
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './Content.scss';

const Content = ({ children, contentKey }) => (
  <ReactCSSTransitionGroup
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive,
    }}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={10}
    component="main"
    className={styles.container}
  >
    <div key={contentKey}>
      {children}
    </div>
  </ReactCSSTransitionGroup>
);

Content.propTypes = {
  children: React.PropTypes.node,
  contentKey: React.PropTypes.string,
};

export default Content;
