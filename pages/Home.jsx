import { View, StyleSheet, Text, Alert } from "react-native";
import Header from "../components/Header";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Error",
          "É Necessario a localização para visualizar o mapa"
        );
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="My App"
        mostrarDocs={true}
        iconLeft={"menu"}
        mostrarMenu={true}
        funcao={() => navigation.navigate("RelatorioDenuncia")}
        funcaoLeft={() => navigation.navigate("Home")}
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
        <View>
          <Text>É necessario a localização para visualizar o mapa</Text>
        </View>
      )}
      <Footer
        nameIconRight={"camera"}
        nameIconLeft={"location"}
        texto={"DENÚNCIA"}
        onPress={() => navigation.navigate("Denuncia")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7C7CC',
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "70%",
  },
});
