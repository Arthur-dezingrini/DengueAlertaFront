import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import CustomButton from "../components/CustomButton";
import axios from "axios";

export default function CadastroUsuario() {
  const [Nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [Cpf, setCpf] = useState("");
  const [Celular, setCelular] = useState("");
  const [Senha, setSenha] = useState("");
  const [SenhaConfirmation, setSenhaConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const olhoFechado = <Icon name="eye-off" size={18} color={"#88888"}></Icon>;
  const olhoAberto = <Icon name="eye" size={18} color={"#88888"}></Icon>;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const cadastrar = async (e) => {
    e.preventDefault();
    if (Senha != SenhaConfirmation) {
        return
    }

    const cpfInt = parseInt(Cpf);
    const celularInt = parseInt(Celular);

    const usuarioDTO = {
      Nome,
      email,
      Cpf: cpfInt,
      Celular: celularInt,
      Senha
  };

  console.log(usuarioDTO)

  try {
    const response = await axios.post('http://10.1.198.26:8080/usuario/cadastrar', usuarioDTO);
    console.log(response)
    setNome("");
    setEmail("");
    setCpf("");
    setCelular("");
    setSenha("");
    setConfirmarSenha("");
} catch (error) {
    Alert.alert('Error', "alguma coisa deu errada, contate o suporte")
}
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{gap: 25}}>
        <View style={styles.tituloContainer}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          ></Image>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            CADASTRO
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="Nome"
              value={Nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor="#888888"
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#888888"
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="CPF"
              value={Cpf}
              onChangeText={setCpf}
              style={styles.input}
              placeholderTextColor="#888888"
              keyboardType={"number-pad"}
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="Celular"
              value={Celular}
              onChangeText={setCelular}
              style={styles.input}
              placeholderTextColor="#888888"
              keyboardType={"number-pad"}
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="Senha"
              value={Senha}
              onChangeText={setSenha}
              style={styles.input}
              placeholderTextColor="#888888"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={toggleShowPassword}
            >
              {showPassword ? olhoAberto : olhoFechado}
            </TouchableOpacity>
          </View>
          <View style={styles.inputArea}>
            <TextInput
              placeholder="Confirmar Senha"
              value={SenhaConfirmation}
              onChangeText={setSenhaConfirmation}
              style={styles.input}
              placeholderTextColor="#888888"
              secureTextEntry={!showPasswordConfirm}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={toggleShowPasswordConfirm}
            >
              {showPasswordConfirm ? olhoAberto : olhoFechado}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainter}>
        <CustomButton style={styles.btn} title={"Voltar"}></CustomButton>
        <CustomButton onPress={cadastrar} style={styles.btn} title={"Confirmar"}></CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    backgroundColor: "#C7C7CC",
    justifyContent: "space-between",
  },
  logo: {
    height: 100,
    width: 100,
  },
  tituloContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  inputArea: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    borderRadius: 16,
  },
  input: {
    fontSize: 17,
    color: "#515151",
    padding: 10,
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    fontWeight: 510,
  },
  buttonContainter: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  btn: {
    width: "40%",
  },
});
