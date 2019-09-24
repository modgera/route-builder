/* eslint-disable */
import jsdom from "jsdom";
import { loadYandexScript } from "./services/Yandex/scriptLoader";

const { JSDOM } = jsdom;
const { document } = new JSDOM("<!doctype html><html><head></head><body></body></html>").window;

const win = document.defaultView;
global.document = document;
global.window = win;

function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

loadYandexScript("YandexScript");

propagateToGlobal(win);
