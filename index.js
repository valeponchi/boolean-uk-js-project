// 1 create header which includes the user account,
// 2 create a filter and form on the aside
// 3 render in the main section, in this way we only render main section which is easier to read

// some css is already added, feel free to change it


//GENERAL VARIABLES:
const headerEl = document.querySelector("header");
const asideEl = document.querySelector(".aside");
const mainEl = document.querySelector(".main");
const mainRenderSection = document.querySelector(".mainrendersection");

//STATE:
let state = {
  users: 
  [
    {
      id: 1,
      name: "Valentina",
    },
    {
      id: 2,
      name: "Linlin",
    },
  ],
  posts: 
  [
    {
      id: 1,
      userId: 1,
      postTitle: "",
      image: "",
      genre: "",
      comment: "",
      // animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
      rating: 0, // 3/5 star star star,
      animeInfo: 
      {
        title: "", 
        originalTitle: "",
        director: "",
        description: "",
      },
    },
  ],

  niceFilmsFromAPI: [],

  activeUser: {
    id: "",
    name: "",
  },
};


render();

//RENDER FUNCTION:
function render() {
  //users section
  getUserInfo().then(function (accounts) {
    console.log(`fetch users: `,accounts);
    renderUserAccount(accounts);
  });
  
  //films-form section
  getFilmInfo().then(function(){
    createForm(state.niceFilmsFromAPI);
  })
}


//FILM DATA
function getFilmInfo() {
  let uglyFilmsData = {}

  return fetch(`https://ghibliapi.herokuapp.com/films/`)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (filmsFromAPI) {
      uglyFilmsData = filmsFromAPI
      console.log(`Ugly Films Data from API: `, uglyFilmsData);
      state.niceFilmsFromAPI = uglyFilmsData.map(function (element) {
        return transformUglyFilmAPI(element)
      })
      console.log(`state.niceFilmsFromAPI: `, state.niceFilmsFromAPI);

    });
}
//takes each ugly film element and transforms it into a nice one: 
function niceFilmsFromAPIinState() {
  state.uglyFilmsFromAPI.map(function (element) {
    state.niceFilmsFromAPI =  transformUglyFilmAPI(element)
    console.log(`state.niceFilmsFromAPI: `, state.niceFilmsFromAPI);
    //NOW WE HAVE A NICE AND ORGANISED LIST OF DATA FETCHED FROM THE API
  })
}
//takes ugly-data from API and organise it in better way.
function transformUglyFilmAPI(uglyFilmAPI) {
  let nicelyTransformedFilm = {
   id: uglyFilmAPI.id,
   title: uglyFilmAPI.title,
   originalTitle: uglyFilmAPI.original_title,
   characters: uglyFilmAPI.people,
   releaseDate: uglyFilmAPI.release_date,
   description: uglyFilmAPI.description,
   director: uglyFilmAPI.director
  }
   for (const key in uglyFilmAPI) {
        const value = uglyFilmAPI[key] 
  
        }
  return nicelyTransformedFilm
}



//ASIDE FORM FUNCTION:
function createForm(films) {
  //FORM TITLE:
  let formTitle = document.createElement(`h2`)
  formTitle.setAttribute(`class`, `form-title`)
  formTitle.innerText = "Create your journal entry:"

  //FORM:
  let formEl = document.createElement(`form`);
  formEl.setAttribute(`class`, `form`)
  formEl.setAttribute(`id`, `form`);
  // formEl.setAttribute(`autocomplete`, `off`);

  //FILM TITLE:
  let filmTitleLabelEl = document.createElement(`label`);
  filmTitleLabelEl.setAttribute(`for`, `post-title`);
  let filmTitleLabelH3 = document.createElement(`h3`)
  filmTitleLabelH3.setAttribute(`class`, `pick-a-title`)
  filmTitleLabelH3.innerText = "Pick a film title: ";

  let filmTitleSelectEl = document.createElement(`select`);
  filmTitleSelectEl.setAttribute(`name`, `post-title`);
  filmTitleSelectEl.setAttribute(`id`, `post-title`);

  for (const film of films) {
   let title = film.title
   let filmTitleType = document.createElement(`option`)
   filmTitleType.setAttribute(`value`, title)
   filmTitleType.innerText = title
   filmTitleType.required = true

   filmTitleSelectEl.append(filmTitleType)
  }

  //IMAGE:
  let imageLabel = document.createElement(`label`);
  imageLabel.setAttribute(`for`, `form-image`);
  let imageLabelH3 = document.createElement(`h3`)
  imageLabelH3.setAttribute(`class`, `form-image`)
  imageLabelH3.innerText = "Comment:";
  imageLabelH3.innerText = "Image: "

  let imageInput = document.createElement(`input`)
  imageInput.setAttribute(`id`, `form-image`);
  imageInput.setAttribute(`name`, `form-image`);
  imageInput.setAttribute(`type`, `url`);
  imageInput.required = true
  imageInput.setAttribute(`placeholder`, `image URL`);


  //CONTENT:
  let labelComment = document.createElement(`label`);
  labelComment.setAttribute(`class`, `form-comment`)
  labelComment.setAttribute(`for`, `form-comment`);
  let labelCommentH3 = document.createElement(`h3`)
  labelCommentH3.setAttribute(`class`, `form-comment`)
  labelCommentH3.innerText = "Comment:";

  let inputComment = document.createElement(`input`);
  inputComment.setAttribute(`id`, `form-comment`);
  inputComment.setAttribute(`name`, `form-comment`);
  inputComment.setAttribute(`type`, `text`);
  inputComment.required = true;
  inputComment.setAttribute(`placeholder`, `write comment here..`);


  let formBtn = document.createElement(`button`)
  formBtn.setAttribute(`class`, `form-btn`)
  formBtn.innerText = "CREATE"

  //APPEND:
  filmTitleLabelEl.append(filmTitleLabelH3)
  labelComment.append(labelCommentH3)
  imageLabel.append(imageLabelH3)

  formEl.append(
    filmTitleLabelEl,
    filmTitleSelectEl,
    imageLabel,
    imageInput,
    labelCommentH3,
    inputComment,
    formBtn
  )

  asideEl.append(formTitle, formEl);
  
  //EVENT LISTENER ON THE FORM
}

//FETCH USERS
function getUserInfo() {
  return fetch("http://localhost:3000/users").then(function (resp) {
    return resp.json();
  });
}

//USERS ACCOUNT FUNCTIONS:
function renderUserAccount(accounts) {
  accounts.map(function (account) {
    createUserAccount(account.name);
  });
}

function createUserAccount(name) {
  let userAccountdivEl = document.createElement("div");
  userAccountdivEl.className = "userdiv";

  let userSpanName = document.createElement("span");
  userSpanName.innerText = name;

  userAccountdivEl.append(userSpanName);
  headerEl.append(userAccountdivEl);
}

//   journalList.append(
//     journalReviewTitle,
//     ratingSection,
//     journalTitle,
//     journalContent,
//     journalBtns,
//     filmPicture,
//     filmDescription
//   );
//   mainRenderSection.append(journalList);
// }

// // postTitle: "My favourite Anime",
// // image: "", should be a url
// // genre: "romance/action/funny/",
// // content: "I really loved FullMetal Alchimist",
// // animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
// // rating: 3, //3/5 star star star,

// let singlePost = {
//   id: 1,
//   userId: 1,
//   postTitle: "My favourite Anime",
//   genre: "comedy",
//   image: "https://cdn.wallpapersafari.com/8/37/kpetxK.png",
//   content: "I really loved FullMetal Alchimist",
//   animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
//   rating: 3,
//   animeInfo: {
//     title: "Castle in the Sky",
//     originalTitle: "天空の城ラピュタ",
//     director: "Hayao Miyazaki",
//     description:
//       "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
//   },
// };

// renderCard(singlePost);

// let singlePost3 = {
//   id: 1,
//   userId: 1,
//   postTitle: "My favourite Anime",
//   genre: "comedy",
//   image: "https://cdn.wallpapersafari.com/8/37/kpetxK.png",
//   content: "I really loved FullMetal Alchimist",
//   animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
//   rating: 2,
//   animeInfo: {
//     title: "Castle in the Sky",
//     originalTitle: "天空の城ラピュタ",
//     director: "Hayao Miyazaki",
//     description:
//       "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
//   },
// };
// renderCard(singlePost3);
// >>>>>>> master
