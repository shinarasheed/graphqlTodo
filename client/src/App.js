import AppolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

const client = new AppolloClient({
  uri: 'http://localhost:7000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Shina's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
