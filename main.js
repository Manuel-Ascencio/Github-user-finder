const API = "https://api.github.com/users/";

let dark = false;

const form = document.querySelector("form");
const input = document.querySelector(".form_input");
const info = document.querySelector(".user_info");
const defaultData = document.querySelector(".default");
const theme = document.querySelector(".theme");
const themeCSS = document.querySelector(".theme-css");
const themeName = document.querySelector(".theme-name");
const icon = document.querySelector(".fa");
console.log(icon);

theme.addEventListener("click", themeSwitch);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = input.value.trim();
  if (!username) return;
  getUserData(username);
  input.value = "";
});

async function getUserData(username) {
  try {
    const response = await fetch(API + username);
    if (!response.ok) {
      throw new Error("user not found");
    }
    const data = await response.json();
    showUserData(data);
  } catch (error) {
    console.error("Error", error);
    defaultData.style.display = "none";
    showNotFound();
  }
}

function showNotFound() {
  const message = `<p class="error">&#129300; User not found!</p>`;
  info.innerHTML = message;
}

function showUserData(data) {
  const {
    avatar_url: avatar,
    name,
    created_at: joined,
    login,
    bio,
    public_repos: repos,
    followers,
    following,
    location,
    twitter_username: twitter,
    blog,
    email,
  } = data;
  const userData = `
        <img
          src="${avatar}"
          alt="user"
          class="img"
        />
        <h2 class="name">${name}</h2>
        <h4 class="joined">${parseDate(joined)}</h4>
        <h5 class="username">${login}</h5>
        <p class="about">${bio ? bio : "This profile has no bio"}</p>
        <div class="stats">
          <p class="repos">Repos</p>
          <p class="followers">Followers</p>
          <p class="following">Following</p>
          <small class="repos">${repos}</small>
          <small class="followers">${followers}</small>
          <small class="following">${following}</small>
        </div>
        <nav class="contact">
          <a href="#" class="link location"
            ><i class="fa fa-map"></i>${
              location ? location : "Not available"
            }</a
          >
          <a href="#" class="link twit"
            ><i class="fa fa-twitter"></i>${
              twitter ? twitter : "Not available"
            }</a
          >
          <a href="${blog}" target="_blank" class="link"
            ><i class="fa fa-link website"></i>${
              blog ? blog : "Not available"
            }</a
          >
          <a href="#" class="link email"
            ><i class="fa fa-envelope"></i>${email ? email : "Not available"}</a
          >
        </nav> 
    `;
  info.innerHTML = userData;

  function parseDate(date) {
    let options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleString("en-En", options);
  }
}

function themeSwitch() {
  dark = !dark;
  if (dark) {
    themeCSS.setAttribute("href", "light.css");
    themeName.textContent = "DARK";
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    themeCSS.setAttribute("href", "dark.css");
    themeName.textContent = "LIGHT";
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}
