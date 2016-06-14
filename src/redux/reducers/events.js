export default function events(state = [], action) {

  console.log(action);

  switch (action.type) {
    case 'INIT':
      return [];
    case 'ADD_TO_MY_SCHEDULE':
      return [...state, action.event];
    case 'REMOVE_FROM_MY_SCHEDULE':
      return state.filter(i => i !== action.event);
    default:
      return state;
  }
}
