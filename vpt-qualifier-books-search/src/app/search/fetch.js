// Function to fetch data from an API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function generalSearch(query) {
  try {
    const searchUrl = `https://openlibrary.org/search.json?q=${query}`;
    const searchResponse = await fetchData(searchUrl);
    const docs = searchResponse.docs;
    const result = [];

    for (let i = 0; i < docs.length; i++) {
      const element = docs[i];
      const authors = element.author_name
        ? element.author_name[0]
        : "Unknown Author";
      const item = {
        title: element.title,
        authors: authors,
        pub_year: element.first_publish_year,
        publisher: element.publisher
          ? element.publisher[0]
          : "Unknown Publisher",
      };
      result.push(item);
    }

    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

async function BookDetails(key, authname) {
  const searchUrl = `https://openlibrary.org/books/${key}.json`;
  const searchResponse = await fetchData(searchUrl);
  isbn10 = searchResponse.isbn_10[0];
  query = `https://covers.openlibrary.org/b/isbn/${isbn10}-M.jpg`;
  item = {
    title: searchResponse.title,
    authors: authname,
    isbn: isbn10,
    publisher: searchResponse.publishers[0],
    firstline: searchResponse.first_sentence,
    cover: query,
  };
  console.log(item);
}

// async function facetedSearch(query, title, author, publisher, pub_date) {
//   try {
//     const searchUrl = `https://openlibrary.org/search.json?q=${query}`;
//     const searchResponse = await fetchData(searchUrl);
//     docs = searchResponse.docs;
//     for (let i = 0; i < docs.length; i++) {
//       const element = docs[i];
//       if (title !== nul && docs[i].title == title) {
//         if (publisher !== null && publisher in docs[i].publisher) {
//           if (
//             pub_date !== null &&
//             (pub_date in docs[i].publish_date ||
//               pub_date in docs[i].publish_year)
//           ) {
//             item = {
//               title: element.title,
//               publish_date: element.publish_date,
//               //authors: getAuthor(element.authors[0].key),
//               pub_year: element.first_publish_year,
//             };
//             console.log(item);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// Call the main function to start the process
// generalSearch("the lord of the rings").then((data) => {
//   console.log(data);
// });

module.exports = {
  generalSearch,
  fetchData,
  BookDetails,
};
