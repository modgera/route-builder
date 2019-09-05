import scriptUrl from '../'


const url =
    "https://api-maps.yandex.ru/2.1/?apikey=1c3beb93-8646-40be-aad5-14816f0a463d&lang=ru_RU";

const loadDynamicScript = (scriptID, callback) => {
  if (!callback) return false;

  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;
    script.id = scriptID;
    document.head.appendChild(script);

    script.onload = () => {
      if (callback) {
        window.ymaps.ready(() => callback(window.ymaps));
      }
    };
  } else {
    window.ymaps.ready(() => callback(window.ymaps));
  }
};

// const useDynamicScript = (scriptID, src, callback) => {
//   //const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   useEffect(() => {
//     loadDynamicScript(scriptID, src, callback);
//     // if (!isScriptLoaded) {
//     //   loadDynamicScript(scriptID, src, callback);
//     //   setIsScriptLoaded(true);
//     // }
//   }, []);

//   return true;
// };

export default loadDynamicScript;
