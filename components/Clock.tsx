import React from 'react'
import { Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { Fonts } from '../constants/theme'

interface ClockProps {
  minutes: number
  seconds: number
  format: (n: number) => string
  animatedTimerStyle: any
  isLandscape: boolean
}

export default function Clock({ minutes, seconds, format, animatedTimerStyle, isLandscape }: ClockProps) {
  return (
    <Animated.View style={[{ backgroundColor: "white", paddingVertical: 30, paddingHorizontal: 50, borderRadius: 40, marginBottom: 40, shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }, animatedTimerStyle, isLandscape && { paddingVertical: 20, paddingHorizontal: 40, marginBottom: 0 }]}>
      <Text style={[{ fontSize: 72, fontFamily: Fonts.rounded, fontWeight: "900", color: "#FF9EC6", textAlign: "center" }, isLandscape && { fontSize: 64 }]}>
        {format(minutes)}
        <Text style={{ color: "#FFD1E3" }}>:</Text>
        {format(seconds)}
      </Text>
    </Animated.View>
  )
}