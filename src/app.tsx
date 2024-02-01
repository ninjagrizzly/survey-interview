import Container from '@mui/material/Container';
import { Poll } from './components/poll/poll';

function App() {
    return (
        <Container>
            <Poll pollID="abc" />
        </Container>
    );
}

export default App;
