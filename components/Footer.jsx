import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomButton from "./CustomButton";
import ResponsiveComponent from "./ResponsiveComponent";

const Footer = ({
  nameIconLeft = "",
  nameIconRight = "",
  texto = "",
  onPress = () => {},
  onPressRight = () => {},
  onPressLeft = () => {},
}) => {
  return (
    <ResponsiveComponent>
      <View style={styles.container}>
        {nameIconLeft && (
          <TouchableOpacity onPress={onPressLeft} style={styles.containerItem}>
            <Icon name={nameIconLeft} style={styles.icon} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomButton title={texto} onPress={onPress} />
        </View>

        {nameIconRight && (
          <TouchableOpacity onPress={onPressRight} style={styles.containerItem}>
            <Icon name={nameIconRight} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </ResponsiveComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F2F2F7",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 0, // Espaçamento na parte inferior
    height: 80, // Altura do footer
    position: 'absolute', // Posição absoluta para fixar na parte inferior
    bottom: 0, // Alinha o footer ao fundo da tela
  },
  icon: {
    fontSize: 25,
    color: "#fff",
  },
  containerItem: {
    backgroundColor: "#C7C7CC",
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

export default Footer;
