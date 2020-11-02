import cardTemplate from "./templates/card.hbs";
import listTemplate from "./templates/list.hbs";

import "./css/common.css";

// --pnotify

import {
  alert,
  defaultModules,
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "../node_modules/@pnotify/mobile/dist/PNotifyMobile.js";

defaultModules.set(PNotifyMobile, {});

// import "../node_modules/@pnotify/core/dist/BrightTheme.css";
// import "../node_modules/material-design-icons/iconfont/material-icons.css";
import { defaults } from "../node_modules/@pnotify/core";
defaults.styling = "material";
defaults.icons = "material";

// pnotify--

const debounce = require("lodash.debounce");

const bodyItem = document.querySelector("body");
const inputItem = document.querySelector(".form-control");
const contentItem = document.querySelector(".js-content");
const form = document.querySelector(".js-search-form");

inputItem.addEventListener("input", debounce(onImput, 500));

// console.log("inputItem", inputItem);

function countryMarkup(countries) {
  if (countries.length > 10) {
    contentItem.innerHTML = "";
    PNotify.error({
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
    PNotify.notice("No countries with such parameters");
  }
}
function error() {
  contentItem.innerHTML = "";
}

function onImput(e) {
  e.preventDefault();
  const inputQuery = form.elements.query.value;
  fetch(`https://restcountries.eu/rest/v2/name/${inputQuery}`)
    .then((r) => r.json())
    .then(countryMarkup)
    .catch(error);
}
