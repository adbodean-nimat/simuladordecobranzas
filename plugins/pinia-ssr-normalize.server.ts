// ~/plugins/pinia-ssr-normalize.server.ts
import type { Pinia, PiniaPluginContext } from "pinia";

function toPojo(val: any): any {
  if (val == null || typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(toPojo);
  if (val instanceof Map)
    return Object.fromEntries(
      [...val.entries()].map(([k, v]) => [k, toPojo(v)])
    );
  if (val instanceof Set) return [...val].map(toPojo);
  // Objetos con prototipo nulo o instancias -> los copiamos a {}
  const out: any = {};
  for (const k in val as any) out[k] = toPojo((val as any)[k]);
  return out;
}

export default defineNuxtPlugin((nuxtApp) => {
  ((nuxtApp.$pinia as Pinia).use as any)(({ store }: PiniaPluginContext) => {
    // Normaliza al crear el store
    store.$state = toPojo(store.$state);
    // …y cada vez que cambie
    store.$subscribe((_m, state) => {
      store.$state = toPojo(state);
    });
  });
});
