import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  Platform,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import LoadingModal from '../components/ModalLoading'

export default function Denuncia({ navigation }) {
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [checkedLocal, setCheckedLocal] = useState(false);
  const [checkedAnonimo, setCheckedAnonimo] = useState(false);
  const [permissionCamera, setPermissionCamera] = useState(null);
  const [permissionGalery, setPermissionGalery] = useState(null);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermissionCamera(cameraStatus.status === "granted");
      const galeryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionGalery(galeryStatus === "granted");
    })();
  }, []);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão de câmera necessária");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
    setBase64Image(base64);
  };

  const opengalery = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão da Galeria Necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
    setBase64Image(base64);
  };

  const handleSubmit = async () => {
    const formData = {
      data: new Date().toISOString('yyyy/MM/dd'),
      endereco, 
      bairro,
      cidade,
      descricao,
      denunciaAnonima: checkedAnonimo
    }

    if (image) {
      formData.imagem = base64Image;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://10.1.198.26:8080/foco/notificar",
        formData,
      );

      if (response.status === 200) {
        Alert.alert("Sucesso", "Denúncia enviada com sucesso!");
        setEndereco("");
        setBairro("");
        setCidade("");
        setDescricao("");
        setCheckedAnonimo(false);
        setImage(null); 
        setLoading(false);
      } else {
        Alert.alert("Erro", "Falha ao enviar denúncia.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro interno. Contate o suporte.");
    }
  };

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <Header
        title={"Denúncia"}
        mostrarDocs={true}
        mostrarMenu={true}
        iconLeft={'chevron-thin-left'}
        funcao={() => navigation.navigate("RelatorioDenuncia")}
        funcaoLeft={() =>navigation.navigate("Home")}
      ></Header>
      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
          />
          <TextInput
            placeholder="Bairro"
            style={styles.input}
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            placeholder="Cidade/Estado"
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            placeholder="Descrição"
            multiline
            numberOfLines={4}
            style={styles.textArea}
            value={descricao}
            onChangeText={setDescricao}
          />

        </View>
        <View style={styles.checkContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              checked={checkedLocal}
              onPress={() => setCheckedLocal(!checkedLocal)}
              checkedColor="#000"
              uncheckedColor="#000"
            />
            <Text style={{ marginStart: -15 }}>
              Quer usar a localização atual?
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              checked={checkedAnonimo}
              onPress={() => setCheckedAnonimo(!checkedAnonimo)}
              checkedColor="#000"
              uncheckedColor="#000"
            />
            <Text style={{ marginStart: -15 }}>Denuncia anonima?</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
      </View>
      <Footer
        nameIconLeft={"attachment"}
        nameIconRight={"camera"}
        texto={"CONFIRMAR"}
        onPress={handleSubmit}
        onPressRight={openCamera}
        onPressLeft={opengalery}
      ></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: "2%",
    width: "80%",
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        padding: 16,
      },
      android: {
        padding: 10,
      },
    }),
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 100,
    padding: 16,
    textAlignVertical: "top",
  },
  checkContainer: {
    width: "90%",
  },
  imageContainer: {
    ...Platform.select({
      ios: {
        height: "30%",
        width: "50%",
      },
      android: {
        height: "30%",
        width: "55%",
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
