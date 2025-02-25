import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Stopwatch from './components/Stopwatch'; // Import Stopwatch component

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stopwatch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
