<script>
  import SunCalc from "suncalc";
  import TimesList from "./components/times-list.svelte";
  import range from "./range";
  import timeToDeg from "./time-to-deg";
  import { onMount } from 'svelte';

  const size = 300;
  const hsize = size/2
  const width = 20;
  const radius = hsize - width/2;

  let times = SunCalc.getTimes(new Date(), 55.7522200, 37.6155600);
  let time = new Date();

  $: currentTimeOffset = timeToDeg(time);

  let hours = range(24).map( h => {
    let d = new Date('1995-12-17T00:00:00');
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
      start: times.nightEnd,
      end: times.nauticalDawn,
      colorStart:"#01293b",
      stroke: "url(#grd-astro)",
    },
    {
      id: "nautical-dawn",
      start: times.nauticalDawn,
      end: times.dawn,
      stroke: "url(#grd-nautic)",
    },
    {
      id: "dawn",
      start: times.dawn,
      end: times.sunrise,
      stroke: "url(#grd-dusk)",
    },
    {
      id: "sunrise",
      start: times.sunrise,
      end: times.sunriseEnd,
      stroke: "url(#grd-sun)",
    },
    {
      id: "golden-hour-morning",
      start: times.sunriseEnd,
      end: times.goldenHourEnd,
      stroke: "url(#grd-golden)",
    },
    {
      id: "day",
      start: times.goldenHourEnd,
      end: times.goldenHour,
      stroke: "url(#grd-day)",
    },
    {
      id: "golden-hour-evening",
      start: times.goldenHour,
      end: times.sunsetStart,
      stroke: "url(#grd-golden)",
    },
    {
      id: "sunset",
      start: times.sunsetStart,
      end: times.sunset,
      stroke: "url(#grd-sun)",
    },
    {
      id: "dusk",
      start: times.sunset,
      end: times.dusk,
      stroke: "url(#grd-dusk)",
    },
    {
      id: "nautical-dusk",
      start: times.dusk,
      end: times.nauticalDusk,
      stroke: "url(#grd-nautic)",
    },
    {
      id: "astronomical-twilight-eveing",
      start: times.nauticalDusk,
      end: times.night,
      stroke: "url(#grd-astro)",
    },
    {
      id: "night",
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
  onMount(() => {
    const rotation_interval = setInterval(() => {
      time = new Date();
    }, 5000);
    // let day_interval;
    // let setDayInterval = () => {
    //   setInterval(() => {
    //
    //  }, 5000)
    // };

    return () => {
      clearInterval(rotation_interval);
    };
  });
</script>

<style>
  .clock {
    display: block;
    width:90vmin;
    height:90vmin;
    margin: auto;
  }
  .ring {
    stroke-width: 20px;
    fill: none;
  }

  .hour-line,
  .time-mark {
    fill: none;
    stroke-width: 1px;
    stroke: rgba(255, 0, 255, 0.5);
    mix-blend-mode: difference;
  }

  .hour-label {
    font-size: 9px;
    text-anchor: middle;
    mix-blend-mode: difference;
    fill: #0FF;
  }


</style>

<svg class="clock" viewbox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="grd-astro" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#0000aa"></stop>
    <stop offset="100%" stop-color="#000044"></stop>
  </linearGradient>
  <linearGradient id="grd-nautic" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#693fce"></stop>
    <stop offset="100%" stop-color="#1111bb"></stop>
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
   <stop offset="0%" stop-color="#bbccdd"></stop>
   <stop offset="100%" stop-color="#bbccff"></stop>
  </linearGradient>
  <linearGradient id="grd-night" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#000011"></stop>
   <stop offset="100%" stop-color="#000033"></stop>
  </linearGradient>

  <g id="clock" transform="rotate({-currentTimeOffset} 150 150)">
    {#each ringSections as section}
    <path
      id={section.id}
      d={calculatePath(section)}
      stroke={section.stroke}
      class={"ring ring-" + section.id}
    />
    {/each}

    {#each hours as hour}
    <line
      class='hour-line'
      x1="50%"
      x2="50%"
      y1='0'
      y2='3'
      transform='rotate({15 * hour.value} 150 150)'
    />
    <text x="50%" y="14" transform='rotate({hour.offset} 150 150)' class="hour-label">{hour.value}</text>
    {/each}

    {#each markers as marker}
    <line
      class={"time-mark "  + marker.class}
      x1="50%"
      x2="50%"
      y1='0'
      y2='20'
      transform='rotate({marker.offset} 150 150)'
    />
    {/each}
  </g>
</svg>

<TimesList times={times}/>
