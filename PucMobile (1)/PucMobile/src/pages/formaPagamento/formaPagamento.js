import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header';
import { StyleSheet } from 'react-native';

export default function FormaPagamento() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [formaPagamento, setFormaPagamento] = useState([]);
  const [editando, setEditando] = useState(false);
  const [formaPagamentoId, setFormaPagamentoId] = useState(null);

  useEffect(() => {
    const fetchFormaPagamento = async () => {
      try {
        const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento');
        setFormaPagamento(response.data); // Corrigido de 'setformaPagamento' para 'setFormaPagamento'
      } catch (error) {
        console.error('Erro ao buscar forma de pagamento:', error);
        alert('Ocorreu um erro ao buscar as formas de pagamento.');
      }
    };
  
    fetchFormaPagamento();
  }, []);

  const salvarFormaPagamento = async () => {
    if (nome.trim() === '' || descricao.trim() === '') {
      alert('Por favor, insira nome e descrição da forma de pagamento.');
      return;
    }

    try {
      if (editando) {
        await axios.put(`https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento/${formaPagamentoId}`, { id: formaPagamentoId, nome, descricao });
        const response = await axios.get('https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento');
        setFormaPagamento(response.data);
        setEditando(false);
        setFormaPagamentoId(null);
      } else {
        const response = await axios.post('https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento', {id: formaPagamentoId, nome, descricao });
        setFormaPagamento([...formaPagamento, response.data]);
      }

      setNome('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao salvar a forma de pagamento:', error);
      alert('Ocorreu um erro ao salvar a forma de pagamento.');
    }
  };

  const handleEditarFormaPagamento = (id) => {
    const forma = formaPagamento.find((forma) => forma.id === id);
    if (forma) {
      setNome(forma.nome);
      setDescricao(forma.descricao);
      setEditando(true);
      setFormaPagamentoId(id);
    }
  };

  const handleExcluirFormaPagamento = async (id) => {
    try {
      await axios.delete(`https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento/${id}`);
      const formaAtualizadas = formaPagamento.filter((forma) => forma.id !== id);
      setFormaPagamento(formaAtualizadas);
    } catch (error) {
      console.error('Erro ao excluir a forma de pagamento:', error);
      alert('Ocorreu um erro ao excluir a forma de pagamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome da Forma de Pagamento:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome da forma de pagamento"
        />
        <Text style={styles.label}>Descrição da Forma de Pagamento:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição da forma de pagamento"
        />
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarFormaPagamento} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>forma de Pagamento Salvas:</Text>
        <FlatList
          data={formaPagamento}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nome} - {item.descricao}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditarFormaPagamento(item.id)}>
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirFormaPagamento(item.id)} style={styles.deleteButton}>
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
