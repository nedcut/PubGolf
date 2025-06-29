import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pub } from './PubGolfContext';

interface PubListItemProps {
  pub: Pub;
  onSelect?: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export default function PubListItem({ pub, onSelect, onRemove, showRemove }: PubListItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.name}>{pub.name}</Text>
        <Text style={styles.type}>{pub.type} • {pub.distance}km</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.rating}>
          <MaterialIcons name="star" size={16} color="#F59E0B" />
          <Text style={styles.ratingText}>{pub.rating}</Text>
        </View>
        {showRemove ? (
          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <MaterialIcons name="close" size={20} color="#EF4444" />
          </TouchableOpacity>
        ) : (
          onSelect && (
            <TouchableOpacity onPress={onSelect} style={styles.selectBtn}>
              <MaterialIcons name="add" size={20} color="#3B82F6" />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  type: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rating: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  ratingText: { marginLeft: 2, color: '#F59E0B', fontWeight: 'bold' },
  selectBtn: { padding: 6, borderRadius: 8, backgroundColor: '#E0F2FE' },
  removeBtn: { padding: 6, borderRadius: 8, backgroundColor: '#FEE2E2' },
}); 