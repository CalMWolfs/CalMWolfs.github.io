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

let pageName = window.location.href.split('/').slice(-1)

if (pageName != 'game.html') {
  const div = document.getElementsByClassName("bubbles")
  for (let i = 0; i < div.length; i++) {
    if (div) {
      let html = "";
  
    for (let i = 0; i < 10; i++) {
      const top = Math.floor(Math.random() * 50) + 60;
      const left = Math.floor(Math.random() * 90) + 5;
      const animation = Math.floor(Math.random() * 7) + 3;
      styleLine = `top: ${top}%;left: ${left}%;animation: animate ${animation}s linear infinite`
      html += `<div style="${styleLine}"><span class="dot"></span></div>`
    }
    div[i].innerHTML = html;
  }
 }
} 

// Fetch the content from the external file
fetch(contentUrl)
    .then(response => response.json())
    .then(data => {
    // Inject the content into the appropriate HTML elements
    setElementContent("aboutContent", data.about);
    setElementContent("causesContent", data.causes);
    setElementContent("effectsContent", data.effects);
    setElementContent("contributeContent", data.contribute);
    setElementContent("aboutProjectContent", data.aboutProject);
    setElementContent("informationContent", data.information);
    setElementContent("caseStudiesContent", data.caseStudies);
    setElementContent("innovationsContent", data.innovations);
    setElementContent("moreSolutionsContent", data.moreSolutions);
    setElementContent("funFactsContent", data.funFacts);
    setElementContent("advancedFactsContent", data.advancedFacts);
    setElementContent("misconceptionsContent", data.misconceptions);
    setElementContent("howToFixContent", data.howToFix);
    setElementContent("gameContent", data.game);
    setElementContent("worksheetsContent", data.worksheets);
    setElementContent("videosContent", data.videos);
    setElementContent("websitesContent", data.websites);

    })
    .catch(error => {
    console.error("Error fetching content:", error);
    });


// set the html of the main file for each paragraph in the json. It also checks the element exists
function setElementContent(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    let html = "";

    for (let i = 0; i < content.length; i++) {
      const paragraph = content[i].text.join("");
      const image = content[i].image;
      const title = content[i].title
      const imageClass = i % 2 === 0 ? 'image-left' : 'image-right';
      if (title) {
        html += `<h3>${title}</h3>`
      }

      if (image && image.src != "") {
        html += `<img class="${imageClass}" src="${image.src}" alt="${image.alt}">`;
      }

      html += `<p>${paragraph}</p><br>`;
    }
    element.innerHTML = html;
  }
}