import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { usePubGolf } from '../components/PubGolfContext';
import CourseCard from '../components/CourseCard';
import { commonStyles } from '../styles/common';
import PlayerModal from '../components/PlayerModal';

export default function HomeScreen() {
  const { courses, players, setPlayers } = usePubGolf();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={commonStyles.container}>
      <PlayerModal
        visible={modalVisible}
        players={players}
        onClose={() => setModalVisible(false)}
        onSave={setPlayers}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Pub Golf</Text>
        <MaterialIcons name="emoji-events" size={32} color="#059669" />
        <Text style={styles.subtitle}>The ultimate drinking game companion</Text>
      </View>
      <View style={styles.buttonGrid}>
        <Link href="/auto-course" asChild>
          <TouchableOpacity style={commonStyles.button}>
            <MaterialIcons name="map" size={32} color="#3B82F6" />
            <Text style={commonStyles.buttonText}>Auto Course</Text>
            <Text style={styles.buttonSubtext}>Generate courses near you</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/manual-course" asChild>
          <TouchableOpacity style={commonStyles.button}>
            <MaterialIcons name="edit" size={32} color="#10B981" />
            <Text style={commonStyles.buttonText}>Create Course</Text>
            <Text style={styles.buttonSubtext}>Build custom routes</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <TouchableOpacity style={styles.managePlayersButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="people" size={24} color="white" />
        <Text style={styles.managePlayersButtonText}>Manage Players</Text>
      </TouchableOpacity>
      <View style={commonStyles.section}>
        <Text style={styles.sectionTitle}>Popular Courses</Text>
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <Text style={styles.emptyText}>No popular courses found. Create one!</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginVertical: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#059669' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 8 },
  buttonGrid: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 24 },
  buttonSubtext: { fontSize: 12, color: '#6b7280', marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#1f2937' },
  emptyText: { textAlign: 'center', color: '#6b7280', fontStyle: 'italic', marginTop: 20 },
  managePlayersButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  managePlayersButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
}); 