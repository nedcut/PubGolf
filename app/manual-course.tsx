import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { usePubGolf, Pub } from '../components/PubGolfContext';
import PubListItem from '../components/PubListItem';
import ScreenLayout from '../components/ScreenLayout';
import { commonStyles } from '../styles/common';

export default function ManualCourseScreen() {
  const router = useRouter();
  const { samplePubs, createCourse } = usePubGolf();
  const [courseName, setCourseName] = useState('');
  const [selectedPubs, setSelectedPubs] = useState<Pub[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPubs = samplePubs.filter(pub =>
    pub.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedPubs.find(selected => selected.id === pub.id)
  );

  const addPub = (pub: Pub) => setSelectedPubs([...selectedPubs, pub]);
  const removePub = (pubId: number) => setSelectedPubs(selectedPubs.filter(pub => pub.id !== pubId));

  const saveCourse = () => {
    if (courseName && selectedPubs.length >= 3) {
      createCourse({
        name: courseName,
        holes: selectedPubs.length,
        pubs: selectedPubs,
        distance: Math.max(...selectedPubs.map(p => p.distance)),
        duration: selectedPubs.length * 20,
        difficulty: selectedPubs.length <= 6 ? 'Easy' : selectedPubs.length <= 12 ? 'Medium' : 'Hard',
        rating: 4.0
      });
      router.back();
    }
  };

  return (
    <ScreenLayout title="Create Custom Course">
      <View style={commonStyles.section}>
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          value={courseName}
          onChangeText={setCourseName}
          placeholder="Enter course name..."
          style={styles.input}
        />
      </View>
      <View style={commonStyles.section}>
        <Text style={styles.sectionTitle}>Search Pubs ({selectedPubs.length} selected)</Text>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search for pubs..."
          style={styles.input}
        />
        <View style={{ marginTop: 12 }}>
          {filteredPubs.map(pub => (
            <PubListItem key={pub.id} pub={pub} onSelect={() => addPub(pub)} />
          ))}
        </View>
      </View>
      {selectedPubs.length > 0 && (
        <View style={commonStyles.section}>
          <Text style={styles.sectionTitle}>Course Holes</Text>
          {selectedPubs.map((pub, index) => (
            <PubListItem
              key={pub.id}
              pub={pub}
              showRemove
              onRemove={() => removePub(pub.id)}
            />
          ))}
        </View>
      )}
      <TouchableOpacity
        onPress={saveCourse}
        disabled={!courseName || selectedPubs.length < 3}
        style={[styles.saveBtn, (!courseName || selectedPubs.length < 3) && { opacity: 0.5 }]}
      >
        <Text style={styles.saveBtnText}>Save Course ({selectedPubs.length} holes)</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1f2937' },
  label: { fontSize: 14, color: '#374151', marginBottom: 8 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8, color: '#1f2937' },
  saveBtn: { margin: 16, backgroundColor: '#059669', borderRadius: 8, padding: 16, alignItems: 'center' },
  saveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
}); 