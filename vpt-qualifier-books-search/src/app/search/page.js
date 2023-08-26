// import "./Desktop2.css";
const SearchPage = () => {
  const searchResults = [
    {
      title: "my book",
      publish_date: "march 2021",
      authors: "me",
      pub_year: "2021",
      publisher: "not me",
    },
  ];
  return (
    <div className="search-page">
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
            <h2 className="book-title">{result.title}</h2>
            <p className="book-author">By: {result.authors}</p>
            <p className="book-publisher">Published by: {result.publishers}</p>
            <p className="book-published-year">
              Published on: {result.publish_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
