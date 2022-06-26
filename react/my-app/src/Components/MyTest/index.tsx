import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {info} from '../Dialog'
import AComponent from './A'

export default function MyTest() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  function testClick() {
    dispatch({type: ''})
    info(<AComponent />)
  }
  return <div>tangwenping{count}<button onClick={testClick}>testClick</button></div>
}