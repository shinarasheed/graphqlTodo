import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const [selected, setSelected] = useState(null);
  const { loading, data } = useQuery(getBooksQuery);

  if (loading) {
    return <div>Loading books...</div>;
  }
  return (
    <div>
      <ul id="booklist">
        {data.books.map((book) => (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
