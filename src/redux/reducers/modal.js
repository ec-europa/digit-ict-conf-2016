export default function modal(state = {}, action) {

  console.log(action);

  switch (action.type) {
    case 'INIT':
      return {
        open: false,
        contentType: null,
        data: null,
      };
    case 'OPEN_MODAL':
      return {
        open: true,
        contentType: action.contentType,
        data: action.data,
      };
    case 'CLOSE_MODAL':
      return {
        open: false,
        contentType: null,
        data: null,
      };
    default:
      return state;
  }
}
