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
      const firstApiUrl = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings';
      const firstApiResponse = await fetchData(firstApiUrl);
  
      // Extract the "seed" value from the first API response
      const seed = firstApiResponse.docs[0].seed[0];
      console.log('First API Response:', seed)
  
      // Use the "seed" value to construct the URL for the second API
      const secondApiUrl = `https://openlibrary.org${seed}.json`;
      const secondApiResponse = await fetchData(secondApiUrl);
  
      // Do something with the second API response
      console.log('Second API Response:', secondApiResponse.title);
    } catch (error) {
      console.error('An error occurred:', error);
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
          cover_edition_key: element.cover_edition_key
        };
        result.push(item);
      }
  
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function facetedSearch(query,title,author,publisher,pub_date){
    try {
        const searchUrl = `https://openlibrary.org/search.json?q=${query}`;
        const searchResponse = await fetchData(searchUrl);
        docs = searchResponse.docs;
        const result = [];
        for (let i = 0; i < docs.length; i++) {
            check = true;
            const element = docs[i];
            if(title !== '' ){
                if(title !== element.title){
                    check = false;
                }         
            }
            if(author !== '' ){
                if(author !== element.author_name[0]){
                    check = false;
                }         
            }
            if(publisher !== '' ){
                if(publisher !== element.publisher[0]){
                    check = false;
                }         
            }
            if(pub_date !== '' ){
                if(pub_date !== element.first_publish_year){
                    check = false;
                }         
            }
            if(check){
                item = {
                    title: element.title,
                    authors: element.author_name
                    ? element.author_name[0]
                    : "Unknown Author",
                    pub_year: element.first_publish_year,
                    publisher: element.publisher
                    ? element.publisher[0]
                    : "Unknown Publisher",
                    cover_edition_key: element.cover_edition_key

            }
            result.push(item);
        }
        return result;
    }
    } catch (error) {
        console.error('An error occurred:', error);
    }
  }


  // Call the main function to start the process
    //generalSearch('the lord of the rings');
    //facetedSearch('the lord of the rings','','J. R. R. Tolkien','George Allen & Unwin','1954')
  
  async function BookDetails(key){
        const searchUrl = `https://openlibrary.org/books/${key}.json`;
        const searchResponse = await fetchData(searchUrl);
        isbn10 = searchResponse.isbn_10[0];
        authorkey = searchResponse.authors[0].key;
        authquery = `https://openlibrary.org/authors/${authorkey}.json`
        console.log(authquery);
        const authResponse = await fetchData(authquery);
        authname = authResponse.name;
        query = `https://covers.openlibrary.org/b/isbn/${isbn10}-M.jpg`
        item = {
            title: searchResponse.title,
            authors: authname,
            isbn: isbn10,
            publisher: searchResponse.publishers[0],
            firstline: searchResponse.first_sentence,
            cover: query
        }
        console.log(item);
  }


    BookDetails('OL7353617M')
