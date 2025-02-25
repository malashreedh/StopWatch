import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const App = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number>(0); // Track time from last lap
  const countRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
    setLaps([]);
    setLastLapTime(0); // Reset last lap time
  };

  const handleLap = () => {
    const lapTime = timer - lastLapTime; // Calculate lap time
    setLaps((prevLaps) => [...prevLaps, lapTime]); // Store lap time
    setLastLapTime(timer); // Update last lap time
  };

  const handleClearLaps = () => {
    setLaps([]);
    setLastLapTime(0); // Clear last lap time
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderLapItem = ({ item }: { item: number }) => (
    <View style={styles.lapItem}>
      <Text style={styles.lapText}>{formatTime(item)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stopwatch</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {!isActive && !isPaused ? (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handlePause}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Lap button */}
        <TouchableOpacity style={styles.button} onPress={handleLap}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        {/* Clear laps button */}
        <TouchableOpacity style={styles.button} onPress={handleClearLaps}>
          <Text style={styles.buttonText}>Clear Laps</Text>
        </TouchableOpacity>
      </View>

      {/* Display lap times */}
      {laps.length > 0 && (
        <View style={styles.lapContainer}>
          <Text style={styles.lapHeader}>Laps:</Text>
          <FlatList
            data={laps}
            renderItem={renderLapItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    borderWidth: 4,
    borderColor: 'black',
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 50,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  lapContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  lapHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lapItem: {
    marginVertical: 5,
  },
  lapText: {
    fontSize: 18,
    color: 'black',
  },
});

export default App;
