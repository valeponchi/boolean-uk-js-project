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
      genre: "anime",
      comment: "I really loved FullMetal Alchimist",
      animeId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
      rating: 1,
      animeInfo: {
        title: "",
        originalTitle: "",
        director: "",
      },
    },
  ],
};

const headerEl = document.querySelector("header");
const asideEl = document.querySelector("aside");
const mainEl = document.querySelector("main");

console.log(headerEl);

// this is to get user infomation
function getUserinfo() {
  return fetch("http://localhost:3000/users").then(function (resp) {
    return resp.json();
  });
}
getUserinfo().then(function (accounts) {
  console.log(accounts);
  renderUserAccount(accounts);
});

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
