import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { usePubGolf } from '../components/PubGolfContext';
import ScreenLayout from '../components/ScreenLayout';
import { commonStyles } from '../styles/common';

export default function GameScreen() {
  const router = useRouter();
  const { activeGame, recordScore, endGame, players, advanceHole } = usePubGolf();
  const [sips, setSips] = useState('');
  const [gameComplete, setGameComplete] = useState(false);

  if (!activeGame) {
    router.replace('/');
    return null;
  }

  const { course, scores, currentHole } = activeGame;

  const handleRecordScore = () => {
    if (sips && players.length > 0) {
      const newScores: { [playerId: number]: number } = {};
      players.forEach(player => {
        newScores[player.id] = parseInt(sips);
      });
      recordScore(currentHole, newScores);
      setSips('');
      if (currentHole < course.holes - 1) {
        advanceHole();
      } else {
        setGameComplete(true);
      }
    }
  };

  const getScoreType = (sips: number) => {
    if (sips === 1) return { type: 'Hole in One!', color: '#8B5CF6' };
    if (sips === 2) return { type: 'Eagle', color: '#3B82F6' };
    if (sips === 3) return { type: 'Birdie', color: '#10B981' };
    if (sips === 4) return { type: 'Par', color: '#6B7280' };
    if (sips === 5) return { type: 'Bogey', color: '#F59E0B' };
    if (sips === 6) return { type: 'Double Bogey', color: '#F97316' };
    return { type: `+${sips - 4}`, color: '#EF4444' };
  };

  if (gameComplete) {
    const totalScores = players.map(player => ({
      name: player.name,
      total: Object.values(scores).reduce((sum, hole) => sum + (hole[player.id] || 0), 0)
    })).sort((a, b) => a.total - b.total);
    return (
      <ScreenLayout title="Game Complete!">
        <View style={commonStyles.section}>
          <Text style={styles.sectionTitle}>Final Leaderboard</Text>
          {totalScores.map((player, index) => (
            <View key={player.name} style={[styles.leaderboardItem, index === 0 && styles.leaderboardFirst]}> 
              <Text style={styles.leaderboardName}>{index + 1}. {player.name}</Text>
              <Text style={styles.leaderboardScore}>{player.total}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.newGameBtn}
          onPress={() => {
            endGame();
            router.replace('/');
          }}
        >
          <Text style={styles.newGameBtnText}>New Game</Text>
        </TouchableOpacity>
      </ScreenLayout>
    );
  }

  const pub = course.pubs[currentHole];

  return (
    <ScreenLayout title={`Hole ${currentHole + 1} of ${course.holes}`} onBack={endGame}>
      <View style={commonStyles.section}>
        <Text style={styles.pubName}>{pub.name}</Text>
        <Text style={styles.pubType}>{pub.type}</Text>
        <View style={styles.pubInfoRow}>
          <MaterialIcons name="star" size={16} color="#F59E0B" />
          <Text style={styles.pubInfoText}>{pub.rating}</Text>
          <Text style={styles.pubInfoText}>• {pub.distance}km away</Text>
        </View>
      </View>
      <View style={commonStyles.section}>
        <Text style={styles.sectionTitle}>Record Your Score</Text>
        <TextInput
          value={sips}
          onChangeText={setSips}
          placeholder="Number of sips..."
          keyboardType="numeric"
          style={styles.input}
        />
        {sips ? (
          <View style={[styles.scoreType, { backgroundColor: getScoreType(parseInt(sips)).color + '20' }] }>
            <Text style={[styles.scoreTypeText, { color: getScoreType(parseInt(sips)).color }] }>
              {getScoreType(parseInt(sips)).type}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={handleRecordScore}
          disabled={!sips || parseInt(sips) < 1}
          style={[styles.nextBtn, (!sips || parseInt(sips) < 1) && { opacity: 0.5 }]}
        >
          <Text style={styles.nextBtnText}>{currentHole < course.holes - 1 ? 'Next Hole' : 'Finish Game'}</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(scores).length > 0 && (
        <View style={commonStyles.section}>
          <Text style={styles.sectionTitle}>Scorecard</Text>
          {Object.entries(scores).map(([hole, holeScores]) => (
            <View key={hole} style={styles.scorecardRow}>
              <Text style={styles.scorecardHole}>Hole {parseInt(hole) + 1}</Text>
              <Text style={styles.scorecardSips}>{Object.values(holeScores)[0]} sips</Text>
            </View>
          ))}
        </View>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1f2937' },
  pubName: { fontSize: 18, fontWeight: 'bold', color: '#059669', marginBottom: 4 },
  pubType: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  pubInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pubInfoText: { color: '#6b7280', marginLeft: 4 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8, color: '#1f2937' },
  scoreType: { alignItems: 'center', borderRadius: 8, padding: 8, marginBottom: 8 },
  scoreTypeText: { fontWeight: 'bold', fontSize: 16 },
  nextBtn: { backgroundColor: '#3B82F6', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  nextBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  scorecardRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  scorecardHole: { color: '#1f2937', fontWeight: 'bold' },
  scorecardSips: { color: '#059669', fontWeight: 'bold' },
  leaderboardItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 8, backgroundColor: '#F3F4F6', marginBottom: 8 },
  leaderboardFirst: { backgroundColor: '#FDE68A' },
  leaderboardName: { fontWeight: 'bold', color: '#1f2937' },
  leaderboardScore: { fontWeight: 'bold', color: '#059669' },
  newGameBtn: { margin: 16, backgroundColor: '#059669', borderRadius: 8, padding: 16, alignItems: 'center' },
  newGameBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
}); 