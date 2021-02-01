import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BingoTable from './components/BingoTable';
import { Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row className="justify-content-center">
        <img src="/images/logo" className="App-logo" alt="logo" />
      </Row>
      <Row className="justify-content-center">
        <BingoTable />
      </Row>
    </Container>
  );
}

export default App;
