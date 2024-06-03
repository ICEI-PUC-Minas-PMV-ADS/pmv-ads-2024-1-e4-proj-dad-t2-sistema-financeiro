
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descricao: {
    fontSize: 18,
    marginBottom: 5,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -24,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 99,
  },
  balanceItem: {
    flex: 1,
  },
  balanceItemTitle: {
    fontSize: 20,
    color: '#dadada',
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#dadada',
    marginRight: 6,
  },
  gastos: {
    fontSize: 22,
    color: '#e74e3c',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  icon: {
    borderRadius: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  deleteButton: {
    marginLeft: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  despesaContainer: {
    backgroundColor: '#ecf0f1',
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: 8,
    marginVertical: 10,
    zIndex: 99,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '85%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
