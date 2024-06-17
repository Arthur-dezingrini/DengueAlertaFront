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
    backgroundColor: "#C7C7CC",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80, 
    position: 'absolute', 
    bottom: 0, 
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
