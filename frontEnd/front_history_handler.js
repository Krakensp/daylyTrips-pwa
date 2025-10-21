import dateComparation from "../helpers/helper-date-comparation.js";
import { getDailyRegister } from "../localStorageHandlers/handler-daily-register.js";
import { getOneDayRegister } from "../localStorageHandlers/handler-history.js";
import { getTravels } from "../localStorageHandlers/handler-trip.js";
import { getTotalReached } from "../localStorageHandlers/totalReached.js";

const showTodayHistory = async (date) => {
  let $dateLabel = document.getElementById("history-date");
  $dateLabel.dataset.date = date;
  let $titleTag = document.getElementById("title");
  let $subTitleTag = document.getElementById("subtitle");
  let title = "";
  let subtitle = "";

  if (getResumeInfo(date) === undefined) {
    removeHistory();
    title = "No hay viajes registrados";
    subtitle = "El día seleccionado no tiene viajes registrados";
    $titleTag.innerText = title;
    $subTitleTag.innerText = subtitle;
    return;
  }

  const { goal, totalReached, tripsCompleted, status, earningsByHour } =
    await getResumeInfo(date);

  if (!earningsByHour) {
    removeHistory();
    title = "No hay viajes registrados";
    subtitle = "El día seleccionado no tiene viajes registrados";
    $titleTag.innerText = title;
    $subTitleTag.innerText = subtitle;
  } else {
    if (status == closed) {
      if (totalReached >= goal) {
        title = "Cumpliste tu objetivo";
      } else {
        title = "No alcanzaste tu meta";
      }
    } else {
      if (totalReached >= goal) {
        title = "Haz alcanzado tu objetivo";
      } else {
        title = "Aun no cumples tu meta";
      }
    }

    subtitle =
      "Realizaste " +
      tripsCompleted +
      " viajes y generaste $" +
      totalReached +
      " tu objetivo de este día eran $" +
      goal;

    $titleTag.innerText = title;
    $subTitleTag.innerText = subtitle;

    animateIn(earningsByHour);
  }
};

const getResumeInfo = async (date) => {
  let dayRegister = "";
  let status = ""; //fix status bug
  let travels = "";
  let totalReached = 0;

  if (dateComparation(new Date(), date)) {
    dayRegister = getDailyRegister();
    travels = await getTravels();
    status = "process";
    totalReached = getTotalReached();
  } else {
    dayRegister = getOneDayRegister(date);
    if (!dayRegister) {
      return undefined;
    } else {
      status = dayRegister.status;
      travels = dayRegister.trips;
      totalReached = dayRegister.totalReached;
    }
  }

  const goal = dayRegister.goal;
  let tripsCompleted = 0;
  let travelHours = undefined;
  let hourlyEarnings = 0;
  let actualTravelHour = undefined;
  const earningsByHour = [];

  for (let i = 0; i < travels.length; i++) {
    tripsCompleted++;
    actualTravelHour = new Date(travels[i].datetime).getHours();

    if (i === 0) {
      travelHours = actualTravelHour;
    }

    if (travelHours !== actualTravelHour) {
      earningsByHour.push({ hour: travelHours, totalEarnings: hourlyEarnings });
      hourlyEarnings = 0;
      hourlyEarnings += parseInt(travels[i].cost);
      travelHours = actualTravelHour;
    } else {
      hourlyEarnings += parseInt(travels[i].cost);
    }

    if (i === travels.length - 1) {
      earningsByHour.push({
        hour: travelHours,
        totalEarnings: hourlyEarnings,
      });
      hourlyEarnings = 0;
      travelHours = actualTravelHour;
    }
  }

  return { goal, totalReached, tripsCompleted, status, earningsByHour };
};

const showHistoryWindow = () => {
  let $history = document.getElementById("history-container");
  $history.classList.add("active");
};

const hideHistoryWindow = () => {
  let $history = document.getElementById("history-container");
  $history.classList.remove("active");
};

const displayHistory = (date) => {
  showTodayHistory(date);
};

const previousDayHistory = () => {
  let $dateLabel = document.getElementById("history-date");
  let labelDate = $dateLabel.dataset.date;
  let actualDate = new Date(labelDate);
  let actualDay = actualDate.getDate();
  actualDate.setDate(actualDay - 1);
  $dateLabel.dataset.date = actualDate;
  $dateLabel.innerText =
    actualDate.getDate() +
    "/" +
    (actualDate.getMonth() + 1) +
    "/" +
    actualDate.getFullYear();
  return actualDate;
};

const nextDayHistory = () => {
  let $dateLabel = document.getElementById("history-date");
  let labelDate = $dateLabel.dataset.date;
  let actualDate = new Date(labelDate);
  let actualDay = actualDate.getDate();
  actualDate.setDate(actualDay + 1);
  $dateLabel.dataset.date = actualDate;
  $dateLabel.innerText =
    actualDate.getDate() +
    "/" +
    (actualDate.getMonth() + 1) +
    "/" +
    actualDate.getFullYear();
  return actualDate;
};

const removeHistory = () => {
  let $titleTag = document.getElementById("title");
  let $subTitleTag = document.getElementById("subtitle");
  $titleTag.innerText = "";
  $subTitleTag.innerText = "";
  const canvas = document.getElementById("pie");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// GRAFICA

const canvas = document.getElementById("pie");
const ctx = canvas.getContext("2d");

// colores agradables (24)
const colors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#7c3aed",
  "#ec4899",
  "#a855f7",
  "#14b8a6",
  "#22c55e",
  "#65a30d",
  "#2563eb",
  "#0ea5e9",
  "#0284c7",
  "#6366f1",
  "#9333ea",
  "#c026d3",
  "#db2777",
  "#e11d48",
  "#b91c1c",
  "#b45309",
];

// estado para animación / interacción
let animationProgress = 0; // 0..1
let isolatedIndex = null; // segmento aislado por click
let animating = true;

function draw(initialData, progress = 1) {
  let data = initialData.slice();
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2 - 10;
  const radius = Math.min(w, h) / 3.2;

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += parseInt(data[i].totalEarnings);
  }
  let startAngle = -Math.PI / 2; // comenzar arriba

  // si hay un segmento aislado, lo desplazamos un poco
  for (let i = 0; i < data.length; i++) {
    const val = parseInt(data[i].totalEarnings);
    const hour = data[i].hour + ":00 =$" + val;
    const sliceAngle = (val / total) * Math.PI * 2 * progress;
    const mid = startAngle + sliceAngle / 2;

    // separar el aislado
    const isIso = isolatedIndex === i;
    const dx = isIso ? Math.cos(mid) * 12 : 0;
    const dy = isIso ? Math.sin(mid) * 12 : 0;

    ctx.beginPath();
    ctx.moveTo(cx + dx, cy + dy);
    ctx.arc(cx + dx, cy + dy, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // borde sutil
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // pequeña etiqueta en el centro del segmento
    if (sliceAngle > 0.25) {
      // sólo para segmentos suficientemente grandes
      const labelAngle = startAngle + sliceAngle / 2;
      const lx = cx + Math.cos(labelAngle) * (radius * 0.6) + dx;
      const ly = cy + Math.sin(labelAngle) * (radius * 0.6) + dy;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "600 12px system-ui, Arial";
      const text = hour;
      ctx.fillText(text, lx - ctx.measureText(text).width / 2, ly + 4);
    }

    startAngle += sliceAngle;
  }
}

// animación simple
function animateIn(travelsData) {
  setTimeout(() => {
    animating = true;
    animationProgress = 0;
    const duration = 600; // ms
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      // easing
      animationProgress = 1 - Math.pow(1 - t, 3);
      draw(travelsData, animationProgress);
      if (t < 1) requestAnimationFrame(frame);
      else animating = false;
    }
    requestAnimationFrame(frame);
  }, 100);
}

export {
  showHistoryWindow,
  hideHistoryWindow,
  displayHistory,
  removeHistory,
  previousDayHistory,
  nextDayHistory,
};
