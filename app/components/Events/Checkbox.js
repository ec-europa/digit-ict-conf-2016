/**
*
* Events/Checkbox
*
*/

import React from 'react';
import classnames from 'classnames';
import styles from './Checkbox.scss';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { event, onToggle } = this.props;
    return onToggle(event);
  }

  render() {
    const { event, checked, idPrefix } = this.props;

    const checkboxClasses = classnames(
      { [styles.blueItem]: event.color === 'blue' },
      { [styles.yellowItem]: event.color === 'yellow' },
      { [styles.purpleItem]: event.color === 'purple' },
      { [styles.greyItem]: event.color === 'grey' }
    );

    return (
      <div className={checkboxClasses}>
        <input id={idPrefix + event.id} type="checkbox" className={styles.checkbox} checked={checked} onChange={this.toggle} aria-hidden="true" />
        <label htmlFor={idPrefix + event.id} className={styles.label}>
          <span className={styles.unchecked} />
          <span className={styles.checked} />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  event: React.PropTypes.object,
  checked: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  idPrefix: React.PropTypes.string,
};

Checkbox.defaultProps = {
  event: {},
  checked: false,
  idPrefix: '',
};

export default Checkbox;
