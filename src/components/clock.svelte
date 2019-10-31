<script>
  import {onMount} from "svelte";
  import Dial from "./dial.svelte";

  import timeToDeg from "../time-to-deg";

  export let times;

  let time = new Date();

  let offseted = true;
  $: offset = offsetStyle(offseted);

  onMount(()=>{
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function offsetStyle(offseted) {
    if (offseted) return `transform: rotate(-${timeToDeg(time)}deg)`
    return "";
  }
  function toggleOffset() {
    offseted = !offseted;
    offsetStyle();
  }
</script>

<style>
  .clock-wrapper {
    border-radius: 50%;
    width: 85vmin;
    height: 85vmin;
    margin: auto;
    transition: transform 0.4s ease;
  }
  .top-marker {
    width: 0.8vmin;
    height: 0.8vmin;
    border: 2px solid black;
    border-top: 0;
    border-left: 0;
    margin: 0 auto 0.8vmin;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .top-marker-visible {
    opacity: 1;
  }

</style>

<div class="clock">
  <div class="top-marker" class:top-marker-visible={offseted}></div>
  <div class="clock-wrapper" on:click={toggleOffset} style={offset}>
    <Dial times={times} />
  </div>
</div>
