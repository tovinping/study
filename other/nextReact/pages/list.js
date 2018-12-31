import React, {Component} from 'react'
import axios from 'axios'
import '../style/index.sass'
export default class List extends Component {
  static async getInitialProps() {
    let res = await axios.get('https://m.douban.com/rexxar/api/v2/muzzy/columns/10008/items?start=0&count=3')
    console.log(res.data.items)
    return { movies: res.data.items}
  }
  render() {
    console.log('rended')
    return (
      <ul className="list">
        {
          this.props.movies.map(item=>{
          return <li key={item.title}>
          <h2>{item.title}</h2>
          <img src={item.cover} />
          </li>
        })
        }
      </ul>
    )
  }
}