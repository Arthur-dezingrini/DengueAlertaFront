import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomButton from "./CustomButton";

export default function Footer({
  nameIconLeft = "",
  nameIconRight = "",
  texto = "",
  onPress = () => {},
  onPressRight = () => {},
  onPressLeft = () => {}
}) {
  return (
    <View style={styles.container}>
      {nameIconLeft && (
        <View onTouchEnd={onPressLeft} style={styles.containerItem}>
          <Icon name={nameIconLeft} style={styles.icon}></Icon>
        </View>
      )}

      <View style={styles.textContainer}>
        <CustomButton title={texto} onPress={onPress}></CustomButton>
      </View>
      {nameIconRight && (
        <View style={styles.containerItem} onTouchEnd={onPressRight}>
          <Icon name={nameIconRight} style={styles.icon}></Icon>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F2F2F7",
    justifyContent: "space-around",
    alignItems: "center",
    height: "13%",
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
    borderRadius: 12,
  },
});
