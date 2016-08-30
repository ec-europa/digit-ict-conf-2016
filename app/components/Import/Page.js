/**
*
* Import/Page
*
*/

import React from 'react';

const Page = ({ success }) => (
  <div>
    <h1>Import</h1>
    <p>
      IMPORT: <br />
      {success ? 'YES' : 'NO'}
    </p>
  </div>
);

Page.propTypes = {
  success: React.PropTypes.bool,
};

export default Page;
