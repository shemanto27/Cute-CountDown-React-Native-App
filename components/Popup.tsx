import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated'
import { Fonts } from '../constants/theme'

interface PopupProps {
  isFinished: boolean
  resetTimer: () => void
}

export default function Popup({ isFinished, resetTimer }: PopupProps) {
  return (
    <>
      {isFinished && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="absolute inset-0 bg-[rgba(255,158,198,0.4)] justify-center items-center z-1000"
        >
          <Pressable className="flex w-full justify-center items-center flex-1" onPress={resetTimer}>
            <Animated.View entering={ZoomIn.delay(200)} className="w-4/5 bg-white rounded-3xl p-10 items-center" style={{ shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 10 }}>
              <Text style={{ fontSize: 32, fontFamily: Fonts.rounded, fontWeight: "900", color: "#FF9EC6", marginBottom: 20 }}>Time's Up! 🐾</Text>
              <Image
                source={require("../assets/images/cat.jpg")}
                style={{ width: 150, height: 150, marginBottom: 20 }}
              />
              <Text style={{ fontSize: 18, fontFamily: Fonts.rounded, fontWeight: "700", color: "#D9A9A0", textAlign: 'center' }}>Meow! The task is done!</Text>
              <View className="mt-7.5 py-2.5 px-5 bg-[#FFF5F8] rounded-full">
                <Text style={{ fontSize: 14, fontFamily: Fonts.rounded, color: '#FF9EC6', fontWeight: 'bold' }}>Tap anywhere to reset</Text>
              </View>
            </Animated.View>
          </Pressable>
        </Animated.View>
      )}
    </>
  )
}