import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Importando o Picker
import Header from '../../Header/header';

const API_BASE_URL = 'https://apigateway.criadoresdesoftware.com.br:5000/despesa'; // http://192.168.1.2:4000/despesa Novo acesso da API!
const CATEGORIA_API_URL = 'https://apigateway.criadoresdesoftware.com.br:5000/categoria'; // URL da API de categorias
const FORMA_PAGAMENTO_API_URL = 'https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento'; // URL da API de formas de pagamento

export default function Despesa() {
  const [despesas, setDespesas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    id: '',
    nome: '',
    valor: '0',
    dataCompra: '',
    dataVencimento: '',
    statusPago: false,
    formaPagamentoId: '',
    categoriaId: '',
  });

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      await fetchDespesas();
      await fetchCategorias();
      await fetchFormasPagamento();
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Ocorreu um erro ao buscar dados.');
    }
  };

  const fetchDespesas = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const despesasComNomes = await Promise.all(response.data.map(async (despesa) => {
        const categoria = await axios.get(`${CATEGORIA_API_URL}/${despesa.categoriaId}`);
        const formaPagamento = await axios.get(`${FORMA_PAGAMENTO_API_URL}/${despesa.formaPagamentoId}`);
        return {
          ...despesa,
          categoriaNome: categoria.data.nome,
          formaPagamentoNome: formaPagamento.data.nome,
        };
      }));
      setDespesas(despesasComNomes);
      setErro('');
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
        console.error('Código de status:', error.response.status);
        setErro(error.response.data.errors ? error.response.data.errors.join('\n') : 'Erro ao buscar despesas.');
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
        setErro('Nenhuma resposta recebida do servidor.');
      } else {
        console.error('Erro ao configurar a solicitação:', error.message);
        setErro('Erro ao configurar a solicitação: ' + error.message);
      }
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(CATEGORIA_API_URL);
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setErro('Erro ao buscar categorias.');
    }
  };

  const fetchFormasPagamento = async () => {
    try {
      const response = await axios.get(FORMA_PAGAMENTO_API_URL);
      setFormasPagamento(response.data);
    } catch (error) {
      console.error('Erro ao buscar formas de pagamento:', error);
      setErro('Erro ao buscar formas de pagamento.');
    }
  };

  const formatDateToISO = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const formatDateToBR = (date) => {
    const [year, month, day] = date.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const salvarDespesa = async () => {
    try {
      const despesaParaSalvar = {
        ...form,
        valor: parseFloat(form.valor) || 0,
        dataCompra: formatDateToISO(form.dataCompra),
        dataVencimento: formatDateToISO(form.dataVencimento),
      };

      if (editando) {
        await axios.put(`${API_BASE_URL}/${form.id}`, despesaParaSalvar);
      } else {
        await axios.post(API_BASE_URL, despesaParaSalvar);
      }

      setForm({
        id: '',
        nome: '',
        valor: '0',
        dataCompra: '',
        dataVencimento: '',
        statusPago: false,
        formaPagamentoId: '',
        categoriaId: '',
      });
      setModalVisible(false);
      setEditando(false);

      await fetchDespesas(); // Atualize a lista de despesas após salvar
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao salvar a despesa.');
    }
  };

  const handleOpenModal = async () => {
    setForm({
      id: '',
      nome: '',
      valor: '0',
      dataCompra: '',
      dataVencimento: '',
      statusPago: false,
      formaPagamentoId: '',
      categoriaId: '',
    });
    setModalVisible(true);
    setEditando(false);

    try {
      await fetchCategorias();
      await fetchFormasPagamento();
    } catch (error) {
      console.error('Erro ao buscar categorias ou formas de pagamento:', error);
      alert('Ocorreu um erro ao buscar categorias ou formas de pagamento.');
    }
  };

  const handleEditDespesa = async (despesa) => {
    setForm({
      id: despesa.id,
      nome: despesa.nome,
      valor: despesa.valor.toString(),
      dataCompra: formatDateToBR(despesa.dataCompra),
      dataVencimento: formatDateToBR(despesa.dataVencimento),
      statusPago: despesa.statusPago,
      formaPagamentoId: despesa.formaPagamentoId,
      categoriaId: despesa.categoriaId,
    });
    setModalVisible(true);
    setEditando(true);
  };

  const handleDeleteDespesa = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchDespesas(); // Atualize a lista de despesas após excluir
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

      <Text style={styles.title}>LISTA DE DESPESAS:</Text>

      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text>Nome: {item.nome}</Text>
              <Text>Valor: {item.valor}</Text>
              <Text>Data da Compra: {formatDateToBR(item.dataCompra)}</Text>
              <Text>Data do Vencimento: {formatDateToBR(item.dataVencimento)}</Text>
              <Text>Pago?: {item.statusPago ? 'Sim' : 'Não'}</Text>
              <Text>Forma de Pagamento: {item.formaPagamentoNome}</Text>
              <Text>Categoria: {item.categoriaNome}</Text>
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
                value={form.valor}
                onChangeText={(text) => setForm({ ...form, valor: text })}
                keyboardType="numeric"
              />

              <Text>Data da Compra:</Text>
              <TextInput
                style={styles.input}
                value={form.dataCompra}
                onChangeText={(text) => setForm({ ...form, dataCompra: text })}
                placeholder="dd/mm/aaaa"
              />

              <Text>Data do Vencimento:</Text>
              <TextInput
                style={styles.input}
                value={form.dataVencimento}
                onChangeText={(text) => setForm({ ...form, dataVencimento: text })}
                placeholder="dd/mm/aaaa"
              />

              <Text>Pago?:</Text>
              <Picker
                selectedValue={form.statusPago ? 'Sim' : 'Não'}
                onValueChange={(itemValue) => setForm({ ...form, statusPago: itemValue === 'Sim' })}
                style={styles.input}
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
              </Picker>

              <Text>Forma de Pagamento:</Text>
              <Picker
                selectedValue={form.formaPagamentoId}
                onValueChange={(itemValue) => setForm({ ...form, formaPagamentoId: itemValue })}
                style={styles.input}
              >
                <Picker.Item label="Selecione uma forma de pagamento" value="" />
                {formasPagamento.map((forma) => (
                  <Picker.Item key={forma.id} label={forma.nome} value={forma.id} />
                ))}
              </Picker>

              <Text>Categoria:</Text>
              <Picker
                selectedValue={form.categoriaId}
                onValueChange={(itemValue) => setForm({ ...form, categoriaId: itemValue })}
                style={styles.input}
              >
                <Picker.Item label="Selecione uma categoria" value="" />
                {categorias.map((categoria) => (
                  <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
                ))}
              </Picker>
            </View>
          </ScrollView>
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
  title:{
      fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent: 'center',
    marginTop: 28,
    alignSelf: 'center',
    }
});