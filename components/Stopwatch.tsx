import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [running, setRunning] = useState<boolean>(false); // Stopwatch running state
  const [laps, setLaps] = useState<number[]>([]); // Array to store lap times

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval); // Cleanup on unmount
    };
  }, [running]);

  const handleStartPause = (): void => setRunning(!running);
  const handleStop = (): void => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = (): void => setLaps([...laps, time]);
  const handleClearLaps = (): void => setLaps([]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}s</Text>
      <Button title={running ? 'Pause' : 'Start'} onPress={handleStartPause} />
      <Button title="Stop" onPress={handleStop} />
      <Button title="Lap" onPress={handleLap} />
      <Button title="Clear Laps" onPress={handleClearLaps} />
      <Text style={styles.lapTitle}>Laps:</Text>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapTime}>{lap}s</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  lapTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  lapTime: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default Stopwatch;
