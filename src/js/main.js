"use strict";

fetchAndReturnObject("https://api.punkapi.com/v2/beers").then((response) => {
  insertElements(response);
});

//lägg till felhantering!
async function fetchAndReturnObject(url) { 
  let response = await fetch(url);
  return await response.json();
}

module.exports = fetchAndReturnObject; //ta bort sen

//Lägg till parametrar för hur många items och från vilket item den ska börja
function insertElements(array) {
  let cardContainer = document.querySelector(".card-container");

  for (let i = 0; i < array.length; i++) {
    let beerImageSource = array[i].image_url;
    let beerName = array[i].name;
    let tagline = array[i].tagline;
    let beerDate = array[i].first_brewed;
    let alcoholContent = array[i].abv + "%";
    let ibu = array[i].ibu ? array[i].ibu : "Unknown";
    let beerDescription = array[i].description;
    let maltArray = array[i].ingredients.malt;
    let maltString = "";

    for (let i = 0; i < maltArray.length; i++) {
      let name = maltArray[i].name;
      if (i != maltArray.length - 1) {
        name += ", ";
      }
      maltString += name;
    }

    cardContainer.innerHTML += `
      <div class="card">
        <div class="img-wrapper">
          <img src="${beerImageSource}" class="card-img-top" alt="A picture of ${beerName}" />
        </div>
        <div class="card-body">
          <h2 class="card-title">${beerName}</h2>
          <p class="tagline">${tagline}</p>
          <ul class="Info">
            <li>${beerDate}</li>
            <li>ABV: ${alcoholContent}</li>
            <li>IBU: ${ibu}</li>
            <li>Malt: ${maltString}</li>
          </ul>
          <p class="description">${beerDescription}</p>
            <div class="button-wrapper">
              <button type="button" class="btn">Add to favorites</button>
            </div>
        </div>
      </div>
    `;
  }
}