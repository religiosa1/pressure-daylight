<script>
  import { createEventDispatcher } from 'svelte';
  import moment from "moment";

  import range from "@/utils/range.js";
  import timeToDeg from "@/utils/time-to-deg.js";
  import { timeRingSections } from "@/utils/time-ring-sections.js";

	const dispatch = createEventDispatcher();

  export let times;

  const size = 306;
  const padding = 3;
  const hsize = size/2
  const width = 20;
  const radius = hsize - width/2 - padding;

  let selectedSection = null;
  function sectionHover(section) {
    selectedSection = section;
    dispatch("sectionHover", section);
  }

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
    "astronomical-twilight-morning": {
      stroke: "url(#grd-astro)",
      name: "астрономические сумерки",
    },
    "nautical-dawn": {
      stroke: "url(#grd-nautic)",
      name: "навигационные сумерки",
    },
    "dawn": {
      stroke: "url(#grd-dusk)",
      name: "гражданские сумерки",
    },
    "sunrise": {
      stroke: "url(#grd-sun)",
      name: "восход",
    },
    "golden-hour-morning": {
      stroke: "url(#grd-golden)",
      name: "золотой час",
    },
    "day": {
      stroke: "url(#grd-day)",
      name: "день",
    },
    "golden-hour-evening": {
      stroke: "url(#grd-golden)",
      name: "золотой час",
    },
    "sunset": {
      stroke: "url(#grd-sun)",
      name: "закат",
    },
    "dusk": {
      stroke: "url(#grd-dusk)",
      name: "гражданские сумерки",
    },
    "nautical-dusk": {
      stroke: "url(#grd-nautic)",
      name: "навигационные сумерки",
    },
    "astronomical-twilight-eveing": {
      stroke: "url(#grd-astro)",
      name: "астрономические сумерки",
    },
    "night": {
      stroke: "url(#grd-night)",
      name: "ночь",
    },
  };

  function colorizeSections(times) {
    if (!Array.isArray(times)) return [];

    return times.map(i => {
      if (i.id in colors) {
        i.stroke = colors[i.id].stroke;
        i.name = colors[i.id].name;
      }
      return i;
    });
  }

  $: trsections = timeRingSections(times).map(i => {
    i.startDeg = timeToDeg(i.start);
    i.endDeg = timeToDeg(i.end);
    return i;
  });
  let ringSections;
  $: if (trsections && trsections.length > 0) {
    ringSections = colorizeSections(trsections);
  } else {
    let cm = moment(times.nadir);
    let s = {
      id: times.isWinter? "night" : "day",
      start: moment(cm).startOf('day').toDate(),
      end: moment(cm).endOf('day').toDate(),
    };
    ringSections = colorizeSections([s]);
  }

  $: hours = Array.from( range(24), h => {
    let degree = 15 * h;
    return {
      value: h,
      degree,
      section: findSectionByDegree(degree, ringSections),
    }
  });

  function calculatePath(section) {
    let largeArcFlag;
    let diff = section.endDeg - section.startDeg;
    if (diff >= 180 || (diff < 0 && diff > -180)) {
      largeArcFlag = '1';
    } else {
      largeArcFlag = '0';
    }

    let start_x = size/2 + Math.cos(section.startDeg * Math.PI / 180 - Math.PI/2) * radius;
    let start_y = size/2 + Math.sin(section.startDeg * Math.PI / 180 - Math.PI/2) * radius;

    let end_x = size/2 +  Math.cos(section.endDeg * Math.PI / 180 - Math.PI/2) * radius;
    let end_y = size/2 +  Math.sin(section.endDeg * Math.PI / 180 - Math.PI/2) * radius;

    return `M${start_x} ${start_y} A${radius} ${radius} 0 ${largeArcFlag} 1 ${end_x} ${end_y}`;
  }

  function findSectionByDegree(d, sections) {
    if (!Array.isArray(sections)) return null;
    return sections.find(i=> {
      if (i.startDeg <= i.endDeg) {
        return i.startDeg <= d && d < i.endDeg
      } else {
        return i.startDeg <= d || d < i.endDeg;
      }
    });
  }
</script>

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

  <g class="ring-sections">
    {#each ringSections as section}
    <path
      id={section.id}
      d={calculatePath(section)}
      stroke={section.stroke}
      class={"ring-section ring-section-" + section.id}
      class:highlight={selectedSection == section}
      on:mouseover={()=>sectionHover(section)}
      on:mouseleave={()=>sectionHover()}
    />
    {/each}
  </g>

  <g class="hours">
    {#each hours as hour}
      <g class="hour"
        class:highlight={selectedSection && hour.section === selectedSection}
        on:mouseover={()=>sectionHover(hour.section)}
        on:mouseleave={()=>sectionHover()}
      >
        <line
          class='hour-line'
          x1="50%"
          x2="50%"
          y1={padding}
          y2={padding + 3}
          transform='rotate({hour.degree} {hsize} {hsize})'
        />
        <text
          x="50%"
          y={padding + 14}
          transform='rotate({hour.degree} {hsize} {hsize})'
          class="hour-label"
        >
          {hour.value}
        </text>
    </g>
    {/each}
  </g>

  <g class="markers">
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
  </g>
</svg>

<style>
  .clock {
    display: block;
    margin: auto;
  }
  .ring-section {
    stroke-width: 20px;
    fill: none;
  }
  .ring-section.highlight {
    filter: drop-shadow(0 0 2px blue);
  }

  .hour-line,
  .time-mark {
    fill: none;
    stroke-width: 1px;
    stroke: #ff7aff80;
    mix-blend-mode: difference;
    transition: stroke 0.2s ease;
  }

  .hour-label {
    font-size: 9px;
    text-anchor: middle;
    mix-blend-mode: difference;
    fill: #aFF;
    stroke: none;
    stroke-width: 0;
    transition: fill 0.2s ease;
  }
  .hour.highlight .hour-label {
    fill: #fFF;
  }
  .hour.highlight .hour-line {
    stroke: #ff7affff;
  }
</style>
