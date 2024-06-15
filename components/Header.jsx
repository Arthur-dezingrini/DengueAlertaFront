import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import ResponsiveComponent from "./ResponsiveComponent";

const Header = ({
  title = "",
  mostrarDocs = false,
  mostrarMenu = false,
  iconLeft,
  funcao = () => {},
  funcaoLeft = () => {},
}) => {
  return (
    <ResponsiveComponent>
      <View style={styles.headerContainer}>
        {mostrarMenu && (
          <TouchableOpacity onPress={funcaoLeft} style={styles.iconContainer}>
            <Icon name={iconLeft} size={30} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          {mostrarDocs && (
            <View style={styles.titleInnerContainer}>
              <Text style={styles.titleText}>Dengue Alerta</Text>
              <Image
                source={require("../assets/images/Logo.png")}
                style={styles.logo}
              />
            </View>
          )}
          {!mostrarDocs && (
            <Text style={styles.titleTextSolo}>{title}</Text>
          )}
        </View>
        {mostrarDocs && (
          <TouchableOpacity onPress={funcao} style={styles.iconContainer}>
            <Icon name="documents" size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ResponsiveComponent>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 0, // Espaçamento na parte inferior
    backgroundColor: "#C7C7CC",
    height: 110, // Definindo uma altura fixa para o cabeçalho
    position: 'absolute', // Posição absoluta para fixar na parte superior
    bottom: 100, // Alinha o cabeçalho ao topo da tela


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
    fontSize: 22,
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
