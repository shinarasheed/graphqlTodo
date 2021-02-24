import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

const BookList = (props) => {
  //this line blows my mind. that you could get access to the state of the data
  const { loading, books } = props.data;
  if (loading) {
    return <div>Loading books...</div>;
  }
  return (
    <div>
      <ul id="booklist">
        {books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
