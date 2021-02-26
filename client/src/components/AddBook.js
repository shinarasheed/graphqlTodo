import React, { useState } from 'react';
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
} from '../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  //better ways to make queries and mutation
  const { loading, data } = useQuery(getAuthorsQuery);

  const [addBook] = useMutation(addBookMutation);

  const { name, genre, authorId } = formData;

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      //refetch the books
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
    setFormData({
      name: '',
      genre: '',
      authorId: '',
    });
  };

  if (loading) {
    return <div>Loading Authors...</div>;
  }
  return (
    <form onSubmit={handleOnSubmit} id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input
          onChange={(e) => handleOnchange(e)}
          name="name"
          value={name}
          type="text"
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          onChange={(e) => handleOnchange(e)}
          name="genre"
          value={genre}
          type="text"
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => handleOnchange(e)}
          name="authorId"
          value={authorId}
        >
          <option>Select author</option>
          {data.authors.map((author, index) => (
            <option key={index} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
