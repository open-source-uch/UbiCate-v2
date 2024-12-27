import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactDOM from "react-dom/client";

import { categoryFilter, nameFilter, PlaceFilter } from "@/utils/placeFilters";

import Pill from "./pill";

interface PillFilterProps {
  setFilteredPlaces: ([]) => void;
  geocoder: MapboxGeocoder;
}

function PillFilter({ setFilteredPlaces: setGeocoderPlaces, geocoder }: PillFilterProps) {
  const [geoJsonData, setGeoJsonData] = useState<{ type: string; features: any[] }>({ type: "", features: [] });
  const [filteredResults, setFilteredResults] = useState<{ [key: string]: any[] }>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const pillsRootRef = useRef<ReactDOM.Root | null>(null);
  const pillsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadGeoJson = async () => {
      const { default: data } = await import("../../data/places.json");
      setGeoJsonData(data);
    };

    loadGeoJson();
  }, []);

  const clearGeocoder = useCallback(() => {
    if (geocoder) {
      geocoder.clear();
      const input = document.querySelector(".mapboxgl-ctrl-geocoder input") as HTMLInputElement;
      if (input) {
        input.blur();
      }
    }
  }, [geocoder]);

  const applyFilter = useCallback(
    (filter: PlaceFilter, category: string) => {
      clearGeocoder();
      if (!geoJsonData) return;

      if (filteredResults[category]) {
        setGeocoderPlaces(filteredResults[category]);
      } else {
        const filtered = filter(geoJsonData, category);
        setFilteredResults((prev) => ({ ...prev, [category]: filtered }));
        setGeocoderPlaces(filtered);
      }
      setActiveFilter((prevCategory) => (prevCategory === category ? null : category));
      if (activeFilter !== null && filteredResults[category] === filteredResults[activeFilter]) {
        setGeocoderPlaces([]);
      }
    },
    [clearGeocoder, geoJsonData, filteredResults, activeFilter, setGeocoderPlaces],
  );

  useEffect(() => {
    const mapboxContainer = document.querySelector(".mapboxgl-ctrl-top-left");

    if (mapboxContainer && !pillsContainerRef.current) {
      const pillsContainer = document.createElement("div");
      pillsContainer.className =
        "pills-container overflow-y-auto | flex justify-center sm:justify-start items-start order-2 py-3 sm:pt-0 | gap-3 px-5";
      mapboxContainer.appendChild(pillsContainer);

      const root = ReactDOM.createRoot(pillsContainer);
      pillsRootRef.current = root;
      pillsContainerRef.current = pillsContainer;
    }

    return () => {
      /*
      Si no se usa el 'setTimeout' se genera un error en el momento de unmount, motivo desconocido xd, solo se que funciona y eso es suficiente. xd
      */
      setTimeout(() => {
        if (pillsRootRef.current) {
          pillsRootRef.current.unmount();
          pillsRootRef.current = null;
        }
        if (pillsContainerRef.current && pillsContainerRef.current.parentElement) {
          pillsContainerRef.current.parentElement.removeChild(pillsContainerRef.current);
          pillsContainerRef.current = null;
        }
      }, 0);
    };
  }, []);

  useEffect(() => {
    if (pillsRootRef.current) {
      pillsRootRef.current.render(
        <>
          <Pill
            title="Salas de Estudio"
            iconPath="/studyroom.svg"
            onClick={() => applyFilter(categoryFilter, "studyroom")}
            active={activeFilter === "studyroom"}
          />
          <Pill
            title="Bibliotecas"
            iconPath="/library.svg"
            onClick={() => applyFilter(nameFilter, "biblioteca")}
            active={activeFilter === "biblioteca"}
          />
          <Pill
            title="Auditorio"
            iconPath="/auditorium.svg"
            onClick={() => applyFilter(categoryFilter, "auditorium")}
            active={activeFilter === "auditorium"}
          />
          <Pill
            title="Comida"
            iconPath="/food.svg"
            onClick={() => applyFilter(categoryFilter, "food_lunch")}
            active={activeFilter === "food_lunch"}
          />
          <Pill
            title="Agua"
            iconPath="/water.svg"
            onClick={() => applyFilter(categoryFilter, "water")}
            active={activeFilter === "water"}
          />
          <Pill
            title="Baños"
            iconPath="/toilet.svg"
            onClick={() => applyFilter(categoryFilter, "bath")}
            active={activeFilter === "bath"}
          />
        </>,
      );
    }
  }, [applyFilter, activeFilter]);

  return null;
}

export default React.memo(PillFilter);
