export default defineWebSocketHandler({
  open(peer) {
    const c = clients();
    c.add(peer);
    const snap = (globalThis as any).__dlPrice || null;
    if (snap) peer.send(JSON.stringify({ type: "DL_SNAPSHOT", row: snap }));
  },
  close(peer) {
    clients().delete(peer);
  },
});
function clients() {
  const g = globalThis as any;
  g.__dlClients ||= new Set<any>();
  return g.__dlClients as Set<any>;
}
