import { StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View style={styles.headerImage}>
          <Text style={styles.headerText}>About the App</Text>
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About this App</ThemedText>
      </ThemedView>
      
      <ThemedText>
        This app is a simple stopwatch to help you track time efficiently.
      </ThemedText>
      
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText type="subtitle">Features:</ThemedText>
        <ThemedText>- Start, Pause, and Reset</ThemedText>
        <ThemedText>- Lap times</ThemedText>
        <ThemedText>- Clear lap history</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">How to Use:</ThemedText>
        <ThemedText>
          Simply press "Start" to begin timing, "Pause" to pause the timer, and "Lap" to record lap times.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText type="subtitle">Created by:</ThemedText>
        <ThemedText>- Malashree Dhungel</ThemedText>
        <ThemedText>- Ivey Winckler</ThemedText>
      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    position: 'absolute',
    bottom: -90,
    left: -35,
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 10,
  },
  infoContainer: {
    marginTop: 10,
    padding: 10,
  },
});
