import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import React, {useState, useContext} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../components/authProvider";


// import { SafeAreaView } from "react-native-safe-area-context";

export default function Perfil({ navigation }) {
    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title={'Perfil'} style={styles.header}></Header>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text>Nome: {user.nome}</Text>
                    <Text>Email: {user.email}</Text>
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
    },

    scrollViewContent: {
        alignItems: "center",
        justifyContent: "center",
    },

    header: {
        backgroundColor: "#000",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});