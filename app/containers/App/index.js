/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Drawer from 'components/Drawer';

import { Layout, Content } from 'react-mdl';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <Layout fixedHeader className="mdl-layout--no-desktop-drawer-button">
        <Header />
        <Drawer />
        <Content>
          {this.props.children}
          <Footer />
        </Content>
      </Layout>
    );
  }
}
