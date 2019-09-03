const loadDynamicScript = (scriptID, src, callback) => {
  if (!callback) return false;

  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src;
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
