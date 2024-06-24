import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header'; 
import { StyleSheet } from 'react-native';

export default function Usuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/usuario');
        setUsuarios(response.data);
        setErro('');
      } catch (error) {
        handleApiError(error, 'Erro ao buscar usuários.');
      }
    };

    fetchUsuarios();
  }, []);

  const salvarUsuario = async () => {
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      if (editando) {
        console.log('Editando usuário:', { id: usuarioId, nome, email, senha });
        await axios.put(`https://apigateway.criadoresdesoftware.com.br:5000/usuario/${usuarioId}`, {id:usuarioId, nome, email, senha });
      } else {
        console.log('Criando novo usuário:', { nome, email, senha });
        const response = await axios.post('https://apigateway.criadoresdesoftware.com.br:5000/usuario', {id:usuarioId, nome, email, senha });
        setUsuarios([...usuarios, response.data]);
      }
      const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/usuario');
      setUsuarios(response.data);
      resetForm();
    } catch (error) {
      console.log('Erro ao salvar o usuário:', error.response.data);
      handleApiError(error, 'Erro ao salvar o usuário.');
    }
  };
  

  const handleEditarUsuario = (id) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    if (usuario) {
      console.log('Editando usuário:', usuario);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setEditando(true);
      setUsuarioId(usuario.id); // Certifique-se de que estamos definindo o ID corretamente aqui
    }
  };
  const handleExcluirUsuario = async (id) => {
    try {
      await axios.delete(`https://apigateway.criadoresdesoftware.com.br:5000/usuario/${id}`);
      const usuariosAtualizados = usuarios.filter(usuario => usuario.id !== id);
      setUsuarios(usuariosAtualizados);
    } catch (error) {
      handleApiError(error, 'Erro ao excluir o usuário.');
    }
  };

  const handleApiError = (error, defaultMessage) => {
    if (error.response) {
      const errorMessage = error.response.data.errors
        ? Object.values(error.response.data.errors).flat().join('\n')
        : defaultMessage;
      console.error(defaultMessage, errorMessage);
      setErro(errorMessage);
      alert(errorMessage);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
      setErro('Nenhuma resposta recebida do servidor.');
      alert('Nenhuma resposta recebida do servidor.');
    } else {
      console.error('Erro ao configurar a solicitação:', error.message);
      setErro('Erro ao configurar a solicitação: ' + error.message);
      alert('Erro ao configurar a solicitação: ' + error.message);
    }
  };

  const resetForm = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setEditando(false);
    setUsuarioId(null);
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome do usuário"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o email do usuário"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a senha do usuário"
          secureTextEntry
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarUsuario} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>Usuários Salvos:</Text>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nome}</Text>
              <Text>{item.email}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditarUsuario(item.id)}>
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirUsuario(item.id)} style={styles.deleteButton}>
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
