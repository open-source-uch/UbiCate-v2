"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react";

import { Source, Layer } from "react-map-gl";

import { allPointsLayer, allPlacesTextLayer, approvalPointsLayer } from "@/app/map/layers";
import Places from "@/data/places.json";

function DebugMode() {
  const isDebugMode = sessionStorage.getItem("debugMode") === "true";
  const [json, setJson] = useState(null);
  const [debugMode, setDebugMode] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      if (!isDebugMode) return;

      fetch("/api/data")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch GeoJSON data");
          }
          return response.json();
        })
        .then((data) => {
          setJson(data.file_places);
        })
        .catch((error) => {
          console.error("Error fetching GeoJSON data:", error);
        });
    };

    fetchData();
  }, [isDebugMode]);
=======
import React from "react";

import { Source, Layer } from "react-map-gl";

import { allPointsLayer, allPlacesTextLayer } from "@/app/map/layers";
import { JSONFeatures } from "@/utils/types";

function DebugMode({ Places }: { Places: JSONFeatures }) {
  const isDebugMode = sessionStorage.getItem("debugMode") === "true";
>>>>>>> bot-update-locations

  if (!isDebugMode) {
    return null;
  }

  return (
    <>
<<<<<<< HEAD
      <div
        className="fixed left-0 bottom-0 bg-gray-800 bg-opacity-75 text-white p-4 w-min h-2/3 overflow-auto 
resize-x border-2 border-dashed pointer-events-auto"
      >
        <div className="mt-4">
          <label className="flex items-center">
            <input type="radio" checked={debugMode === 1} onChange={() => setDebugMode(1)} className="mr-2" />
            ALL puntos
          </label>
          <br />
          <label className="flex items-center">
            <input type="radio" checked={debugMode === 2} onChange={() => setDebugMode(2)} className="mr-2" />
            Punto new/update
          </label>
          <h2 className="text-xl font-bold mb-4">Categorías</h2>
        </div>
=======
      <div className="fixed left-0 bottom-0 bg-gray-800 bg-opacity-75 text-white p-4 w-min h-2/3 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Colores por Categoría</h2>
>>>>>>> bot-update-locations
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#1E90FF] mr-2" /> Aulas - Azul
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#8B0000] mr-2" /> Baños - Rojo Oscuro
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#FFA500] mr-2" /> Comida - Naranja
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#32CD32] mr-2" /> Salas de Estudio - Verde
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#808080] mr-2" /> Reciclaje - Gris
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#228B22] mr-2" /> Bicicleteros - Verde Oscuro
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#FFD700] mr-2" /> Bancos - Dorado
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#FF69B4] mr-2" /> Laboratorios - Rosa
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#00BFFF] mr-2" /> Puntos de Agua - Azul Claro
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#4B0082] mr-2" /> Auditorios - Índigo
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#DC143C] mr-2" /> Deportes - Carmesí
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#00008B] mr-2" /> Salas de Computadores - Azul Oscuro
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#8A2BE2] mr-2" /> Fotocopias - Violeta
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#FF6347] mr-2" /> Tiendas - Tomate
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#A9A9A9] mr-2" /> Otros - Gris Oscuro
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#716ADB] mr-2" /> Color por Defecto
          </li>
        </ul>
      </div>

<<<<<<< HEAD
      {debugMode === 1 && (
        <Source id="debug-2" type="geojson" data={Places}>
          <Layer {...allPointsLayer} />
          <Layer {...allPlacesTextLayer} />
        </Source>
      )}

      {debugMode === 2 && json ? (
        <Source id="debug-3" type="geojson" data={json}>
          <Layer {...approvalPointsLayer} />
          <Layer {...allPlacesTextLayer} />
        </Source>
      ) : null}
=======
      <Source id="points" type="geojson" data={Places}>
        <Layer {...allPlacesTextLayer} />
        <Layer {...allPointsLayer} />
      </Source>
>>>>>>> bot-update-locations
    </>
  );
}

export default DebugMode;
