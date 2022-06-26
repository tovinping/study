import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function AComponent() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  function testClick() {
    dispatch({type: ''})
  }
  return <div>tangwenping{count}<button onClick={testClick}>testClick</button></div>
}