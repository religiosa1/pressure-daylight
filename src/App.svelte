<script>
  import { onMount } from 'svelte';

  import SunCalc from "suncalc";
  import TimesList from "./components/times-list.svelte";
  import Clock from "./components/clock.svelte";

  let day = new Date();
  $: times = SunCalc.getTimes(day, 55.7522200, 37.6155600);

  onMount(() => {
    let day_to;
    let setDayTO = () => {
      let now = new Date();
      let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      tomorrow.setHours(0);
      tomorrow.setMinutes(0);
      tomorrow.setSeconds(0);
      tomorrow.setMilliseconds(0);
      setTimeout(() => {
         day = new Date();
         setDayTO();
      }, tomorrow.getTime() - now.getTime())
    };
    day_to = setDayTO();

    return () => {
      clearTimeout(day_to);
    };
  });
</script>

<style>
</style>

<Clock times={times} />

<TimesList times={times} />
