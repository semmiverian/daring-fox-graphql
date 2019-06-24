import React from 'react'
import { View, Text } from 'react-native'
import Parent from './Parent'

const Children = () => {
  return (
    <Parent>
      {
        (textColor) => <Text style={{color: textColor}}> Aloha</Text>
      }
    </Parent>
  )
}

export default Children
