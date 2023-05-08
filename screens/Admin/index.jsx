import React from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView, Center, FlatList, FormControl, HStack, Text, VStack, Box, Button, Input, TextArea, Select } from "native-base";
import { Title } from "../../components/Title";
import { sharedStyles } from "../../shared/styles";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { instance } from "../../shared/api";
import { RefreshControl } from "react-native";

export const AdminRoute = "Admin"

export function AdminScreen() {
  // Form das categorias
  const [categoria, setCategoria] = React.useState('');
  const [categoriaDesc, setCategoriaDesc] = React.useState('');
  const handleCategoria = (event) => {
    console.log("Categoria", { name: categoria, description: categoriaDesc });
    event.preventDefault();
  }

  // Form dos materiais
  const [material, setMaterial] = React.useState('');
  const [materialCateg, setmaterialCateg] = React.useState('');
  const [materialFile, setmaterialFile] = React.useState('');
  const handleMaterial = (event) => {
    console.log("Material", { name: material, categoria: materialCateg, file: materialFile });
    event.preventDefault();
  }

  // Form das atividades
  const [atividade, setAtividade] = React.useState('');
  const [atividadeCateg, setAtividadeCateg] = React.useState('');
  const [atividadeFile, setAtividadeFile] = React.useState('');
  const handleAtividade = (event) => {
    console.log("Atividade", { name: atividade, categoria: atividadeCateg, file: atividadeFile });
    event.preventDefault();
  }

  // Form dos videos
  const [video, setVideo] = React.useState('');
  const [videoCateg, setVideoCateg] = React.useState('');
  const handleVideo = (event) => {
    console.log("Video", { name: video, categoria: videoCateg });
    event.preventDefault();
  }

  // Form dos jogos
  const [jogo, setJogo] = React.useState('');
  const [jogoCateg, setJogoCateg] = React.useState('');
  const handleJogo = (event) => {
    console.log("Jogo", { name: jogo, categoria: jogoCateg });
    event.preventDefault();
  }


  const [materias, setMaterias] = React.useState([]);
  const [loadedMaterias, setLoadedMaterias] = React.useState(false);

  const [materiais, setMateriais] = React.useState([]);
  const [loadedMateriais, setLoadedMateriais] = React.useState(false);

  const [atividades, setAtividades] = React.useState([]);
  const [loadedAtividades, setLoadedAtividades] = React.useState(false);

  const [videos, setVideos] = React.useState([]);
  const [loadedVideos, setLoadedVideos] = React.useState(false);

  const [jogos, setJogos] = React.useState([]);
  const [loadedJogos, setLoadedJogos] = React.useState(false);

  const loadMaterias = async () => {
    try {
      const response = await instance.get("materias/find")
      console.log(response.data)
      setMaterias(response.data);
      setLoadedMaterias(true);

    } catch (err) {
      console.log(err)
    }
  }
  const loadMateriais = async () => {
    try {
      const response = await instance.get("materiais/find")
      console.log(response.data)
      setMateriais(response.data);
      setLoadedMateriais(true);
    } catch (err) {
      console.log(err)
    }
  }
  const loadVideos = async () => {
    try {
      const response = await instance.get("videos/find")
      console.log(response.data)
      setVideos(response.data);
      setLoadedVideos(true);
    } catch (err) {
      console.log(err)
    }
  }
  const loadJogos = async () => {
    try {
      const response = await instance.get("jogos/find")
      console.log(response.data)
      setJogos(response.data);
      setLoadedJogos(true);
    } catch (err) {
      console.log(err)
    }
  }
  const loadAtividades = async () => {
    try {
      const response = await instance.get("atividades/find")
      console.log(response.data)
      setAtividades(response.data);
      setLoadedAtividades(true);
    } catch (err) {
      console.log(err)
    }
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadMateriais();
    loadMaterias();
    loadAtividades();
    loadVideos()
    loadJogos()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    loadMaterias();
    loadMateriais();
    loadAtividades();
  }, [])


  return (
    <ScrollView {...sharedStyles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Center justifyContent={"flex-start"} paddingTop={6}>
        <Title icon="hammer-outline" text="Painel" />
        <VStack {...sharedStyles.form}>
          <Text {...styles.text}>Matérias (Categorias)</Text>
          {loadedMaterias ? null : (<ActivityIndicator color="orange" size="large" />)}
          {materias.length > 0
            ? materias.map((item) => (
              <Box {...styles.card} key={item._id}>
                <VStack>
                  <HStack marginBottom={2}>
                    <Text bold {...styles.cardTitle}>{item.name}</Text>
                    <HStack {...styles.actions}>
                      <Button {...styles.button}>
                        <Icon name="pencil-outline" color="white" size={18} />
                      </Button>
                      <Button {...styles.button}>
                        <Icon name="trash-outline" color="white" size={18} />
                      </Button>
                    </HStack>
                  </HStack>
                  <Text {...styles.cardText}>{item.description}</Text>
                </VStack>
              </Box>
            ))
            : (<Text color={"amber.300"}>Não há matérias!</Text>)}
          <VStack marginTop={2}>
            <FormControl {...sharedStyles.formControl}>
              <Input onChangeText={value => setCategoria(value)} {...sharedStyles.formInput} type="text" placeholder="Nova Materia" />
            </FormControl>
            <FormControl {...sharedStyles.formControl} marginBottom={0}>
              <TextArea onChangeText={value => setCategoriaDesc(value)} placeholder="Descrição" {...sharedStyles.formInput} />
            </FormControl>
            <Button onPress={(e) => handleCategoria(e)} {...sharedStyles.formButton}>Criar</Button>
          </VStack>
        </VStack>

        <VStack {...sharedStyles.form}>
          <Text {...styles.text}>Materiais de estudo</Text>
          {loadedMateriais ? null : (<ActivityIndicator color="orange" size="large" />)}
          {materiais.length > 0
            ? materiais.map((item) => (
              <Box {...styles.card} key={item._id}>
                <VStack>
                  <HStack marginBottom={2}>
                    <Text bold {...styles.cardTitle}>{item.name}</Text>
                    <HStack {...styles.actions}>
                      <Button {...styles.button}>
                        <Icon name="pencil-outline" color="white" size={18} />
                      </Button>
                      <Button {...styles.button}>
                        <Icon name="trash-outline" color="white" size={18} />
                      </Button>
                    </HStack>
                  </HStack>
                  <Text {...styles.cardText}>{item.file}</Text>
                  <Text italic color={"amber.400"}>{item.materia}</Text>
                </VStack>
              </Box>
            ))
            : (<Text color={"amber.300"}>Não há matériais!</Text>)}
          <VStack marginTop={2}>
            <FormControl {...sharedStyles.formControl}>
              <Input onChangeText={value => setMaterial(value)}  {...sharedStyles.formInput} type="text" placeholder="Novo Material" />
            </FormControl>
            <Select onChange={value => setMaterial(value)} marginBottom={2} placeholder="Categoria" {...sharedStyles.formInput}>
              {materias
                ? materias.map((item) => (
                  <Select.Item label={item.name} value={item.name} />
                ))
                : null}
            </Select>
            <FormControl {...sharedStyles.formControl} marginBottom={0}>
              <Button variant={"outline"} borderColor={"amber.600"} colorScheme={"amber"}>Selecionar Arquivo</Button>
            </FormControl>
            <Button {...sharedStyles.formButton}>Criar</Button>
          </VStack>
        </VStack>

        <VStack {...sharedStyles.form}>
          <Text {...styles.text}>Atividades</Text>
          {loadedAtividades ? null : (<ActivityIndicator color="orange" size="large" />)}
          {atividades.length > 0
            ? atividades.map((item) => (
              <Box {...styles.card} key={item._id}>
                <VStack>
                  <HStack marginBottom={2}>
                    <Text bold {...styles.cardTitle}>{item.name}</Text>
                    <HStack {...styles.actions}>
                      <Button {...styles.button}>
                        <Icon name="pencil-outline" color="white" size={18} />
                      </Button>
                      <Button {...styles.button}>
                        <Icon name="trash-outline" color="white" size={18} />
                      </Button>
                    </HStack>
                  </HStack>
                  <Text {...styles.cardText}>{item.file}</Text>
                  <Text italic color={"amber.400"}>{item.materia}</Text>
                </VStack>
              </Box>
            ))
            : (<Text color={"amber.300"}>Não há atividades!</Text>)}
          <VStack marginTop={2}>
            <FormControl {...sharedStyles.formControl}>
              <Input onChange={() => { }} {...sharedStyles.formInput} type="text" placeholder="Nova Atividade" />
            </FormControl>
            <Select onChange={value => setAtividade(value)} marginBottom={2} placeholder="Categoria" {...sharedStyles.formInput}>
              {materias
                ? materias.map((item) => (
                  <Select.Item label={item.name} value={item.name} />
                ))
                : null}
            </Select>
            <FormControl {...sharedStyles.formControl} marginBottom={0}>
              <Button variant={"outline"} borderColor={"amber.600"} colorScheme={"amber"}>Selecionar Arquivo</Button>
            </FormControl>
            <Button {...sharedStyles.formButton}>Criar</Button>
          </VStack>
        </VStack>
      </Center >
    </ScrollView>
  );
}