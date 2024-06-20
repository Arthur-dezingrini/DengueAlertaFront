import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function EsqueceuSenha({ navigation }) {
    const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title={'Esqueceu a senha'} style={styles.header}></Header>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text>Email: {email}</Text>
                </ScrollView>
                <Footer
                    texto="Voltar"
                    onPress={() => navigation.navigate("Login")}
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