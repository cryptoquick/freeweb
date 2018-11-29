import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { GlobalStyle, Index } from './components'

const App: React.SFC<{}> = () => (
  <>
    <Index />
    <GlobalStyle />
  </>
)

ReactDOM.render(<App />, document.getElementById('index'))
