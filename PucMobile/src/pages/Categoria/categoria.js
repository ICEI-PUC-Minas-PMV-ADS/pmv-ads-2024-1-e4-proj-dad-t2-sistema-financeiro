import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header'; 
import { StyleSheet } from 'react-native';

export default function Categoria() {
  const [nome, setNome] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(false);
  const [categoriaId, setCategoriaId] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:7154/api/categoria');
        setCategorias(response.data);
      } catch (error) {
        if (error.response) {
          // A solicitação foi feita e o servidor respondeu com um código de status
          // que indica um erro (fora do intervalo 2xx)
          console.error('Erro na resposta da API:', error.response.data);
          console.error('Código de status:', error.response.status);
        } else if (error.request) {
          // A solicitação foi feita, mas não houve resposta
          console.error('Nenhuma resposta recebida:', error.request);
        } else {
          // Ocorreu um erro ao configurar a solicitação
          console.error('Erro ao configurar a solicitação:', error.message);
        }
        alert('Ocorreu um erro ao buscar as categorias.');
      }
    };
  
    fetchCategorias();
  }, []);

  /* const salvarCategoria = () => {
    if (nome.trim() === '') {
      alert('Por favor, insira um nome para a categoria.');
      return;
    }

    if (editando) {
      const categoriasAtualizadas = categorias.map(categoria =>
        categoria.id === categoriaId ? { ...categoria, nome } : categoria
      );
      setCategorias(categoriasAtualizadas);
      setEditando(false);
      setCategoriaId(null);
    } else {
      setCategorias([...categorias, { id: Math.random().toString(), nome }]);
    }

    setNome('');
  }; */

  const salvarCategoria = async () => {
    if (nome.trim() === '') {
      alert('Por favor, insira um nome para a categoria.');
      return;
    }
  
    try {
      if (editando) {
        try {
          await axios.put(`http://192.168.1.5:7154/api/categoria/${categoriaId}`, { id: categoriaId, nome });
          // ...
          const response = await axios.get('http://192.168.1.5:7154/api/categoria');
          setCategorias(response.data);
        } catch (error) {
          if (error.response) {
            console.error('Erro ao atualizar a categoria:', error.response.data);
          } else {
            console.error('Erro ao atualizar a categoria:', error.message);
          }
          alert('Ocorreu um erro ao atualizar a categoria. Verifique os logs para mais detalhes.');
        }
      } else {
        const response = await axios.post('http://192.168.1.5:7154/api/categoria', { nome });
        setCategorias([...categorias, response.data]);
      }
  
      setNome('');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao salvar a categoria.');
    }
  };

  const handleEditarCategoria = (id) => {
    const categoria = categorias.find(categoria => categoria.id === id);
    if (categoria) {
      setNome(categoria.nome);
      setEditando(true);
      setCategoriaId(id);
    }
  };

  /* const handleExcluirCategoria = (id) => {
    const categoriasAtualizadas = categorias.filter(categoria => categoria.id !== id);
    setCategorias(categoriasAtualizadas);
  }; */

  const handleExcluirCategoria = async (id) => {
    try {
      await axios.delete(`http://192.168.1.5:7154/api/categoria/${id}`);
      const categoriasAtualizadas = categorias.filter(categoria => categoria.id !== id);
      setCategorias(categoriasAtualizadas);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao excluir a categoria.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome da Categoria:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome da categoria"
        />
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarCategoria} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>Categorias Salvas:</Text>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nome}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditarCategoria(item.id)}>
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirCategoria(item.id)} style={styles.deleteButton}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listaContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  listaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    marginLeft: 10,
  },
});
