<script>
  import {onMount} from "svelte";
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import {tableView} from "./clock.store";

  import Dial from "./dial.svelte";
  import TimesList from "./times-list.svelte";
  import Menu from "./menu.svelte";

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
  }
</script>

<style>
.clock {
  position: relative;
}
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
  .table {
    padding: 20px;
  }
</style>

<div class="clock">
  <Menu />

  {#if !$tableView}
  <div class="dial" transition:slide="{{ duration: 300, easing: quintOut }}">
    <div class="top-marker" class:top-marker-visible={offseted}></div>
    <div class="clock-wrapper" on:click={toggleOffset} style={offset}>
      <Dial times={times} />
    </div>
  </div>
  {:else}
  <div class="table" transition:slide="{{ duration: 300, easing: quintOut }}">
    <TimesList times={times} />
  </div>
  {/if}
</div>
