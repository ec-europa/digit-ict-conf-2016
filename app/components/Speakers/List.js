/**
*
* Speakers/List
*
*/

import React from 'react';
import Speaker from './Speaker';

const List = ({ speakers }) => (
  <div className="mdl-grid ict-max-width-900">
    {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} />)}
  </div>
);

List.propTypes = {
  speakers: React.PropTypes.array,
};

List.defaultProps = {
  speakers: [],
};

export default List;
