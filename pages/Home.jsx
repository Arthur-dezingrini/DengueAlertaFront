import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from "../components/authProvider";
import axios from 'axios';


export default function Home({ navigation }) {
  const { user, token } = useContext(AuthContext);

  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [denuncias, setDenuncias] = useState(null);

  const fetchDenuncias = async () => {
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

      try {        
        const response = await axios.get(`https://denguealertaback-production.up.railway.app/foco/notificacoes?id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDenuncias(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro ao carregar denúncias", error.message);
      }

    }


  useFocusEffect(
    React.useCallback(() => {
      fetchDenuncias();
    }, [])
  );

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
            >
              {denuncias && denuncias.map((denuncia, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: denuncia.latitude,
                    longitude: denuncia.longitude,
                  }}
                  title={denuncia.endereco}
                  description={denuncia.descricao}
                />
              ))}
            </MapView>
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
