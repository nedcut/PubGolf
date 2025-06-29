import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Course, usePubGolf } from './PubGolfContext';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const { startGame } = usePubGolf();

  const handleStart = () => {
    startGame(course);
    router.push('/game');
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.courseName}>{course.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#F59E0B" />
          <Text style={styles.ratingText}>{course.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>{course.holes} holes</Text>
        <Text style={styles.detailText}>{course.distance}km</Text>
        <Text style={styles.detailText}>{course.duration} min</Text>
        <Text style={styles.detailText}>{course.difficulty}</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start Course</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDE68A',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#CA8A04',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailText: {
    color: '#6b7280',
  },
  startButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 