<script>
import {pressureEntries, startDate} from "./pressure.store.js";
import range from "@/utils/range.js";
import moment from "moment";

const yScaleMax = 770;
const yScaleMin = 720;
const yScaleRange = yScaleMax - yScaleMin;

const width = 800;
const height = 400;
const yOffsetTop = 10;
const yOffsetBottom = 50;
const xOffsetLeft = 30;
const xOffsetRight = 10;
const activeWidth = width - xOffsetLeft - xOffsetRight;
const activeHeight = height - yOffsetTop - yOffsetBottom;

const ranges = [
  {
    value: 1,
    name: "За сутки",
    markerResolution: 60*60*1000, // 1 hour
    markerSnap: "hour",
    format: "HH:mm",
  },
  {
    value: 3,
    name: "За три дня",
    markerResolution: 3*60*60*1000, // 3 hours
    markerSnap: "hour",
    format: "DD HH:mm",
  },
  {
    value: 7,
    name: "За неделю",
    markerResolution: 24*60*60*1000, // 24 hours
    markerSnap: "day",
    format: "DD",
  },
];

const yScaleMarkers = Array.from(
  range(yScaleMin, yScaleMax + 10, 10),
  y => ({
    value: y,
    coord: yPos(y)
  })
);

// const xScaleMarkers; // todo

let dateRange = ranges[0];

let now = new Date();
$: $startDate = moment(now).subtract(dateRange.value, "days").toDate();
$: startDateVal = $startDate.getTime();
$: nowOffsetedVal = now.getTime() - startDateVal;
$: points = calculatePath($pressureEntries);

$: xScaleMarkers = Array.from(
  range(
    moment($startDate).startOf(dateRange.markerSnap).toDate().getTime() + dateRange.markerResolution,
    (new Date()).getTime(),
    dateRange.markerResolution),
  x => ({
    value: moment(x).format(dateRange.format),
    coord: xPos(x)
  })
);

function calculatePath(etr) {
  return etr.then( e => {
    if (e && Array.isArray(e.data)) {
      nowOffsetedVal = getNowOffseted(startDateVal);
      return e.data.filter(validatePoint).map(calculatePoint).join(" ");
    }
    return Promise.reject(new Error("Нет массива данных в полученных точках"));
  });
}

function validatePoint(p) {
  if (
    !p ||
    !Number.isFinite(p.pressure) ||
    !moment(p.time).isAfter($startDate)
  ) return false;
  return true;
}

function calculatePoint(p) {
  let y = yPos(p.pressure);
  let t = (new Date(p.time)).getTime();
  let x = xPos(t);
  return x + "," + y;
}

function getNowOffseted(offset) {
  return (new Date()).getTime() - offset;
}

function yPos(press) {
  return (press - yScaleMin) / yScaleRange * -activeHeight + activeHeight + yOffsetTop;
}
function xPos(time) {
  return (time - startDateVal) / nowOffsetedVal * activeWidth + xOffsetLeft;
}
</script>


<div class="pressure-chart-wrapper">
  <h2>Атмосферное давление</h2>
  <div class="chart-controls">
    {#each ranges as range}
    <label>
      <input type="radio" bind:group={dateRange} value={range} />
      {range.name}
    </label>
    {/each}
  </div>

  {#await points}
   <p>...загрузка</p>
  {:then pts}
  <svg class="chart" viewbox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <rect class="chart-field" x={xOffsetLeft} y={yOffsetTop} width={activeWidth} height={activeHeight} />
    {#each yScaleMarkers as yMarker}
    <line
      class='marker-line marker-line-y'
      x1={xOffsetLeft}
      x2={xOffsetLeft + activeWidth}
      y1={yMarker.coord}
      y2={yMarker.coord}
    />
    <text x={xOffsetLeft / 2} y={yMarker.coord} class="marker-label marker-label-y">{yMarker.value}</text>
    {/each}
    {#each xScaleMarkers as xMarker}
    <line
      class='marker-line marker-line-x'
      x1={xMarker.coord}
      x2={xMarker.coord}
      y1={yOffsetTop}
      y2={height - yOffsetBottom}
    />
    <text x={xMarker.coord} y={height - yOffsetBottom / 2} class="marker-label marker-label-x">
      {xMarker.value}
    </text>
    {/each}


    <polyline class="chart-line"
      points={pts}
      fill="none" stroke="black"
    />
  </svg>
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
</div>

<style>
.pressure-chart-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.chart {
  display: block;
  width: 100%;
}

.chart-field {
  stroke: #333;
  fill:none;
  stroke-width: 0.5px;
}

.marker-line {
  fill: none;
  stroke: #555;
  stroke-width: 0.3px;
}
.marker-line-x {
  stroke: #888;
  stroke-dasharray: 1px, 5px;
}
.marker-label {
  color: #555;
  font-size: 12px;
  text-anchor: middle;
  alignment-baseline: middle;
  dominant-baseline: middle;
}
.marker-label-x {
  writing-mode: sideways-lr;
}
</style>
