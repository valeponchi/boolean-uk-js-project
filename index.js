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
      },
    },
  ],
};

const headerEl = document.querySelector("header");
const asideEl = document.querySelector(".aside");
const mainEl = document.querySelector(".main");

render();

function render() {
  getUserInfo().then(function (accounts) {
    console.log(accounts);
    renderUserAccount(accounts);
    createForm();
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
  let imageEl = document.createElement(`input`);
  imageEl.setAttribute(`class`, `post-image`);
  imageEl.setAttribute(`src`, ``); // TO WRITE WHAT IS NEEDED HERE
  imageEl.setAttribute(`alt`, `post image`);

  //COMMENT:
  let labelComment = document.createElement(`label`);
  labelComment.setAttribute(`for`, `post-commnet`);
  labelComment.innerText = "Content:";

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
}

function getFilmInfo() {}

function renderCard() {}
