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
    setElementContent("aboutContent", data.about);
    setElementContent("causesContent", data.causes);
    setElementContent("effectsContent", data.effects);
    setElementContent("contributeContent", data.contribute);
    setElementContent("aboutProjectContent", data.aboutProject);
    setElementContent("aboutMeContent", data.aboutMe);
    setElementContent("informationContent", data.information);
    setElementContent("caseStudy1Content", data.case1);
    setElementContent("caseStudy2Content", data.case2);
    setElementContent("specificExample1Content", data.specific1);
    setElementContent("specificExample2Content", data.specific2);
    setElementContent("moreSolutionsContent", data.moreSolutions);
    setElementContent("funfactsContent", data.funfacts);
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
      const imageClass = i % 2 === 0 ? 'image-left' : 'image-right';
      if (image) {
        html += `<img class="${imageClass}" src="${image.src}" alt="${image.alt}">`;
      }

      html += `<p>${paragraph}</p><br>`;

    }
    element.innerHTML = html;
  }
}