import React from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

const AddBook = (props) => {
  const { loading, authors } = props.data;
  if (loading) {
    return <div>Loading Authors...</div>;
  }
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
