// ========== Variables =============
let dropDownBar = document.querySelector(".drop-down")
let menueList = document.querySelector(".nav .container")
let categories = Array.from(document.querySelectorAll(".cat ul li"))




// ====== Drop Down Nav menu ========
function showDropDown() {
  menueList.classList.toggle("open")
}
dropDownBar.addEventListener("click",showDropDown)



// // ===== CHANGE CATEGORY ===========
categories.forEach(cat => {
  cat.addEventListener("click", (e) => {
    categories.forEach(cat => {
      cat.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
  })
});







//  ============== show data =================
let card = document.querySelector(".games .row")
card.innerHTML = ``
class Games {
  constructor(title,thumbnail,short_description,genre,platform) {
    this.title = title
    this.img = thumbnail
    this.short_description = short_description
    this.genre = genre
    this.platform = platform
  }

  async getApi(link, options) {
    let response = await fetch(link, options)
    this.data = await response.json()
  }

  async getApi(apiLink, options) {
    const response = await fetch(this.apiLink, this.options);
    const data = await response.json()
    return data
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



function fetchGames() {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ff5b5ac439mshe21b66bd8688838p1c2d30jsnec74015b1fe3',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const apiLink = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter`
  const game = new Games.getApi(apiLink, options)
}





// async function getApi() {
  // console.log(cat);
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': 'ff5b5ac439mshe21b66bd8688838p1c2d30jsnec74015b1fe3',
  //     'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
  //   }
  // };

  // const apiLink = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter`, options);
  // const response = await apiLink.json()
  // console.log(response);



  // Show Data
  // for(let i =0; i< response.length; i++) {
  //   let title = response[i].title
  //   let img = response[i].thumbnail
  //   let shDesc = response[i].short_description
  //   let gen = response[i].genre
  //   let plat = response[i].platform
  //   var game = new Games(title, img, shDesc, gen, plat)
  //   game.displayGameData()
  // }
// }
