//GENERAL VARIABLES:
const headerEl = document.querySelector("header");
const asideEl = document.querySelector(".aside");
const mainEl = document.querySelector(".main");
const mainRenderSection = document.querySelector(".main-render-section");
const journalUlList = document.querySelector(".journal-ul-list");

//STATE:
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
  posts: [],

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
    console.log(`fetch users: `, accounts);
    renderUserAccount(accounts);
    renderPostsFromServer()
  });

  //films-form section
  getFilmInfo().then(function () {
    createForm(state.niceFilmsFromAPI);
  });
}

//FETCH FILM DATA
function getFilmInfo() {
  let uglyFilmsData = {};

  return fetch(`https://ghibliapi.herokuapp.com/films/`)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (filmsFromAPI) {
      uglyFilmsData = filmsFromAPI;
      console.log(`Ugly Films Data from API: `, uglyFilmsData);
      state.niceFilmsFromAPI = uglyFilmsData.map(function (element) {
        return transformUglyFilmAPI(element);
      });
      console.log(`state.niceFilmsFromAPI: `, state.niceFilmsFromAPI);
    });
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
    director: uglyFilmAPI.director,
  };

  return nicelyTransformedFilm;
}

//GET POSTS FROM SERVER
function renderPostsFromServer() {
  fetch(`http://localhost:3000/posts`).then(function (response) {
    return response.json()
    .then(function(postData){
      for (const post of postData) {
        renderCard(post)
      }
    })
  })
}

//CREATE FUNCTIONS:
//ASIDE FORM FUNCTION:
function createForm(films) {
  //FORM TITLE:
  let formTitle = document.createElement(`h2`);
  formTitle.setAttribute(`class`, `form-title`);
  formTitle.innerText = "Create your journal entry:";

  //FORM:
  let formEl = document.createElement(`form`);
  formEl.setAttribute(`class`, `form`);
  formEl.setAttribute(`id`, `form`);
  // formEl.setAttribute(`autocomplete`, `off`);

  formEl.addEventListener(`submit`, function (e) {
    e.preventDefault();

    let foundFilm = state.niceFilmsFromAPI.find(
      (film) => film.title === filmTitleSelectEl.value
    );

    let newPost = {
      id: foundFilm.id,
      userId: "", //we need to figure our how to make this the selected User Id
      image: imageInput.value,
      genre: genreSelectEl.value,
      content: inputComment.value,
      rating: rating.value,
      animeInfo: {
        title: foundFilm.title,
        originalTitle: foundFilm.originalTitle,
        director: foundFilm.director,
        description: foundFilm.description,
      },
    };
  
    //SAVE NEWPOST INTO THE SERVER
    fetch(`http://localhost:3000/posts`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(function (response) {
      return response.json()
    })
    //I RENDER THE PAGE WITH THE NEW POST
    .then(function (newPostFromServer) {
      renderCard(newPostFromServer);
    })

      formEl.reset()
}) //event listener closing

  //FILM TITLE:
  let filmTitleLabelEl = document.createElement(`label`);
  filmTitleLabelEl.setAttribute(`for`, `post-title`);
  let filmTitleLabelH3 = document.createElement(`h3`);
  filmTitleLabelH3.setAttribute(`class`, `pick-a-title`);
  filmTitleLabelH3.innerText = "Pick a film title: ";

  let filmTitleSelectEl = document.createElement(`select`);
  filmTitleSelectEl.setAttribute(`name`, `post-title`);
  filmTitleSelectEl.setAttribute(`id`, `post-title`);

  for (const film of films) {
    let title = film.title;
    let filmTitleType = document.createElement(`option`);
    filmTitleType.setAttribute(`value`, title);
    filmTitleType.innerText = title;
    filmTitleType.required = true;

    filmTitleSelectEl.append(filmTitleType);
  }

  //FILM GENRE
  let genreLabel = document.createElement(`label`);
  genreLabel.setAttribute(`for`, `genre`);
  let genreLabelH3 = document.createElement(`h3`);
  genreLabelH3.setAttribute(`class`, `genre-title`);
  genreLabelH3.innerText = "Select genre: ";
  
  let genreSelectEl = document.createElement(`select`)
  genreSelectEl.setAttribute(`name`, `genre`)
  genreSelectEl.setAttribute(`id`, `genre`)

  let genreRomanceOption = document.createElement(`option`)
  genreRomanceOption.setAttribute(`value`, `romance`)
  genreRomanceOption.innerText = "Romance"
  
  let genreActionOption = document.createElement(`option`)
  genreActionOption.setAttribute(`value`, `action`)
  genreActionOption.innerText = "Action"

  let genreComedyOption = document.createElement(`option`);
  genreComedyOption.setAttribute(`value`, `comedy`);
  genreComedyOption.innerText = "Comedy";

  let genreMagicOption = document.createElement(`option`);
  genreMagicOption.setAttribute(`value`, `magic`);
  genreMagicOption.innerText = "Magic";

  //IMAGE:
  let imageLabel = document.createElement(`label`);
  imageLabel.setAttribute(`for`, `form-image`);
  let imageLabelH3 = document.createElement(`h3`);
  imageLabelH3.setAttribute(`class`, `form-image`);
  imageLabelH3.innerText = "Comment:";
  imageLabelH3.innerText = "Image: ";

  let imageInput = document.createElement(`input`);
  imageInput.setAttribute(`id`, `form-image`);
  imageInput.setAttribute(`name`, `form-image`);
  imageInput.setAttribute(`type`, `url`);
  imageInput.required = true;
  imageInput.setAttribute(`placeholder`, `Image URL`);

  //CONTENT:
  let labelComment = document.createElement(`label`);
  labelComment.setAttribute(`class`, `form-comment`);
  labelComment.setAttribute(`for`, `form-comment`);
  let labelCommentH3 = document.createElement(`h3`);
  labelCommentH3.setAttribute(`class`, `form-comment`);
  labelCommentH3.innerText = "Comment:";

  let inputComment = document.createElement(`textarea`);
  inputComment.setAttribute(`id`, `form-comment`);
  inputComment.setAttribute(`name`, `form-comment`);
  inputComment.setAttribute(`type`, `text`);
  inputComment.setAttribute(`placeholder`, `write comment here..`);
  inputComment.setAttribute(`rows`, `4`);
  inputComment.setAttribute(`cols`, `20`);
  inputComment.required = true;

  //RATING SECTION
  let ratingLabel = document.createElement(`label`)
  ratingLabel.setAttribute(`for`, "rating")
  let ratingTitle = document.createElement(`h3`)
  ratingTitle.setAttribute(`class`, `rating`)
  ratingTitle.innerText = "Rating: "

  let ratingInput = document.createElement(`input`)
  ratingInput.setAttribute(`id`, `rating`)
  ratingInput.setAttribute(`name`, `rating`)
  ratingInput.setAttribute(`type`, `number`)
  ratingInput.setAttribute(`min`, `1`)
  ratingInput.setAttribute(`max`, `5`)
  ratingInput.required = true

  //CREATE POST BUTTON
  let formBtn = document.createElement(`button`);
  formBtn.setAttribute(`class`, `form-btn`);
  formBtn.innerText = "CREATE";
  
  //APPEND
  filmTitleLabelEl.append(filmTitleLabelH3);
  
  genreLabel.append(genreLabelH3);
  genreSelectEl.append(
    genreRomanceOption,
    genreActionOption,
    genreComedyOption,
    genreMagicOption
    );
    
  labelComment.append(labelCommentH3);
  imageLabel.append(imageLabelH3);
  ratingLabel.append(ratingTitle, ratingInput)
  
  formEl.append(
    filmTitleLabelEl,
    filmTitleSelectEl,
    genreLabel,
    genreSelectEl,
    ratingLabel,
    imageLabel,
    imageInput,
    labelCommentH3,
    inputComment,
    formBtn
    );

    asideEl.append(formTitle, formEl);
}

function renderCards(posts) {
  posts.map(renderCard);
}

function renderCard(post) {
  //LI
  let journalList = document.createElement("li");
  journalList.className = "journal-list";

  //LI TITLE
  let journalReviewTitle = document.createElement("h4");
  journalReviewTitle.innerText = `Review of:\n `;

  let spanFilmName = document.createElement("span");
  spanFilmName.className = "film-name";
  spanFilmName.innerText = `${post.animeInfo.title}\n`;

  let originalTitle = document.createElement("p");
  originalTitle.setAttribute(`class`, `original-name`)
  originalTitle.innerText = `Original name: ${post.animeInfo.originalTitle}`;
  
  //APPEND
  journalReviewTitle.append(spanFilmName, originalTitle);

  //RATING SECTION
  let ratingSection = document.createElement("div");
  ratingSection.className = "rate-div";

  let ratingScore = document.createElement("p");
  ratingScore.className = "rating-score";
  ratingScore.innerText = `Rating: ${post.rating}`;
  let svgEl = document.createElement("img");
  svgEl.setAttribute("class", "rating-star");
  
  if (post.rating >= 3) {
    svgEl.setAttribute("src", "image/thumbs-up.svg");

    ratingScore.append(svgEl);
  }
  
  //GENRE
  let genre = document.createElement("span");
  genre.innerText = post.genre;
  
  //APPEND
  ratingSection.append(ratingScore, genre);
  
  //BUTTONS
  let journalBtnsDiv = document.createElement("div");
  journalBtnsDiv.className = "button-section";

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "DELETE";
  //📌 EVENT LISTENER
  // deleteBTn.addEventListener(`click`, function() {
  //   fetch(`http://localhost:3000/posts/${post.id}`, {
  //     method: `DELETE`})

  //   // render()
  // })

  //JOURNAL CONTENT
  let journalContent = document.createElement("p");
  journalContent.className = "journal-content";
  journalContent.innerText = post.content;
  
  //FILM IMG
  let filmPicture = document.createElement("img");
  filmPicture.setAttribute("class", "film-picture");
  filmPicture.setAttribute("src", post.image);
  
  //FILM DESCRIPTION
  let filmDescription = document.createElement("p");
  filmDescription.innerText = "Description: ";
  filmDescription.className = "film-description";

  let spanDescription = document.createElement("span");
  spanDescription.innerText = post.animeInfo.description;
  
  //APPEND
  filmDescription.append(spanDescription);

  journalList.append(
    deleteBtn,
    journalReviewTitle,
    ratingSection,
    journalContent,
    journalBtnsDiv,
    filmPicture,
    filmDescription
  );
  
  journalUlList.append(journalList);
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
  userAccountdivEl.className = "user-div";

  let userSpanName = document.createElement("span");
  userSpanName.innerText = name;

  userAccountdivEl.append(userSpanName);
  headerEl.append(userAccountdivEl);
}
