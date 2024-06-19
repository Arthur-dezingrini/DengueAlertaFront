import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import DenunciaIndividual from "../components/DenunciaIndividual";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import ResponsiveComponent from "../components/ResponsiveComponent";
import axios from "axios";

export default function RelatorioDenucias({ navigation }) {
  const [denuncias, setDenuncias] = useState([]);

  // useEffect(() => {
  //   const fetchDenuncias = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://10.1.198.26:8080/foco/notificacoes"
  //       );
  //       setDenuncias(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar imagens:", error);
  //     }
  //   };

  //   fetchDenuncias();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title={'Relatorio de Denuncias'} style={styles.header}></Header>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {denuncias.map((denuncia, index) => (
            <DenunciaIndividual
              key={index}
              url={denuncia.imageUrl}
              endereco={denuncia.endereco}
              status={"teste"}
            ></DenunciaIndividual>
          ))}
        </ScrollView>
        <Footer
          texto="Voltar"
          onPress={() => navigation.navigate("Home")}
        ></Footer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    padding: 16,
    gap: 16,
    width: "100%",
    height: 540,
    flexGrow: 15,
  },
  header: {
    backgroundColor: "#C7C7CC",
    height: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
