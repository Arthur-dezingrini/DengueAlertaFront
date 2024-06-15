import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/CustomButton';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const olhoFechado = <Icon name='eye-off' size={18} color={'#88888'}></Icon>
    const olhoAberto = <Icon name='eye' size={18} color={'#88888'}></Icon>
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <View style={styles.container}>
        <View>
            <Image
            source={require('../assets/images/Logo.png')}
            style={styles.logo}
            />
        </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputArea}>
          <TextInput 
          placeholder='CPF'
          value={email}
          onChangeText={setEmail}
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
          { showPassword ?  olhoAberto : olhoFechado }
        </TouchableOpacity>
        </View>
      <View
      style={styles.senha}
      >
        <Text
        style={styles.senhaText}
        >
          Esqueceu a Senha? 
        </Text>
      </View>
      </View>
  
      <View style={styles.buttonContainer}>
        <CustomButton
              title="ENTRAR"
              onPress={() => navigation.navigate('Home')}
              textStyle={styles.customButtonText}
            />
      </View>
      <View 
        style={styles.alternativeLoginContainer}>
          <View 
          style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Google.png')}/>         
          </View>
          <View 
          style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Apple.png')}/>         
          </View>
          <View 
          style={styles.alternativeLogin}>
            <Image style={styles.image} source={require('../assets/images/Gov.png')}/>         
          </View>
      </View>
      <View style={styles.registro}>
        <Text>
          Nao tem uma conta?
        </Text>
        <Text style={styles.registroText} onPress={() => navigation.navigate('CadastroUsuario')}>
          Registre-se
        </Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#C7C7CC',
    },
    logo: {
      width: 250,
      height: 250
    },
  
    inputContainer: {
      alignItems: 'center',
      gap: 15,
      width: '100%'
    },
    inputArea: {
      backgroundColor: '#fff', 
      flexDirection: 'row',
      width: '80%',
      alignItems: 'center',
      borderRadius: 16,
    },
    input: {
      color: 'dark',
      borderRadius: 16,
      padding: 16,
      width: '85%',
      backgroundColor: '#fff',
    },
    senha: {
      width: '80%',
      alignItems: 'flex-end',
    },
    senhaText: {
      color: 'blue'
    },
    buttonContainer: {
      width: '50%'
    },
    customButtonText: {
      fontSize: 18, 
      fontWeight: 800
    },
    alternativeLoginContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-around',
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
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      marginBottom: 15
    },
    registroText: {
      color: 'blue'
    },
  });
  