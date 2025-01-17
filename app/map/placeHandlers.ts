import { JSONFeatures, Feature } from "@/utils/types";

export const handleResult = (result: any, setGeocoderPlaces: (places: Feature[]) => void, Places: JSONFeatures) => {
  const selectedPlaceId = result.result.properties.identifier;
  for (const place of Places.features) {
    if (place.properties.identifier === selectedPlaceId) {
      setGeocoderPlaces([place as Feature]);
      break;
    }
  }
  window.history.replaceState(null, "", `?place=${selectedPlaceId}`);
};

export const handleResults = (results: any, setGeocoderPlaces: (places: Feature[]) => void, Places: JSONFeatures) => {
  const resultPlaces = [];
  for (const result of results.features) {
    const selectedPlaceId = result.properties.identifier;
    for (const place of Places.features) {
      if (place.properties.identifier === selectedPlaceId) {
        resultPlaces.push(place);
        break;
      }
    }
  }
  setGeocoderPlaces(resultPlaces);
};

export const handleClear = (setGeocoderPlaces: (places: null) => void) => {
  setGeocoderPlaces(null);
};
