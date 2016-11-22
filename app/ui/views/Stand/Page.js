/**
*
* Speakers/Page
*
*/

import React from 'react';

// Styles
import styles from './Page.scss';

class Page extends React.PureComponent {
  render() {
    const { stand } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={stand.visual}
            alt={stand.title}
            className={styles.headerPicture}
          />
          <div className={styles.headerTitles}>
            <h3><span className={styles.number}>{stand.number}</span> {stand.title}</h3>
            <h4 className={styles.title}>{stand.subtitle}</h4>
          </div>
        </div>
        <div className={styles.description}>
          {stand.description.map((line, index) => (<p key={index} dangerouslySetInnerHTML={{ __html: line }} />))}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  stand: React.PropTypes.object,
};

Page.defaultProps = {
  stand: {},
};

export default Page;
