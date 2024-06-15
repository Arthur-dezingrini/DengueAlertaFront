import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../components/Header";
import DenunciaIndividual from "../components/DenunciaIndividual";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RelatorioDenucias({ navigation }) {
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get(
          "http://10.1.198.26:8080/foco/notificacoes"
        );
        setDenuncias(response.data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchDenuncias();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={"Relatorio de Denuncias"}></Header>

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
  },
});
