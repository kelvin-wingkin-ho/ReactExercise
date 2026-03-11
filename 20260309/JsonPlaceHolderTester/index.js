console.log("Testing JSON Placeholder");

const url = "https://jsonplaceholder.typicode.com/posts";

// Simple GET request
let getFirstPostUrl = url + "/1";
fetch(getFirstPostUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Invoking GET: ${getFirstPostUrl}`);
    console.log(`Result:\n ${JSON.stringify(data, null, 2)}`);
  });

// Convert it to async / await style
async function getPost(url, id) {
  let getPostUrl = `${url}/${id}`;
  const res = await fetch(getPostUrl);
  const data = await res.json();
  console.log(`Retrieving post id:${id}`);
  console.log(`Result:\n ${JSON.stringify(data, null, 2)}`);
}

getPost(url, 2);
getPost(url, 3);
getPost(url, 4);
