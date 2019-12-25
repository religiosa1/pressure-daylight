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
  range(yScaleMin, yScaleMax + 5, 5),
  y => ({
    value: y,
    coord: yPos(y),
    secondary: y%10 >= 4.5
  })
);

$: startDateVal = (startDate instanceof Date) ? startDate.getTime() : NaN;
$: nowOffsetedVal = getNowOffseted(startDateVal);
$: points = calculatePath(entries);


$: xScalePrimaryMarkers = new Set(range(
  moment(startDate).startOf(dateRange.markerSnap).toDate().getTime() + dateRange.markerResolution,
  endDate.getTime(),
  dateRange.markerResolution
));
$: xScaleMarkers = Array.from(
  range(
    moment(startDate).startOf(dateRange.markerSnap).toDate().getTime() + dateRange.markerSecondaryResolution,
    endDate.getTime(),
    dateRange.markerSecondaryResolution
  ),
  x => ({
    value: moment(x).format(dateRange.format),
    coord: xPos(x),
    secondary: !xScalePrimaryMarkers.has(x),
  })
);

function calculatePath(e) {
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
  <g class="marker-group marker-group-x">
    <line
      class='marker-line marker-line-y'
      class:marker-line-secondary={yMarker.secondary}
      x1={xOffsetLeft}
      x2={xOffsetLeft + activeWidth}
      y1={yMarker.coord}
      y2={yMarker.coord}
    />
    <text
      x={xOffsetLeft / 2}
      y={yMarker.coord}
      class="marker-label marker-label-y"
      class:marker-label-secondary={yMarker.secondary}
    >
      {yMarker.value}
    </text>
  </g>
  {/each}
  {#each xScaleMarkers as xMarker}
  <g class="marker-group marker-group-x">
    <line
      class='marker-line marker-line-x'
      class:marker-line-secondary={xMarker.secondary}
      x1={xMarker.coord}
      x2={xMarker.coord}
      y1={yOffsetTop}
      y2={height - yOffsetBottom}
    />
    <text
      x={xMarker.coord}
      y={height - yOffsetBottom / 2}
      class="marker-label marker-label-x"
      class:marker-label-secondary={xMarker.secondary}
    >
      {xMarker.value}
    </text>
  </g>
  {/each}

  <polyline class="chart-line"
    {points}
    fill="none" stroke="black"
  />
</svg>

<style>
.chart {
  display: block;
  width: autp;
  margin: 0 -1.25% 0 -3.75%;
}

.chart-field {
  stroke: #333;
  fill:none;
  stroke-width: 0.5px;
}

.marker-line {
  fill: none;
  stroke: #444;
  stroke-width: 0.5px;
}
.marker-line-secondary {
  stroke: #888;
  stroke-dasharray: 1px, 2px;
}
.marker-label {
  font-size: 12px;
  text-anchor: middle;
  alignment-baseline: middle;
  dominant-baseline: middle;
}
.marker-label-secondary {
  font-weight: 300;
}
.marker-label-x {
  writing-mode: sideways-lr;
}

.marker-group:hover .marker-line {
  stroke: #00F;
}
.marker-group:hover .marker-label {
  color: #00F;
  fill: #00F;
}
</style>
