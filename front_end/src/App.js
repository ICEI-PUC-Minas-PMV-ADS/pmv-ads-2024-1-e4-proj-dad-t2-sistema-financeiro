import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="icone">
          <img src="logo.png" className="logo" alt="logo" />
          <p>Carteira Financeira</p>
        </div>
        <nav className="nav-center">
          <a href="#">Dashboard</a>
          <a href="#">Sistema</a>
          <a href="#">Categoria</a>
          <a href="#">Despesas</a>
          <a href="#">Usuários</a>
        </nav>
        <a href="#" className="logout">Sair</a>
      </header>

      <main>
        <p>Corpo</p>
      </main>

      <footer>
        <p>Análise e Desenvolvimento de Sistemas PUC Minas</p>
      </footer>
    </div>
  );
}

export default App;
