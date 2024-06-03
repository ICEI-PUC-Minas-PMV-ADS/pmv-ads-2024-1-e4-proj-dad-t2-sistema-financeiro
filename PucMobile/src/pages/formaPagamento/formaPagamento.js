import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../Header/header';
import { StyleSheet } from 'react-native';

export default function FormaPagamento() {
  const [nome, setNome] = useState('');
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [editando, setEditando] = useState(false);
  const [formaPagamentoIndex, setFormaPagamentoIndex] = useState(null);

  const salvarFormaPagamento = () => {
    if (nome.trim() === '') {
      alert('Por favor, insira uma forma de pagamento.');
      return;
    }

    if (editando) {
      const formasAtualizadas = formasPagamento.map((forma, index) =>
        index === formaPagamentoIndex ? nome : forma
      );
      setFormasPagamento(formasAtualizadas);
      setEditando(false);
      setFormaPagamentoIndex(null);
    } else {
      setFormasPagamento([...formasPagamento, nome]);
    }

    setNome('');
  };

  const handleEditarFormaPagamento = (index) => {
    const forma = formasPagamento[index];
    if (forma) {
      setNome(forma);
      setEditando(true);
      setFormaPagamentoIndex(index);
    }
  };

  const handleExcluirFormaPagamento = (index) => {
    const formasAtualizadas = formasPagamento.filter((_, i) => i !== index);
    setFormasPagamento(formasAtualizadas);
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
        <Button title={editando ? "Atualizar" : "Salvar"} onPress={salvarFormaPagamento} />
      </View>
      <View style={styles.listaContainer}>
        <Text style={styles.listaLabel}>Formas de Pagamento Salvas:</Text>
        <FlatList
          data={formasPagamento}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text>{item}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditarFormaPagamento(index)}>
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirFormaPagamento(index)} style={styles.deleteButton}>
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
