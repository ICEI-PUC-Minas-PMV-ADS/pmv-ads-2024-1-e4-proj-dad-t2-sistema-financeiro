import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header'; 
import { StyleSheet } from 'react-native';

export default function Usuario() {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:7154/api/usuario-sistema-financeiro');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Ocorreu um erro ao buscar os usuários.');
      }
    };
  
    fetchUsuarios();
  }, []);

  const salvarUsuario = async () => {
    if (emailUsuario.trim() === '') {
      alert('Por favor, insira um email para o usuário.');
      return;
    }
  
    try {
      if (editando) {
        await axios.put(`http://192.168.1.5:7154/api/usuario-sistema-financeiro/${usuarioId}`, {id :usuarioId, emailUsuario });
        const response = await axios.get('http://192.168.1.5:7154/api/usuario-sistema-financeiro');
        setUsuarios(response.data);
        setEditando(false);
        setUsuarioId(null);
      } else {
        const response = await axios.post('http://192.168.1.5:7154/api/usuario-sistema-financeiro', { emailUsuario });
        setUsuarios([...usuarios, response.data]);
      }
  
      setEmailUsuario('');
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error);
      alert('Ocorreu um erro ao salvar o usuário.');
    }
  };

  const handleEditarUsuario = (id) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    if (usuario) {
      setEmailUsuario(usuario.emailUsuario);
      setEditando(true);
      setUsuarioId(usuario.id);
    }
  };
  

  const handleExcluirUsuario = async (id) => {
    try {
      await axios.delete(`http://192.168.1.5:7154/api/usuario-sistema-financeiro/${id}`);
      const usuariosAtualizados = usuarios.filter(usuario => usuario.id !== id);
      setUsuarios(usuariosAtualizados);
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      alert('Ocorreu um erro ao excluir o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email do Usuário:</Text>
        <TextInput
          style={styles.input}
          value={emailUsuario}
          onChangeText={setEmailUsuario}
          placeholder="Digite o email do usuário"
        />
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarUsuario} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>Usuários Salvos:</Text>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.emailUsuario}</Text>
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
