// Function to fetch data from an API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Main function to call APIs sequentially
async function callApis() {
  try {
    // Call the first API
    const firstApiUrl =
      "https://openlibrary.org/search.json?title=the+lord+of+the+rings";
    const firstApiResponse = await fetchData(firstApiUrl);

    // Extract the "seed" value from the first API response
    const seed = firstApiResponse.docs[0].seed[0];
    console.log("First API Response:", seed);

    // Use the "seed" value to construct the URL for the second API
    const secondApiUrl = `https://openlibrary.org${seed}.json`;
    const secondApiResponse = await fetchData(secondApiUrl);

    // Do something with the second API response
    console.log("Second API Response:", secondApiResponse.title);
  } catch (error) {
    console.error("An error occurred:", error);
  }
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

async function facetedSearch(query, title, author, publisher, pub_date) {
  try {
    const searchUrl = `https://openlibrary.org/search.json?q=${query}`;
    const searchResponse = await fetchData(searchUrl);
    docs = searchResponse.docs;
    for (let i = 0; i < docs.length; i++) {
      const element = docs[i];
      if (title !== nul && docs[i].title == title) {
        if (publisher !== null && publisher in docs[i].publisher) {
          if (
            pub_date !== null &&
            (pub_date in docs[i].publish_date ||
              pub_date in docs[i].publish_year)
          ) {
            item = {
              title: element.title,
              publish_date: element.publish_date,
              //authors: getAuthor(element.authors[0].key),
              pub_year: element.first_publish_year,
            };
            console.log(item);
          }
        }
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the main function to start the process
generalSearch("the lord of the rings").then((data) => {
  console.log(data);
});
//facetedSearch('the lord of the rings',null,'J. R. R. Tolkien','George Allen & Unwin','1954')
