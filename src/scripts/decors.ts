// Decor picker: tabs by category + swapping the decor on the wall (cross-fade). Without JS all categories stay visible.
const root = document.querySelector<HTMLElement>("#decors");
if (root) {
  root.classList.add("is-js");
  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".tab")];
  const panels = [...root.querySelectorAll<HTMLElement>(".panel")];
  const layers = [...root.querySelectorAll<HTMLElement>(".wallview__layer")];
  const cap = root.querySelector<HTMLElement>("#wall-cap");
  let cur = 0;
  const select = (cat: string) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.cat === cat)));
    panels.forEach((p) => (p.hidden = p.dataset.cat !== cat));
  };
  select("1");
  tabs.forEach((t) => t.addEventListener("click", () => select(t.dataset.cat!)));
  tabs.forEach((t, i) => t.addEventListener("keydown", (e) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = tabs[(i + d + tabs.length) % tabs.length];
    n.focus(); select(n.dataset.cat!); e.preventDefault();
  }));
  root.querySelectorAll<HTMLButtonElement>(".sw").forEach((b) =>
    b.addEventListener("click", () => {
      root.querySelectorAll(".sw").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const next = layers[1 - cur];
      next.style.setProperty("--a", `url(${b.dataset.src})`);
      next.classList.add("is-on"); layers[cur].classList.remove("is-on");
      cur = 1 - cur;
      if (cap) cap.innerHTML = `Декор <b>${b.dataset.code}</b> · категорія ${b.dataset.cat}`;
    }));
  layers[0].style.setProperty("--a", `url(${import.meta.env.BASE_URL.replace(/\/?$/, "/")}img/decors/936.webp)`);
}
