<script>
  import Clock from "./components/clock/index.svelte";
  import PressureCurrent from "./components/pressure/pressure-current.svelte";
  import PressureBlock from "./components/pressure/pressure-block.svelte";
</script>

<Clock>
  <PressureCurrent />
</Clock>

<PressureBlock />

<style global src="./styles.css"></style>
