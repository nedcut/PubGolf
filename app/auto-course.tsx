import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { usePubGolf, Course } from '../components/PubGolfContext';
import PubListItem from '../components/PubListItem';
import ScreenLayout from '../components/ScreenLayout';
import { commonStyles } from '../styles/common';

export default function AutoCourseScreen() {
  const router = useRouter();
  const { samplePubs, startGame } = usePubGolf();
  const [selectedHoles, setSelectedHoles] = useState(9);
  const [selectedDistance, setSelectedDistance] = useState(2);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCourse = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const selectedPubs = samplePubs
        .filter(pub => pub.distance <= selectedDistance)
        .slice(0, selectedHoles);
      setGeneratedCourse({
        id: Date.now(),
        name: `Auto Course (${selectedHoles})`,
        holes: selectedHoles,
        distance: selectedDistance,
        pubs: selectedPubs,
        duration: selectedHoles * 20,
        difficulty: selectedHoles <= 6 ? 'Easy' : selectedHoles <= 12 ? 'Medium' : 'Hard',
        rating: 4.0
      });
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <ScreenLayout title="Auto Generate Course">
      <View style={commonStyles.section}>
        <Text style={styles.sectionTitle}>Course Settings</Text>
        <View style={styles.row}>
          {[6, 9, 12].map(holes => (
            <TouchableOpacity
              key={holes}
              onPress={() => setSelectedHoles(holes)}
              style={[styles.holesBtn, selectedHoles === holes && styles.holesBtnActive]}
            >
              <Text style={selectedHoles === holes ? styles.holesBtnTextActive : styles.holesBtnText}>{holes} holes</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Max Distance: {selectedDistance}km</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={selectedDistance}
            onValueChange={setSelectedDistance}
            minimumTrackTintColor="#059669"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#059669"
          />
        </View>
        <TouchableOpacity
          onPress={generateCourse}
          disabled={isGenerating}
          style={[styles.generateBtn, isGenerating && { opacity: 0.5 }]}
        >
          <Text style={styles.generateBtnText}>{isGenerating ? 'Generating...' : 'Generate Course'}</Text>
        </TouchableOpacity>
      </View>
      {generatedCourse && (
        <View style={commonStyles.section}>
          <Text style={styles.sectionTitle}>Generated Course</Text>
          {generatedCourse.pubs.map((pub: any) => (
            <PubListItem key={pub.id} pub={pub} />
          ))}
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              startGame(generatedCourse);
              router.push('/game');
            }}
          >
            <Text style={styles.startBtnText}>Start This Course</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1f2937' },
  row: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  holesBtn: { padding: 10, borderRadius: 8, backgroundColor: '#E5E7EB', marginRight: 8 },
  holesBtnActive: { backgroundColor: '#3B82F6' },
  holesBtnText: { color: '#1f2937', fontWeight: 'bold' },
  holesBtnTextActive: { color: 'white', fontWeight: 'bold' },
  label: { fontSize: 14, color: '#374151', marginBottom: 8 },
  distBtn: { padding: 10, borderRadius: 8, backgroundColor: '#E5E7EB', marginRight: 8 },
  distBtnActive: { backgroundColor: '#059669' },
  distBtnText: { color: '#1f2937', fontWeight: 'bold' },
  distBtnTextActive: { color: 'white', fontWeight: 'bold' },
  generateBtn: { marginTop: 20, backgroundColor: '#3B82F6', borderRadius: 8, padding: 14, alignItems: 'center' },
  generateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  startBtn: { marginTop: 20, backgroundColor: '#059669', borderRadius: 8, padding: 14, alignItems: 'center' },
  startBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
}); 