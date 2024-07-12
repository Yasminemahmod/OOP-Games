// ========== Variables =============
let dropDownBar = document.querySelector(".drop-down")
let menueList = document.querySelector(".nav .container")
let categories = Array.from(document.querySelectorAll(".cat ul li"))
let loader = document.querySelector(".loader-cover")
let closeBtn = document.querySelector(".close")
// loader.classList.add("d-none")




// ====== Drop Down Nav menu ========
function showDropDown() {
  menueList.classList.toggle("open")
}
dropDownBar.addEventListener("click",showDropDown)


// Add Active Class
let allGames = document.querySelector(".all-games")
let gameDetailsPage = document.querySelector(".details")
categories.forEach(cat => {
  if(cat.classList.contains("active")) {
    getApi("MMORPG")
  }
  cat.addEventListener("click", (e) => {
    categories.forEach(cat => {
      cat.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
    card.innerHTML = ``
    getApi(e.currentTarget.innerText)
  })
});



closeBtn.addEventListener("click", () => {
  allGames.classList.remove("d-none")
  gameDetailsPage.classList.add("d-none")
})




//  ============== show Data =================
let card = document.querySelector(".games .row")
let gameDetails = document.querySelector(".details .game-det")
console.log(gameDetails);

class Games {
  constructor(title,thumbnail,short_description,genre,platform) {
    this.title = title
    this.img = thumbnail
    this.short_description = short_description
    this.genre = genre
    this.platform = platform
  }

  
  displayGameData() {
    card.innerHTML += `
    <div class="game-card col-12 col-md-6 col-lg-4 col-xl-3"> 
      <div class="game text-white border border-dark border-1 pt-3 px-3 rounded-top-3">
        <div class="img overflow-hidden rounded-top-2">
          <img src="${this.img}" alt="${this.title} cover">
        </div>
        <div class="game-title mt-3 d-flex justify-content-between align-items-center">
          <h6 class="game-name">${this.title}</h6>
          <h6 class="paid-status p-2 rounded-2">Free</h6>
        </div>
        <p class="sub-disc text-center fw-bold">${this.short_description.split(" ",8)}</p>
      </div>
      <div class="game-down d-flex px-4 justify-content-between pt-2 text-white rounded-bottom-3 border border-top-0 border-dark">
        <h6 class="p-2 rounded-2">${this.genre}</h6>
        <h6 class="p-2 rounded-2">${this.platform}</h6>
      </div>
    </div>
    `
  }


}

class GameDet extends Games {
  constructor(title,status,thumbnail,description,genre,platform,freetogame_profile_url) {
    super(title,thumbnail)
    this.genre = genre
    this.status = status
    this.desc = description
    this.platform = platform
    this.url = freetogame_profile_url
  }
  
  showDetails() {
    console.log(this.url);
    gameDetails.innerHTML = `
      <div class="row g-4">
        <div class="img col-12 col-md-4">
          <img src="${this.img}" alt="${this.title} cover">
        </div>
        <div class="det col-12 col-md-8 text-white">
          <h4 class="text-capitalize mb-3">title: ${this.title}</h4>
          <h6 class="text-capitalize mb-3">category: <span>${this.genre}</span></h6>
          <h6 class="text-capitalize mb-3">platform: <span>${this.platform}</span></h6>
          <h6 class="text-capitalize mb-3">status: <span>${this.status}</span></h6>
          <p>${this.desc}</p>
          <a class="btn border border-warning border-1 text-white" href="${this.url}" target="_blank">show game</a>
        </div>
      </div>
    `
  }
}

// ========= Fetch API Data =========
// Section One
async function getApi(cat) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ff5b5ac439mshe21b66bd8688838p1c2d30jsnec74015b1fe3',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const apiLink = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options);
  const response = await apiLink.json()


  function showLoader() {
    loader.classList.remove("d-none")
    if(apiLink.ok) {
      loader.classList.add("d-none")
    }
  }
  showLoader()

      // Show Data
    for(let i =0; i< response.length; i++) {
      let title = response[i].title
      let img = response[i].thumbnail
      let shDesc = response[i].short_description
      let gen = response[i].genre
      let plat = response[i].platform
      var game = new Games(title, img, shDesc, gen, plat)
      game.displayGameData()
      let gameCards = document.querySelectorAll(".game-card")
      gameCards.forEach((gameCard, i) => {
        gameCard.addEventListener("click", () => {
          console.log(response[i].id)
          getGameDet(response[i].id)
          allGames.classList.add("d-none")
          gameDetailsPage.classList.remove("d-none")
          showLoader()
        })
      })
      
    }
}




// Section Two
async function getGameDet(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ff5b5ac439mshe21b66bd8688838p1c2d30jsnec74015b1fe3',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };  

  let resp = await fetch(url, options)
  let data = await resp.json()
  let title = data.title
  let status = data.status
  let img = data.thumbnail
  let desc = data.description
  let genre = data.genre
  let plat = data.platform
  let gameUrl = data.freetogame_profile_url
  var gameDet = new GameDet(title, status, img, desc,genre, plat,gameUrl)
  gameDet.showDetails()


  console.log(data.genre);

}


