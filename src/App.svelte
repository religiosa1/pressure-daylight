<script>
  import { latitude, longitude, date } from "./components/clock.store";

  import getTimes from "./utils/get-times";
  import Clock from "./components/clock.svelte";

  $: times = getTimes($date, $latitude, $longitude);
</script>

<Clock {times} />
