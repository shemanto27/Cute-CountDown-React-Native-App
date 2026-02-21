import { useAudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    useWindowDimensions
} from "react-native";
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Animatedbar from "../components/Animatedbar";
import Clock from "../components/Clock";
import Controller from "../components/Controller";
import Popup from "../components/Popup";
import SoundController from "../components/SoundController";

const CAT_WIDTH = 80;
const TRACK_PADDING = 40;

export default function CountdownTimer() {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLandscape = windowWidth > windowHeight;

    const [minutes, setMinutes] = useState(.1);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isFinished, setIsFinished] = useState(false);

    const [totalTime, setTotalTime] = useState(minutes * 60);

    const scale = useSharedValue(1);
    const timerScale = useSharedValue(1);
    const catWalk = useSharedValue(0);
    const catBob = useSharedValue(0);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Load sounds using the correct assets path
    // Note: assets/sounds/tick.mp3 and assets/sounds/meow.mp3 must exist
    const tickPlayer = useAudioPlayer(require("../assets/sounds/tick.mp3"));
    const meowPlayer = useAudioPlayer(require("../assets/sounds/meow.mp3"));

    const TRACK_WIDTH = windowWidth - TRACK_PADDING * 2;
    const currentTimeInSeconds = minutes * 60 + seconds;

    const playTick = useCallback(() => {
        if (isSoundEnabled && tickPlayer) {
            tickPlayer.seekTo(0);
            tickPlayer.play();
        }
    }, [isSoundEnabled, tickPlayer]);

    const playMeow = useCallback(() => {
        if (isSoundEnabled && meowPlayer) {
            meowPlayer.seekTo(0);
            meowPlayer.play();
        }
    }, [isSoundEnabled, meowPlayer]);

    const stopAllSounds = useCallback(() => {
        if (tickPlayer) {
            tickPlayer.pause();
            tickPlayer.seekTo(0);
        }
        if (meowPlayer) {
            meowPlayer.pause();
            meowPlayer.seekTo(0);
        }
    }, [tickPlayer, meowPlayer]);

    // Cat "Walking" animation logic for static PNG
    useEffect(() => {
        if (isRunning) {
            catBob.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 300 }),
                    withTiming(0, { duration: 300 })
                ),
                -1,
                true
            );
        } else {
            catBob.value = withSpring(0);
        }
    }, [isRunning]);

    // Handle progress for the cat
    useEffect(() => {
        if (totalTime > 0) {
            const progress = 1 - (currentTimeInSeconds / totalTime);
            catWalk.value = withTiming(progress, { duration: 500 });
        } else {
            catWalk.value = withTiming(1, { duration: 500 });
        }
    }, [currentTimeInSeconds, totalTime]);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        if (tickPlayer) {
            tickPlayer.pause(); // Correct method for expo-audio
        }
    }, [tickPlayer]);

    const startTimer = useCallback(() => {
        setIsRunning(true);
        setIsFinished(false);
        // Compute remaining time in seconds based on current minutes and seconds
        let remaining = minutes * 60 + seconds;
        intervalRef.current = setInterval(() => {
            if (remaining <= 0) {
                // Time's up: ensure timer stops at zero
                setMinutes(0);
                setSeconds(0);
                stopTimer();
                playMeow();
                setIsFinished(true);
                remaining = 0;
                return;
            }
            remaining -= 1;
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            setMinutes(mins);
            setSeconds(secs);
            playTick();
        }, 1000);
    }, [stopTimer, playTick, playMeow, minutes, seconds]);

    const resetTimer = useCallback(() => {
        stopTimer();
        stopAllSounds();
        setMinutes(minutes);
        setSeconds(0);
        setTotalTime(minutes * 60);
        setIsFinished(false);
        scale.value = withSpring(1);
        timerScale.value = withSpring(1);
        catWalk.value = withTiming(0);
    }, [stopTimer, stopAllSounds]);

    const toggleTimer = () => {
        if (isRunning) {
            stopTimer();
            scale.value = withSpring(1);
        } else {
            if (minutes === 0 && seconds === 0) {
                resetTimer();
                return;
            }
            startTimer();
            scale.value = withRepeat(withSequence(withTiming(1.05), withTiming(1)), -1, true);
        }
    };

    const addMinute = () => {
        if (!isRunning) {
            const newMins = Math.min(minutes + 1, 59);
            setMinutes(newMins);
            setTotalTime(newMins * 60 + seconds);
            timerScale.value = withSequence(withTiming(1.1, { duration: 100 }), withSpring(1));
        }
    };

    const subtractMinute = () => {
        if (!isRunning) {
            const newMins = Math.max(minutes - 1, 0);
            setMinutes(newMins);
            setTotalTime(newMins * 60 + seconds);
            timerScale.value = withSequence(withTiming(0.9, { duration: 100 }), withSpring(1));
        }
    };

    const format = (n: number) => String(n).padStart(2, "0");

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedTimerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: timerScale.value }],
    }));

    const animatedCatStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            catWalk.value,
            [0, 1],
            [0, TRACK_WIDTH - CAT_WIDTH]
        );

        const rotate = interpolate(catBob.value, [0, 1], [0, isRunning ? 10 : 0]);
        const translateY = interpolate(catBob.value, [0, 1], [0, isRunning ? -8 : 0]);

        return {
            transform: [
                { translateX },
                { translateY },
                { rotate: `${rotate}deg` }
            ],
        };
    });

    return (
        <SafeAreaView className="flex flex-1 bg-[#FFF5F8]">
            <SoundController 
              isSoundEnabled={isSoundEnabled}
              onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
            />

            <View className={`flex flex-1 justify-center items-center px-5 ${isLandscape ? 'flex-row justify-around px-10' : ''}`}>

                <View className={`flex flex-1 justify-center items-center ${isLandscape ? 'flex-1 items-center justify-center' : 'items-center'}`}>
                    <Animatedbar 
                      isLandscape={isLandscape}
                      windowWidth={windowWidth}
                      TRACK_WIDTH={TRACK_WIDTH}
                      animatedCatStyle={animatedCatStyle}
                      CAT_WIDTH={CAT_WIDTH}
                    />

                    <Clock 
                      minutes={minutes}
                      seconds={seconds}
                      format={format}
                      animatedTimerStyle={animatedTimerStyle}
                      isLandscape={isLandscape}
                    />
                </View>

                <Controller 
                  isRunning={isRunning}
                  isLandscape={isLandscape}
                  addMinute={addMinute}
                  subtractMinute={subtractMinute}
                  toggleTimer={toggleTimer}
                  resetTimer={resetTimer}
                  animatedButtonStyle={animatedButtonStyle}
                />
            </View>

            <Popup isFinished={isFinished} resetTimer={resetTimer} />
        </SafeAreaView>
    );
}