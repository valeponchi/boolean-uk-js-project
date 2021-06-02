// 1 create header which includes the user account,
// 2 create a filter and form on the aside
// 3 render in the main section, in this way we only render main section which is easier to read

// some css is already added, feel free to change it

let state = {
  users: [
    {
      id: 1,
      name: "Valentina",
    },
    {
      id: 2,
      name: "Linlin",
    },
  ],
  posts: [
    {
      id: 1,
      userId: 1,
      postTitle: "My favourite Anime",
      image: "",
      genre: "romance/action/funny/",
      content: "I really loved FullMetal Alchimist",
      animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
      rating: 3, //3/5 star star star,
      animeInfo: {
        title: "",
        originalTitle: "",
        director: "",
        description: "",
      },
    },
  ],
};

const headerEl = document.querySelector("header");
const asideEl = document.querySelector(".aside");
const mainEl = document.querySelector(".main");
const mainRenderSection = document.querySelector(".mainrendersection");

render();

function render() {
  getUserInfo().then(function (accounts) {
    console.log(accounts);
    renderUserAccount(accounts);
    // createForm();
  });
}

// this is to get user infomation
function getUserInfo() {
  return fetch("http://localhost:3000/users").then(function (resp) {
    return resp.json();
  });
}

//this is to render user account in the header like instalgram
function renderUserAccount(accounts) {
  accounts.map(function (account) {
    createUserAccount(account.name);
  });
}

// create a single user on the header
function createUserAccount(name) {
  let userAccountdivEl = document.createElement("div");
  userAccountdivEl.className = "userdiv";

  let userSpanName = document.createElement("span");
  userSpanName.innerText = name;

  userAccountdivEl.append(userSpanName);
  headerEl.append(userAccountdivEl);
}

// create a form in the aside

function createForm() {
  let formEl = document.createElement(`form`);
  formEl.setAttribute(`class`, `journal-form`);

  //TITLE:
  let labelPostTitle = document.createElement(`label`);
  labelPostTitle.setAttribute(`for`, `post-title`);
  labelPostTitle.innerText = "Title:";

  let inputPostTitle = document.createElement(`input`);
  inputPostTitle.setAttribute(`id`, `post-title`);
  inputPostTitle.setAttribute(`name`, `post-title`);
  inputPostTitle.setAttribute(`type`, `text`);
  inputPostTitle.required = true;

  //IMAGE:
  let imageEl = document.createElement(`img`);
  imageEl.setAttribute(`class`, `post-image`);
  imageEl.setAttribute(`src`, ``); // TO WRITE WHAT IS NEEDED HERE
  imageEl.setAttribute(`alt`, `post image`);

  //COMMENT:
  let labelComment = document.createElement(`label`);
  labelComment.setAttribute(`for`, `post-commnet`);
  labelComment.innerText = "Comment:";

  let inputComment = document.createElement(`input`);
  inputComment.setAttribute(`id`, `post-comment`);
  inputComment.setAttribute(`name`, `post-comment`);
  inputComment.setAttribute(`type`, `text`);
  inputComment.required = true;

  let labelAnimeId = document.createElement(`label`);
  labelAnimeId.setAttribute(`for`, `anime-id`);
  labelAnimeId.innerText = "Anime Id: ";

  let inputAnimeId = document.createElement(`input`);
  inputAnimeId.setAttribute(`id`, `anime-id`);
  inputAnimeId.setAttribute(`name`, `anime-id`);
  inputAnimeId.setAttribute(`type`, `text`);

  //APPEND:
  formEl.append(
    labelPostTitle,
    inputPostTitle,
    imageEl,
    labelComment,
    inputComment,
    labelAnimeId,
    inputAnimeId
  );
  asideEl.append(formEl);

  // comment: "I really loved FullMetal Alchimist",
  // animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  // rating: 1,
  formEl
    .addEventListener
    // getUserInfo(idinfo).then(function (filmInfo)
    ();
}
// idinfo = form.animeid
// this function is inside the form

// function getFilmInfo(idinfo) {
//   return fetch(`https://ghibliapi.herokuapp.com/films/${idinfo}`)
//     .then(function (filmDataFromServer) {
//       return filmDataFromServer.json();
//     })
//     .then(function (resp) {
//       console.log(resp);
//     });
// }

// getUserInfo(idinfo).then(function (filmInfo) {

//   let post = {
//     id: 1,
//     userId: 1, //todo
//     postTitle: form.post-title.value,
//     image:form. ,
//     genre: all stuff from form ,
//     content: form.content,
//     animeId: form.animeid etc,
//     rating: , //3/5 star star star,
//     animeInfo: ''
//   }
//   post.animeInfo = filmInfo;

//   post this post to our own server

//   state.posts.push(post)

//   renderCards(state.posts)
// });

// form(data from server) inside the form we can get the nicefilmapi, genre, title, etc then post to server/ state.posts/ then renderposts

// posts should be state.posts and film should from the form
// or we dont need to renderposts in here, can just render one card based on the form
// use filter to find the data we look for

let filmName = formel.name of the select .value;
let selectedFilm = films.filter(function (film) {
  return film.title === filmName;
});

function renderCards(posts,selectedFilm) {
  posts.map(renderCard);
}

let singlePost = {
  id: 1,
  userId: 1,
  image:
    "https://www.plantemoran.com/-/media/images/insights-images/2018/04/thinking-about-becoming-a-smart-city.jpg?h=704&w=1100&hash=D5677DCC5CE6DF0C080CFAB8CC3EB10E",
  genre: "romance",
  content: "I really loved FullMetal Alchimist",
  // animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  rating: 3,
  animeInfo: {
    title: "city in the sky",
    originalTitle: "hashashashsa",
    director: "agsasgasgasgas",
    description: "asgaghhasgsa",
  },
};

// renderCard(singlePost);

//   post this post to our own server

function renderCard(formInfo, selectedFilm) {
  let journalList = document.createElement("li");
  journalList.className = "journallist";

  let journalReviewTitle = document.createElement("h3");
  journalReviewTitle.innerText = `Review of`;

  let spanFilmName = document.createElement("span");
  spanFilmName.className = "filmname";
  //need to change
  spanFilmName.innerText = selectedFilm.title;

  let originalTitle = document.createElement("p");
  originalTitle.innerText = film.originalTitle;

  journalReviewTitle.append(spanFilmName, originalTitle);

  let ratingSection = document.createElement("div");
  ratingSection.className = "ratediv";

  let ratingScore = document.createElement("p");

  ratingScore.className = " ratingScore";
  //need to change
  ratingScore.innerText = `Rating: ${formInfo.rating} `;

  let svgel = document.createElement("img");
  svgel.setAttribute("class", "ratingstar");

  //put how may stars
  if (formInfo.rating >= 3) {
    svgel.setAttribute("src", "image/rate.svg");

    ratingScore.append(svgel);
  }
  //need to change
  let genre = document.createElement("span");
  genre.innerText = formInfo.genre;

  ratingSection.append(ratingScore, genre);

  let journalBtns = document.createElement("div");
  journalBtns.className = "buttonsection";

  let deleteBTn = document.createElement("button");
  deleteBTn.className = "deleteBTn";
  deleteBTn.innerText = "DELETE";

  //todo delete the post to the server then update the state then rendercards

  let editBTn = document.createElement("button");
  editBTn.innerText = "Edit";

  journalBtns.append(editBTn, deleteBTn);
  //todo create a form to edit then update to server then update to the state then rendercards

  let journalContent = document.createElement("p");
  journalContent.className = "journalContent";

  //need to change

  journalContent.innerText = formInfo.comment;

  let journalBtns = document.createElement("div");

  let filmPicture = document.createElement("img");
  filmPicture.setAttribute("class", "filmpicture");
  filmPicture.setAttribute("src", formInfo.image);

  let filmDescription = document.createElement("p");
  filmDescription.innerText = "Description";
  filmDescription.className = " filmDescription";
  filmDescription.innerText = "Description: ";

  let spanDescription = document.createElement("span");
  // change
  spanDescription.innerText = selectedFilm.description;
  // change
  filmDirector.innerText = selectedFilm.director;

  journalList.append(
    journalReviewTitle,
    ratingScore,
    ratingSection,
    journalContent,
    journalBtns,
    filmPicture,
    filmDescription
  );
  mainRenderSection.append(journalList);
}
