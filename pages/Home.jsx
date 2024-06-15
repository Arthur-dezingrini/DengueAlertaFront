import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
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
            <Text>Carregando mapa...</Text>
          </View>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF', // Cor de fundo do container principal
  },
  map: {
    width: '100%',
    height: '70%', // Mapa ocupando 70% da altura disponível
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
