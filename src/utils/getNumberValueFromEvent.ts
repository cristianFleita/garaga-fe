import { DojoEvent } from "../types/DojoEvent";
import { signedHexToNumber } from "./signedHexToNumber";

export const getNumberValueFromEvent = (
  event: DojoEvent,
  indexToGet: number
): number | undefined => {
  const txValue = event.data.at(indexToGet);
  return txValue ? signedHexToNumber(txValue) : undefined;
};

export const getNumberValueFromEvents = (
  events: DojoEvent[],
  event_address: string,
  indexToGet: number,
  keyIndex = 1
): number | undefined => {
  const event = events?.find((e) => {
    return e.keys[keyIndex] === event_address;
  });
  return event && getNumberValueFromEvent(event, indexToGet);
};
