import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
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
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: "#C7C7CC",
    // height: 100,
    ...Platform.select({
      ios: {
        padding: 16,
      },
      android: {
        padding: 10,
        height: 60,
      },
    }),
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
    fontStyle: "bold",

  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }, 
  iconContainer: {
    padding: 5,
  },
});

export default Header;
