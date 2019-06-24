import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const Parent = (props) => {
  const textColor = 'red'

  return (
    <SafeAreaView>
      
      {props.children(textColor)}
    </SafeAreaView>
  )
}

export default Parent
