import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { GlobalStyle, Popup } from './components'

const App: React.SFC<{}> = () => (
  <>
    <Popup />
    <GlobalStyle />
  </>
)

ReactDOM.render(<App />, document.getElementById('popup'))
