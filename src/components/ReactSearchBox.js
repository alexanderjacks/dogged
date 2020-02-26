import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'

export default class extends Component {

  data = [
    {
      key: 'mary',
      value: 'Mary',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  render() {
    return (
      <ReactSearchBox
        placeholder='test000'
        value='Jacks'
        data={this.data}
        callback={record => console.log(record)}
      />
    )
  }
}

export default ReactSearchBox
