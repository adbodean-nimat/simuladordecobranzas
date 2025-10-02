// ~/plugins/pinia-guard.ts
import type { Pinia, PiniaPluginContext } from "pinia";

// --- detector de objetos no-serializables ---
const isNullProto = (o: any) =>
  o && typeof o === "object" && Object.getPrototypeOf(o) === null;

function scan(value: any, path: string[] = []) {
  if (!value || typeof value !== "object") return;
  if (isNullProto(value))
    console.warn("[Pinia] objeto con prototipo nulo en", path.join("."));
  if (value instanceof Map) console.warn("[Pinia] Map en", path.join("."));
  if (value instanceof Set) console.warn("[Pinia] Set en", path.join("."));
  if (Array.isArray(value)) {
    value.forEach((v, i) => scan(v, [...path, String(i)]));
  } else {
    for (const k in value as any) scan((value as any)[k], [...path, k]);
  }
}

// --- ESTE es el plugin de Pinia real ---
function piniaGuardPlugin({ store }: PiniaPluginContext) {
  scan(store.$state, [store.$id]);
  store.$subscribe((_mutation, state) => scan(state, [store.$id]));
}

// --- y acá lo registramos en Nuxt ---
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia; // cast para evitar "unknown"
  pinia.use(piniaGuardPlugin);
});
