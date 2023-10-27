const gamesContainer = document.querySelector('.gamecontainer');



/* Adds Element BEFORE NeighborElement */
Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
}, false;

/* Adds Element AFTER NeighborElement */
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;



// Fetch the games data from a JSON file
fetch('/static/json/games.json')
  .then((res) => res.json())
  .then((games) => {
    // Loop through each game and create a new game element for it
    games.forEach((game) => {
      const gameEl = document.createElement('li');
      gameEl.innerHTML = `<div class="gamecard"><a href="#" onclick="localStorage.setItem('currentgame', '${game.url}'); location.href='play.html';">${game.name}</a><img src="${game.img}" class="gameimage"/><div class="gameinfo"><b><p class="gamename">${game.name}</p></b><p class="gamedesc">${game.desc}</p></div></div>`;
      document.getElementById('gamescontainer').appendChild(gameEl);
    });
  })
  .catch((e) => {
    console.error('Could not load games. '+e);
  });