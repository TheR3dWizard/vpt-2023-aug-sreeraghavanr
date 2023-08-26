// import "./Desktop2.css";
"use client";

import { React, useState } from "react";
import { useRouter } from "next/router";

import { generalSearch, fetchData, BookDetails } from "./fetch";
const SearchPage = () => {
  // const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [simpleSearchQuery, setSimpleSearchQuery] = useState("");
  const handleSimpleSearch = async () => {
    try {
      const results = await generalSearch(simpleSearchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const navigateToBookDetails = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-simple">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSimpleSearchQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSimpleSearch}>
            Search
          </button>
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
          <div
            className="book-card"
            key={result.id}
            onClick={() => navigateToBookDetails(result.id)}
          >
            {/* <img
              src={result.coverUrl}
              alt={result.title}
              className="book-cover"
            /> */}
            <h2 className="book-title">{result.title}</h2>
            <p className="book-author">By: {result.authors}</p>
            <p className="book-publisher">Published by: {result.publisher}</p>
            <p className="book-published-year">
              Published on: {result.pub_year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
