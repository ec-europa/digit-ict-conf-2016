import MyDigitec from './MyDigitec';

export default function createRoute(path = 'my-digitec') {
  return {
    path,
    component: MyDigitec,
  };
}
