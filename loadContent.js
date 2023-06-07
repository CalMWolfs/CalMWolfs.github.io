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

// Not doing this on the game page
if (pageName != 'game.html') {

  // Drawing the bubbles
  const div = document.getElementById("bubbles")
  let html = "";

  for (let i = 0; i < 30; i++) {
    const top = Math.floor(Math.random() * 50) + 55;
    const left = Math.floor(Math.random() * 90) + 5;
    const animation = (Math.floor(Math.random() * 14) + 6) / 2;
    const scale = Math.floor(Math.random() * 2);

    styleLine = `top: ${top}%;left: ${left}%;animation: animate ${animation}s linear infinite;transform: scale(${scale})`
    html += `<div style="${styleLine}"><span class="dot"></span></div>`
  }
  div.innerHTML = html;

  const tableOfContents = document.getElementById("contentsTable")
  const sections = document.getElementsByTagName("section")
  html = "";
  for (let i = 0; i < sections.length; i++) {
    console.log(sections[i].id)
    html += `<b href="#${sections[i].id}">${sections[i].id}</b>`
  }
  tableOfContents.innerHTML = html;
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