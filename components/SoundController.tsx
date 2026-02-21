import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface SoundControllerProps {
  isSoundEnabled: boolean
  onToggleSound: () => void
}

export default function SoundController({ isSoundEnabled, onToggleSound }: SoundControllerProps) {
  return (
    <TouchableOpacity
      className="absolute top-12 right-7 z-100 p-2.5 bg-white rounded-full shadow-lg"
      style={{ shadowColor: "#FF9EC6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 }}
      onPress={onToggleSound}
    >
      <Ionicons
        name={isSoundEnabled ? "volume-high" : "volume-mute"}
        size={28}
        color="#FF9EC6"
      />
    </TouchableOpacity>
  )
}
