import React from "react";
import { useRouter } from "next/router";
import { fetchData, BookDetails } from "./fetch";

const BookPage = async () => {
  //   const searchResults = [
  //     {
  //       title: "my book",
  //       publish_date: "march 2021",
  //       authors: "me",
  //       pub_year: "2021",
  //       publisher: "not me",
  //       isbn: "9788483835043",
  //       line: "Hello Everyone",
  //     },
  //   ];
  const { edition } = router.query;
  //   const router = useRouter();
  const searchResults = await BookDetails(edition);

  return (
    <div className="book-page">
      <div className="search-container">
        <div className="search-simple">
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </div>
        <div className="search-advanced">
          <div className="book-title">
            <label htmlFor="book-title">Title</label>
            <input type="text" id="book-title" />
          </div>
          <div className="book-author">
            <label htmlFor="book-author">Author</label>
            <input type="text" id="book-author" />
          </div>
          <div className="book-publisher">
            <label htmlFor="book-publisher">Publisher</label>
            <input type="text" id="book-publisher" />
          </div>
          <div className="book-published-year">
            <label htmlFor="book-published-year">Published Year</label>
            <input type="text" id="book-published-year" />
          </div>
        </div>
      </div>
      <div className="results-container">
        {searchResults.map((result) => (
          <div className="book-card" key={result.id}>
            <img
              src={result.coverUrl}
              alt={result.title}
              className="book-cover"
            />
            <h2 className="book-title">Title {result.title}</h2>
            <p className="book-author">Author {result.authors}</p>
            <p className="isbn">ISBN {result.isbn}</p>
            <p className="book-publisher">Publisher {result.publisher}</p>
            <p className="first-line">First Line {result.line}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPage;
