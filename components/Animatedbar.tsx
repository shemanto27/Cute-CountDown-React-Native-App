import React from 'react'
import { Image, View } from 'react-native'
import Animated from 'react-native-reanimated'

interface AnimatedbarProps {
  isLandscape: boolean
  windowWidth: number
  TRACK_WIDTH: number
  animatedCatStyle: any
  CAT_WIDTH: number
}

export default function Animatedbar({ isLandscape, windowWidth, TRACK_WIDTH, animatedCatStyle, CAT_WIDTH }: AnimatedbarProps) {
  return (
    <View className={`justify-center mb-5 ${isLandscape ? `w-[${windowWidth * 0.4}px]` : ''}`} style={{ height: 80, width: isLandscape ? windowWidth * 0.4 : TRACK_WIDTH }}>
      <View className="h-1 bg-[#FFD1E3] rounded w-full absolute" />
      <Animated.View style={[{ width: CAT_WIDTH, height: CAT_WIDTH }, animatedCatStyle]} className="justify-center items-center z-10">
        <Image
          source={require("../assets/images/cat.jpg")}
          style={{ width: 60, height: 60 }}
        />
      </Animated.View>
      <View className="w-3 h-3 rounded-full bg-[#FF9EC6] absolute left-0" />
      <View className="w-3 h-3 rounded-full bg-[#FF9EC6] absolute right-0" />
    </View>
  )
}
