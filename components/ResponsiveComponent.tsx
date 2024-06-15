import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';

const ResponsiveComponent = ({children}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onChange);

    // Retorno de useEffect para limpar o listener quando o componente for desmontado
    return () => {
      // Não é necessário remover explicitamente o listener em React Native
      // Dimensions.removeEventListener('change', onChange);
    };
  }, []); // Passando um array vazio para garantir que o useEffect execute apenas uma vez

  if (!dimensions) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const { width, height } = dimensions;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { width, height }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});

export default ResponsiveComponent;
