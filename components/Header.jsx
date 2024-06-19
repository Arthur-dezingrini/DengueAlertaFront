import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const Header = ({
  title = "",
  mostrarDocs = false,
  mostrarMenu = false,
  iconLeft,
  funcao = () => {},
  funcaoLeft = () => {},
}) => {
  return (
    <View style={styles.headerContainer}>
      {mostrarMenu && (
        <TouchableOpacity onPress={funcaoLeft} style={styles.iconContainer}>
          <Icon name={iconLeft} size={30} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        {mostrarDocs ? (
          <View style={styles.titleInnerContainer}>
            <Text style={styles.titleText}>Dengue Alerta</Text>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
            />
          </View>
        ) : (
          <Text style={styles.titleTextSolo}>{title}</Text>
        )}
      </View>
      {mostrarDocs && (
        <TouchableOpacity onPress={funcao} style={styles.iconContainer}>
          <Icon name="documents" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#C7C7CC",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 80,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  titleText: {
    fontSize: 18,
    marginRight: 10,
  },
  titleTextSolo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  iconContainer: {
    padding: 12,
  },
  icon: {
    fontSize: 25,
    color: "#fff",
  },
});

export default Header;
