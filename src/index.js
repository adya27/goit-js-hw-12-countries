import cardTemplate from "./templates/card.hbs";
import listTemplate from "./templates/list.hbs";

import "./scss/common.scss";

// --pnotify

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { notice, error } from "@pnotify/core";

// pnotify--

const debounce = require("lodash.debounce");

const bodyItem = document.querySelector("body");
const inputItem = document.querySelector(".form-control");
const contentItem = document.querySelector(".js-content");
const form = document.querySelector(".js-search-form");

inputItem.addEventListener("input", debounce(onImput, 500));

function countryMarkup(countries) {
  if (countries.length > 10) {
    contentItem.innerHTML = "";
    error({
      title: "Please enter a more sepecific query!",
      delay: 1000,
    });
  } else if (countries.length <= 10 && countries.length >= 2) {
    contentItem.innerHTML = listTemplate(countries);
  } else if (countries.length === 1) {
    contentItem.innerHTML = cardTemplate(countries[0]);
  }
  if (countries.status === 404) {
    contentItem.innerHTML = "";
    notice("No countries with such parameters");
  }
}
function onError() {
  contentItem.innerHTML = "";
}

function onImput(e) {
  e.preventDefault();
  const inputQuery = form.elements.query.value;
  fetch(`https://restcountries.eu/rest/v2/name/${inputQuery}`)
    .then((r) => r.json())
    .then(countryMarkup)
    .catch(onError);
}
