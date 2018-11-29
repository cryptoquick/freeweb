import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { GlobalStyle, Options } from './components'

const App: React.SFC<{}> = () => (
  <>
    <Options />
    <GlobalStyle />
  </>
)

ReactDOM.render(<App />, document.getElementById('options'))
