// REACT
import React from 'react'

import Portray, { usePortray } from 'react-portray'

const Test: Portray.FC = ({ p }) => {
  return <div>{p['Hola mundo']}</div>
}

export default usePortray(Test)
