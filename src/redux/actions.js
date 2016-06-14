export function openSpeakerModal(speaker) {
  return {
    type: 'OPEN_MODAL',
    contentType: 'speaker',
    data: speaker,
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL',
  };
}

export function addEvent(event) {
  return {
    type: 'ADD_TO_MY_SCHEDULE',
    event,
  };
}

export function removeEvent(event) {
  return {
    type: 'REMOVE_FROM_MY_SCHEDULE',
    event,
  };
}
