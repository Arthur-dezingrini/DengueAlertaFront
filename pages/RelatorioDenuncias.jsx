import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import DenunciaIndividual from "../components/DenunciaIndividual";
import Footer from "../components/Footer";
import React, { useEffect, useState, useContext } from "react";
import ResponsiveComponent from "../components/ResponsiveComponent";
import axios from "axios";
import { AuthContext } from "../components/authProvider";


export default function RelatorioDenucias({ navigation }) {
  const [denuncias, setDenuncias] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get(
          "https://denguealertaback-production.up.railway.app/foco/notificacoes", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDenuncias(response.data);
      } catch (error) {}
    };

    fetchDenuncias();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title={'Relatorio de Denuncias'} style={styles.header}></Header>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {denuncias.map((denuncia, index) => (
            <DenunciaIndividual
              key={index}
              url={denuncia.imageUrl}
              endereco={denuncia.endereco}
              status={denuncia.status}
              onPress={() => navigation.navigate("Denuncia", {denuncia})}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  container: {
    width: "100%",
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    
  },
  scrollViewContent: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#000",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }
});
