import { get, ref } from "firebase/database";
import { database } from "./config";
import type { Earthquake } from "../types/earthquake";

export async function getEarthquakes(): Promise<Earthquake[]> {
  const databaseRef = ref(database, "sismos");

  const snapshot = await get(databaseRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data: unknown = snapshot.val();

  if (data === null || typeof data !== "object") {
    throw new Error("Los datos de Firebase tienen un formato incorrecto");
  }

  const records = Array.isArray(data)
    ? data.filter((record) => record !== null)
    : Object.values(data);

  return records as Earthquake[];
}