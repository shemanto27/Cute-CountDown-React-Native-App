import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Fonts } from '../constants/theme'

interface ControllerProps {
  isRunning: boolean
  isLandscape: boolean
  addMinute: () => void
  subtractMinute: () => void
  toggleTimer: () => void
  resetTimer: () => void
  animatedButtonStyle: any
}

export default function Controller({ isRunning, isLandscape, addMinute, subtractMinute, toggleTimer, resetTimer, animatedButtonStyle }: ControllerProps) {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  return (
    <View className={`flex flex-1 items-center justify-center ${isLandscape ? 'flex-1 items-center justify-center' : 'items-center'}`}>
      <View className={`flex-row gap-5 items-center ${isLandscape ? 'gap-3.75' : ''}`}>
        <TouchableOpacity
          className={`w-20 h-20 bg-white rounded-full justify-center items-center ${isRunning ? 'opacity-30' : ''}`}
          style={{ shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 }}
          onPress={subtractMinute}
          disabled={isRunning}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 16, fontFamily: Fonts.rounded, fontWeight: "700", color: "#FF9EC6" }}>-1m</Text>
        </TouchableOpacity>

        <AnimatedPressable
          style={[{ paddingVertical: 18, paddingHorizontal: 36, backgroundColor: "#FF9EC6", borderRadius: 30, shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 }, animatedButtonStyle, isLandscape && { paddingVertical: 15, paddingHorizontal: 30 }]}
          onPress={toggleTimer}
        >
          <Text style={[{ fontSize: 20, fontFamily: Fonts.rounded, fontWeight: "900", color: "white", letterSpacing: 1 }, isLandscape && { fontSize: 18 }]}>
            {isRunning ? "PAUSE" : "START"}
          </Text>
        </AnimatedPressable>

        <TouchableOpacity
          className={`w-20 h-20 bg-white rounded-full justify-center items-center ${isRunning ? 'opacity-30' : ''}`}
          style={{ shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 }}
          onPress={addMinute}
          disabled={isRunning}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 16, fontFamily: Fonts.rounded, fontWeight: "700", color: "#FF9EC6" }}>+1m</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={resetTimer} className="mt-7.5 p-2.5" activeOpacity={0.6}>
        <Text style={{ fontSize: 12, fontFamily: Fonts.rounded, fontWeight: "800", color: "#D9A9A0", letterSpacing: 2 }} className="uppercase">RESET TIMER</Text>
      </TouchableOpacity>
    </View>
  )
}