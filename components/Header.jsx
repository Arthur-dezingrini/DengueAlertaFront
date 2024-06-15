import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header({
  title = "",
  mostrarDocs = false,
  mostrarMenu = false,
  iconLeft,
  funcao = () => {},
  funcaoLeft = () => {},
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {mostrarMenu && (
          <View onTouchEnd={funcaoLeft} style={styles.iconContainer}>
            <Icon name={iconLeft} size={40} color="#fff" />
          </View>
        )}
        {mostrarDocs && mostrarMenu ? (
          <View style={styles.titleContainer2}>
            <View>
              <Text style={styles.titleText}>Dengue Alerta</Text>
            </View>
            <View>
              <Image
                source={require("../assets/images/Logo.png")}
                style={styles.logo}
              />
            </View>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <Text style={[styles.titleTextSolo]}>{title}</Text>
          </View>
        )}
        {mostrarDocs && (
          <View onTouchEnd={funcao} style={styles.iconContainer}>
            <Icon name="documents" size={40} color="#fff" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#30B0C7",
    height: "17%",
    width: "100%",
    borderRadius: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
    paddingEnd: 15,
    height: '100%',
    gap: 35,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleContainer2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 8,
  },
  titleText: {
    fontSize: 22,
  },
  titleTextSolo: {
    color: "#fff",
    fontSize: 35,
  },
  logo: {
    width: 60,
    height: 60,
  },
});
