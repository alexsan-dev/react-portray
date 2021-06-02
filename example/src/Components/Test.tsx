// REACT
import React from 'react'

import Portray, { withStrings } from 'react-portray'

const Test: Portray.FC = ({ $ }) => {
  return (
    <div>
      {$`Hola Mundos`}
      <br />
      {$`Hola Mundos`}
    </div>
  )
}

export default withStrings(Test)
