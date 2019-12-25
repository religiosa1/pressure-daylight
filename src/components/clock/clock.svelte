<script>
  import {onMount} from "svelte";
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import {latitude, longitude, date, tableView, state, ClockState } from "./clock.store";

  import Dial from "./dial.svelte";
  import SectionInfo from "./section-info.svelte";
  import TimesList from "./times-list.svelte";
  import Menu from "./menu.svelte";
  import DateForm from "./date-form.svelte"
  import PlaceForm from "./place-form.svelte"

  import timeToDeg from "@/utils/time-to-deg.js";
  import getTimes from "@/utils/get-times.js";

  $: times = getTimes($date, $latitude, $longitude);

  let time = new Date();

  let offseted = true;
  $: offset = offsetStyle(offseted);
  $: section = null;

  function updateSection(e) {
    if (e && e.detail) {
      section = e.detail;
    }
    else {
      section = null;
    }
  }

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

<div class="clock" class:side-pain-shown={$state !== ClockState.default}>
  <div class="clock-pane">
    {#if !$tableView}
    <div class="dial" transition:slide="{{ duration: 300, easing: quintOut }}">
      <div class="top-marker" class:top-marker-visible={offseted}></div>
      <div class="clock-wrapper" on:click={toggleOffset} >
        <div class="clock-rotater" style={offset}>
          <Dial {times} on:sectionHover={updateSection} />
        </div>
        <div class="dial-overlay" on:click|stopPropagation>
          <slot></slot>
        </div>
      </div>
      <SectionInfo {section} />
    </div>
    {:else}
    <div class="table" transition:slide="{{ duration: 300, easing: quintOut }}">
      <TimesList {times} />
    </div>
    {/if}
  </div>

  {#if $state === ClockState.placeform}
  <div class="side-form">
    <PlaceForm />
  </div>
  {/if}

  {#if $state === ClockState.dateform}
  <div class="side-form">
    <DateForm />
  </div>
  {/if}

  <Menu />
</div>

<style>
.clock {
  width: 100%;
  height: 100vh;
  font-size: 0;
  line-height: 100vh;
  text-align: center;
  padding: 1px;
}
  .clock-wrapper,
  .clock-rotater {
    border-radius: 50%;
    max-width: 85vmin;
    max-height: 85vmin;
  }
  .clock-wrapper {
    position: relative;
    margin: auto;
    overflow: hidden;
  }
  .clock-rotater { transition: transform 0.4s ease; }
  .dial-overlay {
    position: absolute;
    top: 20%;
    bottom: 20%;
    left:20%;
    right: 20%;
    margin: auto;
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 3vmin;
  }
  @media (max-aspect-ratio: 2/1) {
    .side-pain-shown .dial-overlay { font-size: 1.5vw }
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

  .clock-pane,
  .side-form {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    margin:auto;
    width:50%;
    font-size: 1rem;
    line-height: 1.2;
  }
  .clock-pane {
    width: 100%;
  }
  .side-pain-shown .clock-pane { width: 50%; }
</style>
