import { useAppSelector, useAppDispatch } from './store/hooks';

export default function AComponent() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  function testClick() {
    dispatch({type: ''})
  }
  return <div>tangwenping{count}<button onClick={testClick}>testClick123</button></div>
}