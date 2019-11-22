<script>
  import { createEventDispatcher } from 'svelte';

  import range from "../functions/range";
  import timeToDeg from "../functions/time-to-deg";
  import { timeRingSections } from "../functions/timeRingSections";

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

  $: markers = [
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

  const colors = {
    "astronomical-twilight-morning": "url(#grd-astro)",
    "nautical-dawn": "url(#grd-nautic)",
    "dawn": "url(#grd-dusk)",
    "sunrise": "url(#grd-sun)",
    "golden-hour-morning": "url(#grd-golden)",
    "day": "url(#grd-day)",
    "golden-hour-evening": "url(#grd-golden)",
    "sunset": "url(#grd-sun)",
    "dusk": "url(#grd-dusk)",
    "nautical-dusk": "url(#grd-nautic)",
    "astronomical-twilight-eveing": "url(#grd-astro)",
    "night": "url(#grd-night)",
  };

  function colorizeSections(times) {
    if (!Array.isArray(times)) return [];

    return times.map(i => {
      if (i.id in colors) {
        i.stroke = colors[i.id];
      }
      return i;
    });
  }

  $: ringSections = colorizeSections(timeRingSections(times));

  $: ringSections.forEach(a=>{
    console.log({
      ...a,
      startDeg: timeToDeg(a.start),
      endDeg: timeToDeg(a.end)
    })
  })

  function calculatePath(section) {
    let startDeg = timeToDeg(section.start);
    let endDeg = timeToDeg(section.end);
    let largeArcFlag = (endDeg - startDeg >= 180) ? '1' : '0';

    let start_x = size/2 + Math.cos(startDeg * Math.PI / 180 - Math.PI/2) * radius;
    let start_y = size/2 + Math.sin(startDeg * Math.PI / 180 - Math.PI/2) * radius;

    let end_x = size/2 +  Math.cos(endDeg * Math.PI / 180 - Math.PI/2) * radius;
    let end_y = size/2 +  Math.sin(endDeg * Math.PI / 180 - Math.PI/2) * radius;

    return `M${start_x} ${start_y} A${radius} ${radius} 0 ${largeArcFlag} 1 ${end_x} ${end_y}`;
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
