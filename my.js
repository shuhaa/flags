let countriesContainer = document.querySelector(".countries");

const reguest = new XMLHttpRequest();
reguest.open("GET", "https://restcountries.com/v3.1/all", false);
reguest.send();

const jsonText = JSON.parse(reguest.responseText);

for (let texts of jsonText) {
  let html = `
      <article class="country">
      <div class="country__data">
      <h3 class="country__name">${texts.translations.rus.common}</h3>
      <h4 class="country__region">${texts.region}</h4>
    </div>
    <img class="country__img" src="${texts.flags.svg}" alt="" />
            </article> `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
}

let country = document.querySelectorAll(".country ");

for (let countr of country) {
  countr.addEventListener("mouseover", function (e) {
    e.preventDefault();
    countr.children[0].style.opacity = 1;
    countr.style.backgroundColor = "#5f90f1";
    countr.style.borderRadius = "5%";
  });
  countr.addEventListener("mouseout", function (e) {
    e.preventDefault();
    countr.children[0].style.opacity = 0;
    countr.style.backgroundColor = "#dee8fc";
  });
}

let headerImg = document.querySelector(".header__img");
let countriesList = document.querySelector(".countries__list");
let body = document.querySelector("body");

let nameArr = [];

for (let name of jsonText) {
  let obj = {};
  obj.nam = name.translations.rus.common;
  obj.region = name.region;
  obj.img = name.flags.svg;
  obj.population = name.population;
  obj.languages = name.languages;
  obj.currencies = name.currencies;
  nameArr.push(obj);
}
console.log(nameArr);
for (let sort of nameArr) {
  //   console.log(sort.nam);
  let htmls = `
      <a class='name' href=""> ${sort.nam}</a>
      `;
  countriesList.insertAdjacentHTML("beforeend", htmls);
}
headerImg.addEventListener("click", function (e) {
  e.preventDefault();
  countriesContainer.classList.toggle("active");
  countriesList.classList.toggle("unactive");
  headerImg.addEventListener("click", function () {
    window.location.reload();
  });
});

let nameCount = document.querySelectorAll(".name");
let h1 = document.querySelector("h1");
let randoms = document.querySelector(".randoms");

for (let names of nameCount) {
  names.addEventListener("click", function (e) {
    e.preventDefault();
    for (let m of nameArr) {
      if (names.textContent.trim() === m.nam.trim()) {
        countriesList.innerHTML = "";
        h1.innerHTML = "";
        const news = `
       <article class="random">
       <div class="random__data">
       <h3 class="random__name">${m.nam}</h3>
       <h4 class="random__region">${m.region}</h4>
       <p class="random__row"><span>👫</span>${m.population}</p>
            <p class="random__row"><span>🗣️</span>${
              Object.entries(m.languages)[0]
            }</p>
            <p class="random__row"><span>💰</span>${
              Object.entries(m.currencies)[0][0]
            }</p>
     </div>
     <img class="random__img" src="${m.img}" alt="" />
             </article> 
       `;
        randoms.insertAdjacentHTML("beforeend", news);
        console.log(m);
      }
    }
  });
}
