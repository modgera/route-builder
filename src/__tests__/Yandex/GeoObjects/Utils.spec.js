import { loadYandexScript } from "../../../services/Yandex/scriptLoader.js";

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

test("getUserLocation", () => {
  const callback = async MapService => {
    const coordinates = await MapService.Utils.getUserLocation();
    expect(coordinates).toBeDefined();
    expect(coordinates.length).toBe(2);
  };
  loadYandexScript("YandexScript", callback);
});
