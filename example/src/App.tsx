import React from 'react'
import Test from './Components/Test'

import Strings from './Lang/Strings.json'
import { withPortray } from 'react-portray'

const App = () => {
  return <Test />
}

export default withPortray(App, Strings, {
  mainLang: 'es',
  langs: ['en', 'es']
})
