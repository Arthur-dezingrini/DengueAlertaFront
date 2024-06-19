import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomButton from "./CustomButton";

const Footer = ({
  nameIconLeft = "",
  nameIconRight = "",
  texto = "",
  onPress = () => {},
  onPressRight = () => {},
  onPressLeft = () => {},
}) => {
  return (
    <View style={styles.container}>
      {nameIconLeft && (
        <TouchableOpacity onPress={onPressLeft} style={styles.containerItem}>
          <Icon name={nameIconLeft} style={styles.icon} />
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <CustomButton
          style={styles.largebutton}
          title={texto}
          onPress={onPress}
        />
      </View>
      {nameIconRight && (
        <TouchableOpacity onPress={onPressRight} style={styles.containerItem}>
          <Icon name={nameIconRight} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#C7C7CC",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    
  },
  icon: {
    fontSize: 25,
    color: "#fff",
  },
  containerItem: {
    padding: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    
  },
  largebutton: {
    width: "60%",
    height: "auto",
    backgroundColor: "#000",
    borderRadius: 12,
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",

  },
});

export default Footer;
