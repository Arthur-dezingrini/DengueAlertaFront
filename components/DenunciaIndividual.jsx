import { Image, View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function DenunciaIndividual({ url, status, endereco}) {
  return (
    <View style={styles.container}>
      <View style={styles.imagemDenun}>
        <Image style={styles.image} source={{ uri: url }}></Image>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.endereco}>
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={{ color: "#181818" }}>{endereco}</Text>
        </View>
        <Text style={{ color: "#181818", marginStart: 7 }}>N°: </Text>
        <Text style={{ color: "#181818", marginStart: 7 }}>Status: {status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    height: 112,
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 16,
    borderBlockEndColor: '#bbb',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: "100%",
    width: 150,
  },
  textContainer: {
    justifyContent: "space-around",
    height: '100%',
    width: '50%'
  },
  endereco: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemDenun: {
    height: '100%',
    width: '50%',
  },

});
