import { defineStore } from "pinia";
interface State {
  dolarHoy: number;
  fechaDolar: string;
  usuarioDolar: string;
  isConnected: boolean;
  retryTimeout: any;
  retryInterval: number;
}

export const useDolarStore = defineStore("dolar", {
  state: (): State => ({
    dolarHoy: 0,
    fechaDolar: "",
    usuarioDolar: "",
    isConnected: false,
    retryTimeout: null,
    retryInterval: 3000,
  }),
  actions: {
    async getDolar() {
      const getData = await $fetch("/api/parametrosgenerales");
      this.dolarHoy = getData?.map((data) => Number(data.dolar))[0] ?? 0;
      this.fechaDolar =
        getData?.map((data) => data?.fecha_actualizar_dolar)[0] ?? "";
      this.usuarioDolar = getData?.map((data) => data.usuario_dolar)[0] ?? "";
    },
    async updateDolar(dolar: number, user: string) {
      const palabras = user?.split(" ");
      const nombre = palabras[0];
      const updateData = await $fetch("/api/parametrosgenerales/" + 1, {
        method: "PUT",
        body: {
          dolar: dolar,
          usuario_dolar: nombre,
        },
      });
      return updateData;
    },
    listenWs() {
      const proto = location.protocol === "https:" ? "wss:" : "ws:";
      console.log(
        "Connecting WS to " + proto + "//" + location.host + "/ws/cotizaciones"
      );
      const ws = new WebSocket(`${proto}//${location.host}/ws/cotizaciones`);
      /* ws.onopen = () => {
        console.log("WebSocket connected!");
        this.isConnected = true;
        if (this.retryTimeout) {
          clearTimeout(this.retryTimeout); // Clear the retry timeout on successful connection
          this.retryTimeout = null;
        }
      }; */
      ws.onmessage = (evt) => {
        const m = JSON.parse(evt.data);
        if (m.type === "DL_UPDATE" || m.type === "DL_SNAPSHOT") {
          this.dolarHoy = Number(m.row?.dolar ?? 0);
          this.fechaDolar = String(m.row?.fecha_actualizar_dolar ?? "");
          this.usuarioDolar = String(m.row?.usuario_dolar ?? "");
        }
      };
      /* ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnected = false;
      }; */
      /* ws.onclose = () => {
        console.log("WebSocket closed. Retrying...");
        this.isConnected = false;
        if (!this.isConnected) {
          this.retryTimeout = setTimeout(() => {
            console.log("Attempting to reconnect...");
            this.listenWs();
          }, this.retryInterval);
        }
      }; */
      return ws;
    },
  },
});
