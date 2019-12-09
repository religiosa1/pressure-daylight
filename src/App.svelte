<script>
  import Clock from "./components/clock/clock.svelte";
  import PressureCurrent from "./components/pressure/pressure-current.svelte";
  import PressureChart from "./components/pressure/pressure-chart.svelte";
</script>

<Clock>
  <PressureCurrent />
</Clock>

<PressureChart />
