import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmation, setSenhaConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const olhoFechado = <Icon name="eye-off" size={18} color="#888888" />;
  const olhoAberto = <Icon name="eye" size={18} color="#888888" />;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const cadastrar = async () => {
    if (senha !== senhaConfirmation) {
      Alert.alert('Erro', 'As senhas não coincidem. Por favor, verifique.');
      return;
    }

    const usuarioDTO = {
      nome,
      email,
      cpf: parseInt(cpf),
      celular: parseInt(celular),
      senha,
    };

    try {
      const response = await axios.post(
        'http://10.1.198.26:8080/usuario/cadastrar',
        usuarioDTO
      );
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setCpf('');
        setCelular('');
        setSenha('');
        setSenhaConfirmation('');
      } else {
        Alert.alert(
          'Erro',
          'Algo deu errado. Por favor, contate o suporte.'
        );
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Algo deu errado. Por favor, contate o suporte.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.innerContainer}>
            <View style={styles.tituloContainer}>
              <Image
                source={require('../assets/images/Logo.png')}
                style={styles.logo}
              />
              <Text style={styles.titulo}>CADASTRO</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputArea}>
                <TextInput
                  placeholder="Nome"
                  value={nome}
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
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  placeholder="CPF"
                  value={cpf}
                  onChangeText={setCpf}
                  style={styles.input}
                  placeholderTextColor="#888888"
                  keyboardType="numeric"
                  maxLength={11}
                />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  placeholder="Celular"
                  value={celular}
                  onChangeText={setCelular}
                  style={styles.input}
                  placeholderTextColor="#888888"
                  keyboardType="numeric"
                  maxLength={11}
                />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  placeholder="Senha"
                  value={senha}
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
                  value={senhaConfirmation}
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
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Voltar"
          onPress={() => navigation.goBack()}
          style={styles.btn}
          />
        <CustomButton
          onPress={cadastrar}
          title="Confirmar"
          style={styles.btn}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#C7C7CC',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 70, // Espaço para o footer
  },
  innerContainer: {
    gap: 25,
    paddingHorizontal: 16,
  },
  logo: {
    height: 100,
    width: 100,
  },
  tituloContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  inputContainer: {
    alignItems: 'center',
    gap: 0,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#515151',
    padding: 10,
  },
  button: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#c7c7cc',
    borderTopWidth: 1,
    borderTopColor: '#c7c7cc',
  },
  btn: {
    width: '40%',
    margin: 5,
  },
});

