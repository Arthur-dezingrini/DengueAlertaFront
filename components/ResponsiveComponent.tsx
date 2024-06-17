import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

const ResponsiveComponent = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => {};
  }, []);

  if (!dimensions) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const { width, height } = dimensions;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { width, height }]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#C7C7CC',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ResponsiveComponent;
