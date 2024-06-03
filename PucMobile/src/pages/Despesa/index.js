import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header';

const API_BASE_URL = 'http://192.168.1.5:7154/api/despesa';

export default function Despesa() {
  const [despesas, setDespesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // Define os estados para os campos do formulário
  const [form, setForm] = useState({
    id: '',
    nome: '',
    valor: 0,
    mes: 0,
    ano: 0,
    tipoDespesa: '',
    dataCadastro: '',
    dataAlteracao: '',
    dataPagamento: '',
    dataVencimento: '',
    pago: true,
    despesaAtrasada: true,
    categoriaId: '',
  });

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setDespesas(response.data);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        alert('Ocorreu um erro ao buscar as despesas.');
      }
    };

    fetchDespesas();
  }, []);

  // Função para salvar ou atualizar uma despesa
  const salvarDespesa = async () => {
    try {
      if (form.id) {
        // Se já existe um ID, então é uma atualização
        await axios.put(`${API_BASE_URL}/${form.id}`, form);
      } else {
        // Caso contrário, é uma nova despesa
        await axios.post(API_BASE_URL, form);
      }
      // Atualiza a lista de despesas após a operação de salvar/atualizar
      const response = await axios.get(API_BASE_URL);
      setDespesas(response.data);
      // Fecha o modal
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar/atualizar despesa:', error);
      alert('Ocorreu um erro ao salvar/atualizar a despesa.');
    }
  };

  // Função para abrir o modal com o formulário para adicionar/editar uma despesa
  const handleOpenModal = () => {
    setForm({
      id: '',
      nome: '',
      valor: 0,
      mes: 0,
      ano: 0,
      tipoDespesa: '',
      dataCadastro: '',
      dataAlteracao: '',
      dataPagamento: '',
      dataVencimento: '',
      pago: true,
      despesaAtrasada: true,
      categoriaId: '',
    });
    setModalVisible(true);
  };

  // Função para preencher o formulário com os dados da despesa selecionada para edição
  const handleEditDespesa = (despesa) => {
    setForm(despesa);
    setModalVisible(true);
  };

  // Função para excluir uma despesa
  const handleDeleteDespesa = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      const updatedDespesas = despesas.filter(despesa => despesa.id !== id);
      setDespesas(updatedDespesas);
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
      alert('Ocorreu um erro ao excluir a despesa.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <TouchableOpacity onPress={handleOpenModal} style={styles.addButton}>
        <AntDesign name="pluscircleo" size={30} color="black" />
      </TouchableOpacity>

      <FlatList
  data={despesas}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <View>
        <Text>Nome: {item.nome}</Text>
        <Text>Valor: {item.valor}</Text>
        <Text>Mês: {item.mes}</Text>
        <Text>Ano: {item.ano}</Text>
        <Text>Tipo de Despesa: {item.tipoDespesa}</Text>
        <Text>Data de Cadastro: {item.dataCadastro}</Text>
        <Text>Data de Alteração: {item.dataAlteracao}</Text>
        <Text>Data de Pagamento: {item.dataPagamento}</Text>
        <Text>Data de Vencimento: {item.dataVencimento}</Text>
        <Text>Pago: {item.pago ? 'Sim' : 'Não'}</Text>
        <Text>Despesa Atrasada: {item.despesaAtrasada ? 'Sim' : 'Não'}</Text>
        <Text>Categoria ID: {item.categoriaId}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleEditDespesa(item)}>
          <AntDesign name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteDespesa(item.id)} style={styles.deleteButton}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )}
/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.modalContent}>
              <Text>Nome:</Text>
              <TextInput
                style={styles.input}
                value={form.nome}
                onChangeText={(text) => setForm({ ...form, nome: text })}
              />

              <Text>Valor:</Text>
              <TextInput
                style={styles.input}
                value={form.valor.toString()}
                onChangeText={(text) => setForm({ ...form, valor: parseFloat(text) })}
                keyboardType="numeric"
              />

              <Text>Mês:</Text>
              <TextInput
                style={styles.input}
                value={form.mes.toString()}
                onChangeText={(text) => setForm({ ...form, mes: parseInt(text) })}
                keyboardType="numeric"
              />

              <Text>Ano:</Text>
              <TextInput
                style={styles.input}
                value={form.ano.toString()}
                onChangeText={(text) => setForm({ ...form, ano: parseInt(text) })}
                keyboardType="numeric"
              />

              <Text>Tipo de Despesa:</Text>
              <TextInput
                style={styles.input}
                value={form.tipoDespesa}
                onChangeText={(text) => setForm({ ...form, tipoDespesa: text })}
              />

              <Text>Data de Cadastro:</Text>
              <TextInput
                style={styles.input}
                value={form.dataCadastro}
                onChangeText={(text) => setForm({ ...form, dataCadastro: text })}
              />

              <Text>Data de Alteração:</Text>
              <TextInput
                style={styles.input}
                value={form.dataAlteracao}
                onChangeText={(text) => setForm({ ...form, dataAlteracao: text })}
              />

              <Text>Data de Pagamento:</Text>
              <TextInput
                style={styles.input}
                value={form.dataPagamento}
                onChangeText={(text) => setForm({ ...form, dataPagamento: text })}
              />

              <Text>Data de Vencimento:</Text>
              <TextInput
                style={styles.input}
                value={form.dataVencimento    }
                 onChangeText={(text) => setForm({ ...form, dataVencimento: text })}
                />
  
                <Text>Pago:</Text>
                <TextInput
                  style={styles.input}
                  value={form.pago ? 'Sim' : 'Não'}
                  onChangeText={(text) => setForm({ ...form, pago: text === 'Sim' })}
                />
  
                <Text>Despesa Atrasada:</Text>
                <TextInput
                  style={styles.input}
                  value={form.despesaAtrasada ? 'Sim' : 'Não'}
                  onChangeText={(text) => setForm({ ...form, despesaAtrasada: text === 'Sim' })}
                />
  
                <Text>Categoria ID:</Text>
                <TextInput
                  style={styles.input}
                  value={form.categoriaId}
                  onChangeText={(text) => setForm({ ...form, categoriaId: text })}
                />
              </View>
            </ScrollView>
            {/* Botão para salvar ou cancelar */}
            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={salvarDespesa} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 30,
      elevation: 3,
      padding: 10,
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
      justifyContent: 'space-around',
      marginTop: 20,
    },
    deleteButton: {
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      minWidth: 300,
    },
    scrollView: {
      maxHeight: '80%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 30,
      elevation: 3,
      padding: 10,
      zIndex: 1, // Adicione este estilo para garantir que o botão esteja acima da lista
    },
  });
  
