/**
*
* Export/Modal
*
*/

import React from 'react';

// Components
import Dialog from '../Modal/Dialog';

const Modal = ({ onRequestClose, url }) => (
  <Dialog
    id="export"
    title="Export"
    description="This modal lets you export your data."
    onRequestClose={onRequestClose}
  >
    EXPORT:
    <img src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=${url}`} alt="QR Code" />
    <a href={decodeURI(url)}>open</a>
  </Dialog>
);

Modal.propTypes = {
  onRequestClose: React.PropTypes.func,
  url: React.PropTypes.string,
};

export default Modal;
