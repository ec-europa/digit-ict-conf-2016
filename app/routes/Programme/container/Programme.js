/*
 *
 * Programme
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toggleEvent, selectAllEvents, selectMyEvents } from '../../../store/modules/events';
import EventsList from '../../../components/Events/List';

import styles from './Programme.scss';

Tabs.setUseDefaultStyles(false);

const Programme = ({ events, myEvents, onToggleEvent }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1>Programme</h1>
    </div>
    <Tabs>
      <TabList className={styles.tabsList}>
        <Tab className={styles.tab}>Agenda</Tab>
        <Tab className={styles.tab}>My schedule</Tab>
      </TabList>
      <TabPanel>
        <EventsList events={events} onToggle={onToggleEvent} />
      </TabPanel>
      <TabPanel>
        <EventsList events={myEvents} onToggle={onToggleEvent} />
      </TabPanel>
    </Tabs>
  </div>
);

Programme.propTypes = {
  events: React.PropTypes.array,
  myEvents: React.PropTypes.array,
  onToggleEvent: React.PropTypes.func,
};

Programme.defaultProps = {
  events: [],
  myEvents: [],
};

function mapStateToProps(state) {
  return {
    events: selectAllEvents(state),
    myEvents: selectMyEvents(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programme);
