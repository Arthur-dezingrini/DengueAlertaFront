import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('É necessário a localização para visualizar o mapa');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização');
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header
            title="My App"
            mostrarDocs={true}
            iconLeft={'menu'}
            mostrarMenu={true}
            funcao={() => navigation.navigate('RelatorioDenuncia')}
            funcaoLeft={() => navigation.navigate('Home')}
          />
          <View style={styles.messageContainer}>
            <Text>{errorMsg}</Text>
          </View>
          <Footer
            texto={'DENÚNCIA'}
            onPress={() => navigation.navigate('Denuncia')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title="My App"
          mostrarDocs={true}
          iconLeft={'menu'}
          mostrarMenu={true}
          funcao={() => navigation.navigate('RelatorioDenuncia')}
          funcaoLeft={() => navigation.navigate('Perfil')}
        />
        <View style={styles.mapContainer}>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
            />
          ) : (
            <View style={styles.messageContainer}>
              <Text>Carregando mapa</Text>
              <ActivityIndicator />
            </View>
          )}
        </View>
        <Footer
          texto={'Denúncia'}
          onPress={() => navigation.navigate('Denuncia')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C7C7C7',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFF',
  },
  mapContainer: {
    flexGrow: 15,
    // width: '100%',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  
  },
  messageContainer: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
