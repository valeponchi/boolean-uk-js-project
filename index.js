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

  //CONTENT:
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
function getFilmInfo(idinfo) {
  return fetch(`https://ghibliapi.herokuapp.com/films/${idinfo}`)
    .then(function (filmDataFromServer) {
      return filmDataFromServer.json();
    })
    .then(function (resp) {
      console.log(resp);
    });
}

// uncompleted function

// getUserInfo(idinfo).then(function (filmInfo) {

//   let post = {
//     id: 1,
//     userId: 1, //todo
//     postTitle: form.post-title.value,
//     image:form.image ,
//     genre: form.select.value ,
//     content: form.content,
//     animeId: form.animeid,
//     rating: , form.rating,
//     animeInfo: ''
//   }

// let simplifiedFilmInfo = {
//   id: filmInfo.id or form.animeID,
//   title: filmInfo.title,
//   orginalTitle: filmInfo.original_title,
//   director: filmInfo.director,
//   description: filmInfo.description
// }
//   post.animeInfo = filmInfo;

//   post this post to our own server

//   state.posts.push(post)

//   renderCards(state.posts)
// });

function renderCards(posts) {
  posts.map(renderCard);
}

getFilmInfo("2baf70d1-42bb-4437-b551-e5fed5a87abe");

function renderCard(post) {
  let journalList = document.createElement("li");
  journalList.className = "journallist";

  let journalReviewTitle = document.createElement("h3");
  journalReviewTitle.innerText = `Review of `;

  let spanFilmName = document.createElement("span");
  spanFilmName.className = "filmname";
  spanFilmName.innerText = post.animeInfo.title;

  let originalTitle = document.createElement("p");
  originalTitle.innerText = post.animeInfo.originalTitle;

  journalReviewTitle.append(spanFilmName, originalTitle);

  let ratingSection = document.createElement("div");
  ratingSection.className = "ratediv";

  let ratingScore = document.createElement("p");
  ratingScore.className = " ratingScore";
  ratingScore.innerText = `Rating: ${post.rating} `;

  let svgel = document.createElement("img");
  svgel.setAttribute("class", "ratingstar");

  //put how may stars
  if (post.rating >= 3) {
    svgel.setAttribute("src", "image/rate.svg");

    ratingScore.append(svgel);
  }

  let genre = document.createElement("span");
  genre.innerText = post.genre;

  ratingSection.append(ratingScore, genre);

  let journalTitle = document.createElement("h3");

  journalTitle.innerText = "Title: ";

  let journalSpanTitle = document.createElement("span");
  journalSpanTitle.className = "titleofjournal";
  journalSpanTitle.innerText = post.postTitle;
  journalTitle.append(journalSpanTitle);

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
  journalContent.innerText = post.content;

  let filmPicture = document.createElement("img");
  filmPicture.setAttribute("class", "filmpicture");
  filmPicture.setAttribute("src", post.image);

  let filmDescription = document.createElement("p");
  filmDescription.className = " filmDescription";
  filmDescription.innerText = "Description: ";

  let spanDescription = document.createElement("span");
  spanDescription.innerText = post.animeInfo.description;

  filmDescription.append(spanDescription);

  let filmDirector = document.createElement("p");

  filmDirector.innerText = post.animeInfo.director;

  journalList.append(
    journalReviewTitle,
    ratingSection,
    journalTitle,
    journalContent,
    journalBtns,
    filmPicture,
    filmDescription
  );
  mainRenderSection.append(journalList);
}

// postTitle: "My favourite Anime",
// image: "", should be a url
// genre: "romance/action/funny/",
// content: "I really loved FullMetal Alchimist",
// animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
// rating: 3, //3/5 star star star,

let singlePost = {
  id: 1,
  userId: 1,
  postTitle: "My favourite Anime",
  genre: "comedy",
  image: "https://cdn.wallpapersafari.com/8/37/kpetxK.png",
  content: "I really loved FullMetal Alchimist",
  animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  rating: 3,
  animeInfo: {
    title: "Castle in the Sky",
    originalTitle: "天空の城ラピュタ",
    director: "Hayao Miyazaki",
    description:
      "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
  },
};

renderCard(singlePost);

let singlePost3 = {
  id: 1,
  userId: 1,
  postTitle: "My favourite Anime",
  genre: "comedy",
  image: "https://cdn.wallpapersafari.com/8/37/kpetxK.png",
  content: "I really loved FullMetal Alchimist",
  animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  rating: 2,
  animeInfo: {
    title: "Castle in the Sky",
    originalTitle: "天空の城ラピュタ",
    director: "Hayao Miyazaki",
    description:
      "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
  },
};
renderCard(singlePost3);
