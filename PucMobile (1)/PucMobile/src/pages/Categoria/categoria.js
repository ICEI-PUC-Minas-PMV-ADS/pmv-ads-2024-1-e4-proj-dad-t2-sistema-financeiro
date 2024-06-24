import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header'; 
import { StyleSheet } from 'react-native';

export default function Categoria() {
  const [nome, setNome] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(false);
  const [categoriaId, setCategoriaId] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/categoria');
        setCategorias(response.data);
        setErro('');
      } catch (error) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
          console.error('Código de status:', error.response.status);
          setErro(error.response.data.errors ? error.response.data.errors.join('\n') : 'Erro ao buscar categorias.');
        } else if (error.request) {
          console.error('Nenhuma resposta recebida:', error.request);
          setErro('Nenhuma resposta recebida do servidor.');
        } else {
          console.error('Erro ao configurar a solicitação:', error.message);
          setErro('Erro ao configurar a solicitação: ' + error.message);
        }
      }
    };
  
    fetchCategorias();
  }, []);

  const salvarCategoria = async () => {
    if (nome.trim() === '') {
      alert('Por favor, insira um nome para a categoria.');
      return;
    }
  
    try {
      if (editando) {
        try {
          await axios.put(`https://apigateway.criadoresdesoftware.com.br:5000/categoria/${categoriaId}`, { id: categoriaId, nome });
          const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/categoria');
          setCategorias(response.data);
          setErro('');
          setEditando(false);
          setCategoriaId(null);
        } catch (error) {
          if (error.response) {
            const errorMessage = error.response.data.errors && error.response.data.errors.Nome
              ? error.response.data.errors.Nome.join('\n')
              : 'Erro ao atualizar a categoria.';
            console.error('Erro ao atualizar a categoria:', errorMessage);
            setErro(errorMessage);
            alert(errorMessage);
          } else {
            console.error('Erro ao atualizar a categoria:', error.message);
            alert('Ocorreu um erro ao atualizar a categoria. Verifique os logs para mais detalhes.');
          }
        }
      } else {
        try {
          const response = await axios.post('https://apigateway.criadoresdesoftware.com.br:5000/categoria', { nome });
          setCategorias([...categorias, response.data]);
          setErro('');
        } catch (error) {
          if (error.response) {
            const errorMessage = error.response.data.errors && error.response.data.errors.Nome
              ? error.response.data.errors.Nome.join('\n')
              : 'Erro ao salvar a categoria.';
            console.error('Erro ao salvar a categoria:', errorMessage);
            setErro(errorMessage);
            alert(errorMessage);
          } else {
            console.error('Erro ao salvar a categoria:', error.message);
            alert('Ocorreu um erro ao salvar a categoria. Verifique os logs para mais detalhes.');
          }
        }
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

  const handleExcluirCategoria = async (id) => {
    try {
      await axios.delete(`https://apigateway.criadoresdesoftware.com.br:5000/categoria/${id}`);
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
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarCategoria} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>Categorias Salvas:</Text>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
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
  erro: {
    color: 'red',
    marginBottom: 10,
  },
});
