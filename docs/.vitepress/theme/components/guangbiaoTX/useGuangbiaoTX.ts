let fallDirection = 1;

export function useGuangbiaoTX() {
  const container = document.createElement("div");
  container.id = "guangbiao-container";
  document.body.appendChild(container);

  document
    .querySelectorAll('input[name="trailside"]')
    .forEach(r => r.addEventListener("change", e => (fallDirection = parseInt((e.target as HTMLInputElement).value))));

  let x1 = 0;
  let y1 = 0;

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const dist_to_draw = 50;
  const delay = 1000;
  const fsize = ["1.1rem", "1.4rem", ".8rem", "1.7rem"];
  // 星星颜色配置表
  const colors = ["#E23636", "#001affff", "#00ffeaff", "#ff009dff", "#ff9595ff", "#004370ff"];

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const selRand = <T>(arr: T[]) => arr[rand(0, arr.length - 1)];
  const distanceTo = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const shouldDraw = (x: number, y: number) => distanceTo(x1, y1, x, y) >= dist_to_draw;

  const addStar = (x: number, y: number) => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = `${y + rand(-20, 20)}px`;
    star.style.left = `${x}px`;
    star.style.color = selRand(colors);
    star.style.fontSize = selRand(fsize);
    container.appendChild(star);

    const fs = 10 + 5 * parseFloat(getComputedStyle(star).fontSize);

    star.animate(
      {
        transform: [
          `translate(${rand(-5, 5)}px, ${(y + fs > vh ? vh - y : fs) * fallDirection * 0.3}px)`,
          `translate(${rand(-20, 20)}px, ${(y + fs > vh ? vh - y : fs) * fallDirection}px) rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`,
        ],
        opacity: [1, 0],
      },
      {
        duration: delay,
        fill: "forwards",
      }
    );

    setTimeout(() => star.remove(), delay);
  };

  window.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    if (shouldDraw(clientX, clientY)) {
      addStar(clientX, clientY);
      x1 = clientX;
      y1 = clientY;
    }
  });
}
