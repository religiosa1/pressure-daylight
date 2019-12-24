<script>
import moment from "moment";
import range from "@/utils/range.js";

export let entries = null;
export let dateRange = null;
export let startDate = null;
export let endDate = null;

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

const yScaleMarkers = Array.from(
  range(yScaleMin, yScaleMax + 10, 10),
  y => ({
    value: y,
    coord: yPos(y)
  })
);

$: startDateVal = (startDate instanceof Date) ? startDate.getTime() : NaN;
$: nowOffsetedVal = getNowOffseted(startDateVal);
$: points = calculatePath(entries);

$: xScaleMarkers = Array.from(
  range(
    moment(startDate).startOf(dateRange.markerSnap).toDate().getTime() + dateRange.markerResolution,
    (new Date()).getTime(),
    dateRange.markerResolution),
  x => ({
    value: moment(x).format(dateRange.format),
    coord: xPos(x)
  })
);

function calculatePath(e) {
  console.log("КАЛЬКУЛЯТОР", e);
  if (!Array.isArray(e)) {
    throw new Error("Points data isn't an array");
  }
  nowOffsetedVal = getNowOffseted(startDateVal);
  return e.map(calculatePoint).join(" ");
}

function calculatePoint(p) {
  let y = yPos(p.pressure);
  let t = (new Date(p.time)).getTime();
  let x = xPos(t);
  return x + "," + y;
}

function getNowOffseted(offset) {
  if (endDate instanceof Date) {
    return endDate.getTime() - offset;
  }
  return NaN;
}

function yPos(press) {
  return (press - yScaleMin) / yScaleRange * -activeHeight + activeHeight + yOffsetTop;
}
function xPos(time) {
  return (time - startDateVal) / nowOffsetedVal * activeWidth + xOffsetLeft;
}
</script>

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
    {points}
    fill="none" stroke="black"
  />
</svg>

<style>
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
