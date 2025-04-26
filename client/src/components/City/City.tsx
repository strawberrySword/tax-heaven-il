import React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { calculateAnnualSavings } from "../../utils";

type Props = {
  position: [number, number];
  rate: number;
  ceiling: number;
  name: string;
  income: number;
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

export const City: React.FC<Props> = ({
  position,
  name,
  rate,
  income,
  ceiling,
}: Props) => {
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

  const savings = calculateAnnualSavings(rate, income, ceiling);
  return (
    <CircleMarker center={position} radius={100 * rate} color={getColor(rate)}>
      <Popup>
        {name}
        <hr />
        Rate: {rate * 100}%
        <br />
        {income > 0 ? (
          <>
            {" "}
            Yearly Savings:{" "}
            {savings.toLocaleString("he-IL", {
              style: "currency",
              currency: "ILS",
            })}
          </>
        ) : (
          <></>
        )}
      </Popup>
    </CircleMarker>
  );
};
