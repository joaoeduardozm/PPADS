import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import NewChampionship from './components/pages/NewChampionship';
import NewUnity from './components/pages/NewUnity';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Championships from './components/pages/Championships';
import Unidades from './components/pages/Unidades';
import Unidade from './components/pages/Unidade';
import NewTime from './components/pages/NewTime';
import Championship from './components/pages/Championship';
import Register from './components/pages/Register';
import RegForm from './components/pages/RegForm';
import Equipe from './components/pages/Times';
import Time from './components/pages/Time';
import Jogadores from './components/pages/Jogadores';
import Jogador from './components/pages/Jogador';

function App() {
  return (
        <Router>
          <Navbar />
            <Container>
              <Routes>
                  <Route path="/" element={<Register />}></Route>
                  <Route path="/Home" element={<Home />}></Route>
                  <Route path="/newunity" element={<NewUnity />}></Route>
                  <Route path="/newchampionship" element={<NewChampionship />}></Route>
                  <Route path="/regform" element={<RegForm />}></Route>
                  <Route path="/championships" element={<Championships />}></Route>
                  <Route path="/campeonato/:id" element={<Championship />}></Route>
                  <Route path="/unidades" element={<Unidades />}></Route>
                  <Route path="/unidade/:id" element={<Unidade />}></Route>
                  <Route path="/newTime" element={<NewTime />}></Route>
                  <Route path="/equipe" element={<Equipe />}></Route>
                  <Route path="/time/:id" element={<Time />}></Route>
                  <Route path="/Jogadores" element={<Jogadores />}></Route>
                  <Route path="/Jogadores/:id" element={<Jogador />}></Route>
              </Routes>
            </Container>
            <Footer />
        </Router>       
  );
}

export default App;
