// Determine the base URL based on the environment, So that I can test locally while having it work on a real website
let baseUrl;
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // Running locally
  baseUrl = "http://localhost:5500/";
} else {
  // Running on a live server
  baseUrl = "";
}

const contentUrl = baseUrl + "content.json";

// Fetch the content from the external file
fetch(contentUrl)
    .then(response => response.json())
    .then(data => {
    // Inject the content into the appropriate HTML elements
    document.getElementById("aboutContent").innerHTML = data.about;
    document.getElementById("causesContent").innerHTML = data.causes;
    })
    .catch(error => {
    console.error("Error fetching content:", error);
    });