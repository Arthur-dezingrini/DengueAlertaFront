import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Footer from '../components/Footer';
import ResponsiveComponent from '../components/ResponsiveComponent';

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
      <ResponsiveComponent>
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
            nameIconRight={'camera'}
            nameIconLeft={'location'}
            texto={'DENÚNCIA'}
            onPress={() => navigation.navigate('Denuncia')}
          />
        </View>
      </ResponsiveComponent>
    );
  }

  return (
    <ResponsiveComponent>
      <View style={styles.container}>
        <Header
          title="My App"
          mostrarDocs={true}
          iconLeft={'menu'}
          mostrarMenu={true}
          funcao={() => navigation.navigate('RelatorioDenuncia')}
          funcaoLeft={() => navigation.navigate('Home')}
        />
        {location ? (
          <View style={styles.mapContainer}>
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
          </View>
        ) : (
          <View style={styles.messageContainer}>
            <Text>Carregando mapa...</Text>
          </View>
        )}
        <Footer
          texto={'DENÚNCIA'}
          onPress={() => navigation.navigate('Denuncia')}
        />
      </View>
    </ResponsiveComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  mapContainer: {
    flexGrow: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
