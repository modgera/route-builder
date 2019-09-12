import { loadYandexScript } from "../../services/Yandex/scriptLoader";

test("the yandex maps script is loaded", () => {
  const callback = YandexMap => {
    expect(YandexMap).toBeDefined();
    expect(window.ymaps).toBeDefined();
  };
  loadYandexScript("YandexScript", callback);
});
