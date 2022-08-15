import React from 'react'
import ReactDOM from 'react-dom'
import Util from '../src/index'

function Demo () {
  return (
    <div>
      <div>{ Util.show('韩梅梅') }</div>
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('j-root'))
