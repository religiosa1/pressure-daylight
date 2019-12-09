<script>
  import {currentPressure} from "./pressure.store";

  function format(val) {
    if (typeof val === "number") {
      return val.toFixed(2);
    }
    return val;
  }
</script>

<div class="pressure-current">
  {#await $currentPressure}
	 <p>...загрузка</p>
  {:then value}
    <h3 class="pressure-value">{format(value)}</h3>
    <p class="units">мм рт.ст.</p>
  {:catch error}
  	<p class="error">{error.message}</p>
  {/await}
</div>

<style>
  .pressure-value {
    line-height: 1;
    font-size: 5em;
    margin: 0;
  }
  .units {
    line-height: 1;
    font-size: 2em;
    margin: 0;
  }
  .error {
    color: red;
  }
</style>
