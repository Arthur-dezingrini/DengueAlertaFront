import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ResponsiveComponent from '../components/ResponsiveComponent';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AuthContext } from '../components/authProvider';

const Login = ({ navigation }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const olhoFechado = <Icon name='eye-off' size={18} color={'#88888'} />;
  const olhoAberto = <Icon name='eye' size={18} color={'#88888'} />;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const logar = async () => {
    const loginDTO = {
      cpf: parseInt(cpf),
      senha: password,
    };

    try {
      const response = await axios.post(
        'http://denguealertaback-production.up.railway.app/usuario/login',
        loginDTO
      );
      if (response.status === 200) {
        console.log(response.data)
        login(response.data.accessToken, response.data.userData);
        navigation.navigate('Home')
      } else {
        Alert.alert("Ops!", "Usuario ou senha incorretos, tente novamente")
      }
    } catch (error) {
      Alert.alert("Ops", error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <View style={styles.inputArea}>
            <TextInput
              placeholder='CPF'
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              keyboardType={'number-pad'}
              placeholderTextColor="#888888"
              maxLength={11}
            />
          </View>

          <View style={styles.inputArea}>
            <TextInput
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              keyboardType={'default'}
              placeholderTextColor="#888888"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.button} onPress={toggleShowPassword}>
              {showPassword ? olhoAberto : olhoFechado}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
            <Text style={styles.senhaText}>Esqueceu a Senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="ENTRAR"
            onPress={logar}
            textStyle={styles.customButtonText}
          />
        </View>

        <View style={styles.alternativeLoginContainer}>
          <View style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Google.png')} />
          </View>
          <View style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Apple.png')} />
          </View>
          <View style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Gov.png')} />
          </View>
        </View>

        <View style={styles.registro}>
          <Text>Não tem uma conta?</Text>
          <Text style={styles.registroText} onPress={() => navigation.navigate('CadastroUsuario')}>
            Registre-se
          </Text>
        </View>
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#C7C7CC',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputContainer: {
    alignItems: 'center',
    width: '80%',
    marginTop: 30,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: 'black',
    padding: 16,
  },
  button: {
    padding: 10,
  },
  senhaText: {
    color: 'blue',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: '800',
  },
  alternativeLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  alternativeLogin: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
  registro: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registroText: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default Login;
