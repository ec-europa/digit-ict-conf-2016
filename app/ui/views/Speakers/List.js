/**
*
* Speakers/List
*
*/

import React from 'react';
import Speaker from '../../../ui/components/Speakers/Speaker';
import styles from './List.scss';

class List extends React.PureComponent {
  render() {
    const { speakers, location } = this.props;
    return (
      <div className={styles.container}>
        {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} location={location} />)}
      </div>
    );
  }
}

List.propTypes = {
  speakers: React.PropTypes.array,
  location: React.PropTypes.object,
};

List.defaultProps = {
  speakers: [],
};

export default List;
