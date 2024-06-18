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
          <CustomButton style={styles.largebottom} title={texto} onPress={onPress} />
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
    height: '50', 
    position: 'absolute', 
    bottom: '50',
    paddingBottom: '10',
    paddingTop: 'auto',

  },
  icon: {
    fontSize: 25,
    color: "#fff",
  },
  containerItem: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  largebottom: {
    width: '60%',
    height: 'auto',
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 18,
  },


});

export default Footer;
