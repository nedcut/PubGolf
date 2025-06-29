import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { usePubGolf } from '../components/PubGolfContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function MapScreen() {
  const { samplePubs } = usePubGolf();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      setLoading(false);
    })();
  }, []);

  const initialRegion = {
    latitude: userLocation?.latitude || samplePubs[0]?.latitude || 51.5074,
    longitude: userLocation?.longitude || samplePubs[0]?.longitude || -0.1278,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#059669" /></View>;
  }

  if (errorMsg) {
    return <View style={styles.center}><Text>{errorMsg}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={!!userLocation}>
        {samplePubs.map(pub => (
          <Marker
            key={pub.id}
            coordinate={{ latitude: pub.latitude, longitude: pub.longitude }}
            title={pub.name}
            description={pub.type}
          >
            <MaterialIcons name="local-bar" size={32} color="#059669" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}); 