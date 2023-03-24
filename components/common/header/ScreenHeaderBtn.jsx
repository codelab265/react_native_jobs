import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl,dimension,handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
       source={iconUrl}
       resizeMode="contain"
       style={styles.btnImg(dimension)}
       />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn