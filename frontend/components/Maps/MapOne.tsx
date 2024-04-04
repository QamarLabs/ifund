"use client";
import React, { useEffect, useRef, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { northAmericaMill } from "@react-jvectormap/northamerica";
import { usAea } from "@react-jvectormap/unitedstates";
import { southAmericaMill } from "@react-jvectormap/southamerica";

import { europeMill } from "@react-jvectormap/europe";
import countriesData from "@/data/countries.json";
import { IVectorMap } from "@react-jvectormap/core/dist/types";
type MapOneProps = {
  residence: string;
  countryOfResidence: string;
};

const MapOne = ({ residence, countryOfResidence }: MapOneProps) => {
  const mapRef = useRef<any>(null);
  const [coords, setCoords] = useState<number[] | undefined>(undefined);
  const [activeRegion, setActiveRegion] = useState<string | undefined>(
    undefined,
  );
  const [mapToShow, setMapToShow] = useState<IVectorMap | undefined>(undefined);
  const [updateKey, setUpdateKey] = useState<number>(0);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${residence}`,
        );
        const responseJson = await response.json();

        if (responseJson && responseJson.length > 0) {
          const { lat, lon } = responseJson[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch {}
    };
    fetchCoordinates();
  }, [coords]);

  useEffect(() => {
    if (countryOfResidence === "United States") {
      setMapToShow(usAea);
    } else if (
      countriesData["south_america"].some((c) => c.name === countryOfResidence)
    ) {
      setActiveRegion(
        countriesData["south_america"].find(
          (c) => c.name === countryOfResidence,
        )?.key!,
      );
      setMapToShow(southAmericaMill);
    } else if (
      countriesData["europe"].some((c) => c.name === countryOfResidence)
    ) {
      setActiveRegion(
        countriesData["europe"].find((c) => c.name === countryOfResidence)
          ?.key!,
      );
      setMapToShow(europeMill);
    } else {
      setMapToShow(northAmericaMill);
    }
    setUpdateKey(updateKey + 1);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div id="mapOne" className="mapOne map-btn h-90">
        <VectorMap
          key={updateKey}
          regionsSelectable={false}
          map={mapToShow ?? northAmericaMill}
          backgroundColor="white"
          regionStyle={{
            initial: {
              fill: "#D1D5DB",
            },
            hover: {
              fillOpacity: 1,
              fill: "blue",
            },
          }}
          selectedRegions={
            activeRegion
              ? {
                  [activeRegion]: true,
                }
              : {}
          }
          onRegionTipShow={function reginalTip(event, label, code) {
            //@ts-ignore
            return label.html(`
                      <div style="background-color: #F8FAFC; color: black; padding: 2px 8px"; >
                        ${
                          //@ts-ignore
                          label.html()
                        }
                      </div>`);
          }}
        />
      </div>
    </div>
  );
};

export default MapOne;
