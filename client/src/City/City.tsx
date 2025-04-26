import React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  position: [number, number];
  rate: number;
  exempt_limit: number;
  name: string;
};

const colors = {
  low: "#D29F80",
  medium: "#97866A",
  high: "#735557",
  perfect: "#604652",
};

const lowRate = 0.07;
const mediumRate = 0.12;
const highRate = 0.15;

const epsilon = 0.0001;

export const City: React.FC<Props> = ({ position, name, rate }) => {
  const getColor = (rate: number) => {
    if (rate <= lowRate + epsilon) {
      return colors.low;
    } else if (rate <= mediumRate + epsilon) {
      return colors.medium;
    } else if (rate <= highRate + epsilon) {
      return colors.high;
    }
    return colors.perfect;
  };
  return (
    <CircleMarker center={position} radius={100 * rate} color={getColor(rate)}>
      <Popup>
        {name}
        <hr />
        {rate * 100} %
        <br />
      </Popup>
    </CircleMarker>
  );
};
