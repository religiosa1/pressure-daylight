<script>
  import range from "../range";
  import timeToDeg from "../time-to-deg";
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let times;

  const size = 306;
  const padding = 3;
  const hsize = size/2
  const width = 20;
  const radius = hsize - width/2 - padding;

  function sectionHover(section) {
    dispatch("sectionHover", section);
  }

  let hours = range(24).map( h => {
    let d = new Date('2000-01-01T00:00:00');
    d.setHours(h);
    return {
      value: h,
      offset: timeToDeg(d)
    };
  });

  let markers = [
    {
      name: "солнечный полдень",
      time: times.solarNoon,
      offset: timeToDeg(times.solarNoon),
      class: "time-mark-noon",
    },
    {
      name: "надир",
      time: times.nadir,
      offset: timeToDeg(times.nadir),
      class: "time-mark-nadir",
    },
  ];

  let ringSections = [
    {
      id: "astronomical-twilight-morning",
      name: "астрономические сумерки",
      start: times.nightEnd,
      end: times.nauticalDawn,
      stroke: "url(#grd-astro)",
    },
    {
      id: "nautical-dawn",
      name: "навигационные сумерки",
      start: times.nauticalDawn,
      end: times.dawn,
      stroke: "url(#grd-nautic)",
    },
    {
      id: "dawn",
      name: "гражданские сумерки",
      start: times.dawn,
      end: times.sunrise,
      stroke: "url(#grd-dusk)",
    },
    {
      id: "sunrise",
      name: "восход",
      start: times.sunrise,
      end: times.sunriseEnd,
      stroke: "url(#grd-sun)",
    },
    {
      id: "golden-hour-morning",
      name: "золотой час",
      start: times.sunriseEnd,
      end: times.goldenHourEnd,
      stroke: "url(#grd-golden)",
    },
    {
      id: "day",
      name: "день",
      start: times.goldenHourEnd,
      end: times.goldenHour,
      stroke: "url(#grd-day)",
    },
    {
      id: "golden-hour-evening",
      name: "золотой час",
      start: times.goldenHour,
      end: times.sunsetStart,
      stroke: "url(#grd-golden)",
    },
    {
      id: "sunset",
      name: "закат",
      start: times.sunsetStart,
      end: times.sunset,
      stroke: "url(#grd-sun)",
    },
    {
      id: "dusk",
      name: "гражданские сумерки",
      start: times.sunset,
      end: times.dusk,
      stroke: "url(#grd-dusk)",
    },
    {
      id: "nautical-dusk",
      name: "навигационные сумерки",
      start: times.dusk,
      end: times.nauticalDusk,
      stroke: "url(#grd-nautic)",
    },
    {
      id: "astronomical-twilight-eveing",
      name: "астрономические сумерки",
      start: times.nauticalDusk,
      end: times.night,
      stroke: "url(#grd-astro)",
    },
    {
      id: "night",
      name: "ночь",
      start: times.night,
      end: times.nightEnd,
      stroke: "url(#grd-night)",
    },
  ];

  function calculatePath(section) {
    let startDeg = timeToDeg(section.start);
    let endDeg = timeToDeg(section.end);

    let start_x = size/2 + Math.cos(startDeg * Math.PI / 180 - Math.PI/2) * radius;
    let start_y = size/2 + Math.sin(startDeg * Math.PI / 180 - Math.PI/2) * radius;

    let end_x = size/2 +  Math.cos(endDeg * Math.PI / 180 - Math.PI/2) * radius;
    let end_y = size/2 +  Math.sin(endDeg * Math.PI / 180 - Math.PI/2) * radius;

    return `M${start_x} ${start_y} A${radius} ${radius} 0 0 1 ${end_x} ${end_y}`;
  }
</script>

<style>
  .clock {
    display: block;
    margin: auto;
  }
  .ring {
    stroke-width: 20px;
    fill: none;
  }
  .ring:hover {
    filter: drop-shadow(0 0 2px blue);
  }

  .hour-line,
  .time-mark {
    fill: none;
    stroke-width: 1px;
    stroke: rgba(255, 122, 255, 0.5);
    mix-blend-mode: difference;
    transition: stroke 0.2s ease;
  }
  .time-mark:hover {
    stroke: rgba(255,255,255,0.8);
  }

  .hour-label {
    font-size: 9px;
    text-anchor: middle;
    mix-blend-mode: difference;
    fill: #aFF;
  }


</style>

<svg class="clock" viewbox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="grd-astro" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#0000aa"></stop>
    <stop offset="100%" stop-color="#000044"></stop>
  </linearGradient>
  <linearGradient id="grd-nautic" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#592fce"></stop>
    <stop offset="100%" stop-color="#112fbb"></stop>
  </linearGradient>
  <linearGradient id="grd-dusk" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#de8e4f"></stop>
    <stop offset="100%" stop-color="#894fde"></stop>
  </linearGradient>
  <linearGradient id="grd-golden" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#ccffdd"></stop>
    <stop offset="100%" stop-color="#ffd844"></stop>
  </linearGradient>
  <linearGradient id="grd-sun" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#ffa800"></stop>
   <stop offset="100%" stop-color="#ff7000"></stop>
  </linearGradient>
  <linearGradient id="grd-day" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#bcdcdd"></stop>
   <stop offset="100%" stop-color="#bbccff"></stop>
  </linearGradient>
  <linearGradient id="grd-night" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#000011"></stop>
   <stop offset="100%" stop-color="#000033"></stop>
  </linearGradient>

  {#each ringSections as section}
  <path
    id={section.id}
    d={calculatePath(section)}
    stroke={section.stroke}
    class={"ring ring-" + section.id}
    on:mouseover={()=>sectionHover(section)}
    on:mouseleave={()=>sectionHover()}
  />
  {/each}

  {#each hours as hour}
  <line
    class='hour-line'
    x1="50%"
    x2="50%"
    y1={padding}
    y2={padding + 3}
    transform='rotate({15 * hour.value} {hsize} {hsize})'
  />
  <text x="50%" y={padding + 14} transform='rotate({hour.offset} {hsize} {hsize})' class="hour-label">{hour.value}</text>
  {/each}

  {#each markers as marker}
  <line
    class={"time-mark "  + marker.class}
    x1="50%"
    x2="50%"
    y1={padding}
    y2={padding + width}
    transform='rotate({marker.offset} {hsize} {hsize})'
    on:mouseover={()=>sectionHover(marker)}
    on:mouseleave={()=>sectionHover()}
  />
  {/each}
</svg>
