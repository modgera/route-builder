import React, { Component, createRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

const defaultState = {
  center: [55.75, 37.57],
  zoom: 10,
  controls: []
};

var some = "";

class App extends Component {
  state = {
    placemarks: [],
    polylineCoord: [],
    selectedMark: null
  };
  onPlacemarkClick = point => () => {
    this.setState({ selectedMark: point });
  };

  constructor(props) {
    super(props);
    this.searchPanel = createRef();
    this.polyLineRef = createRef(null);
  }

  getRouteCoordinates = () => {
    return this.state.placemarks.map(elem => elem.coord);
  };

  onYmapsLoad = ymaps => {
    this.ymaps = ymaps;
    new this.ymaps.SuggestView(this.searchPanel.current).events.add("select", this.onSuggestSelect);
  };

  onSuggestSelect = e => {
    const name = e.get("item").value;
    this.ymaps.geocode(name).then(result => {
      const coord = result.geoObjects.get(0).geometry.getCoordinates();
      this.setState(state => ({
        placemarks: [
          ...state.placemarks,
          {
            name,
            coord
          }
        ],
        polylineCoord: [...state.polylineCoord, coord]
      }));
      this.map.panTo(coord);
    });
  };
  render() {
    const { placemarks, polylineCoord } = this.state;
    //const polyLineRef = useRef(null);

    return (
      <div>
        <input
          ref={this.searchPanel}
          placeholder="куда маркер ставить будем?"
          className="searchPanel"
        />
        <YMaps
          query={{
            load: "package.full",
            ns: "use-load-option",
            apikey: "1c3beb93-8646-40be-aad5-14816f0a463d"
          }}
        >
          <Map
            defaultState={defaultState}
            onLoad={this.onYmapsLoad}
            instanceRef={map => (this.map = map)}
            width="100%"
          >
            {placemarks.map(n => (
              <Placemark
                geometry={n.coord}
                options={{
                  draggable: true,
                  preset: "islands#circleIcon",
                  balloonMinWidth: 100
                }}
                properties={{
                  balloonContentHeader: "Balloon1",
                  balloonContent: "Balloon1 <strong>Test</strong>"
                }}
                modules={["geoObject.addon.balloon"]}
                onClick={this.onPlacemarkClick(n.name)}
                onDragEnd={event => {
                  const coord = event.originalEvent.target.geometry.getCoordinates();
                  const selectedMark = this.state.selectedMark;
                  console.log(this.map.getCenter());
                  const placemarks = this.state.placemarks;
                  const markIndex = placemarks.findIndex(elem => elem.name === n.name);

                  this.setState(state => ({
                    placemarks: [
                      ...placemarks.slice(0, markIndex),
                      {
                        name: n.name,
                        coord
                      },
                      ...placemarks.slice(markIndex + 1)
                    ]
                  }));

                  this.onPlacemarkClick(null);

                  //console.log(coordinates);

                  /*if (this.polyLineRef) {
                  // Do whatever you need with map instance
                  this.polyLineRef.current.geometry.setCoordinates([[55.8, 37.5], coordinates, [55.7, 37.5], [55.7, 37.4]])
                }*/
                }}
              />
            ))}

            <Polyline
              geometry={this.getRouteCoordinates()}
              options={{
                //balloonCloseButton: false,
                strokeColor: "#000",
                strokeWidth: 4,
                strokeOpacity: 0.5
              }}
              //instanceRef={polyLineRef}
            />
          </Map>
        </YMaps>
        <ul>
          {placemarks.map((n, i) => (
            <li data-index={i} onClick={this.onPlaceClick}>
              {n.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
