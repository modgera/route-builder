"use strict";
import { loadYandexScript } from "../../../services/Yandex/scriptLoader.js";
import "../../../jsdomInit";

// describe("Yandex Map Utils", () => {
//   const callback = MapService => {
//     test("getUserLocation", async () => {
//       const coordinates = await MapService.Utils.getUserLocation();
//       expect(coordinates).toBeDefined();
//       expect(coordinates.length).toBe(2);
//     });
//   };
//   loadYandexScript("YandexScript", callback);
// });
jest.setTimeout(10000);
test("getUserLocation", done => {
  const callback = async MapService => {
    const coordinates = await MapService.Utils.getUserLocation();
    expect(coordinates).toBeDefined();
    expect(coordinates.length).toBe(3);
    done();
  };
  loadYandexScript("YandexScript", callback);
});
