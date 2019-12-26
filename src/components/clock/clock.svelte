<script>
  import { onMount } from "svelte";
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import Dial from "./dial.svelte";
  import SectionInfo from "./section-info.svelte";

  import timeToDeg from "@/utils/time-to-deg.js";

  let time = new Date();

  let rotated = true;
  $: rotationStyles = getRotationStyles(rotated);

  function getRotationStyles(rotated) {
    if (rotated) return `transform: rotate(-${timeToDeg(time)}deg)`
    return "";
  }

  function toggleRotation() {
    rotated = !rotated;
  }

  $: section = null;
  function updateSectionInfo(e) {
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

</script>


<div class="clock" transition:slide="{{ duration: 300, easing: quintOut }}">
  <div class="top-marker" class:top-marker-visible={rotated}></div>
  <div class="dial-wrapper" on:click={toggleRotation} >
    <div class="dial-rotater" style={rotationStyles}>
      <Dial on:sectionHover={updateSectionInfo} />
    </div>
    <div class="dial-overlay" on:click|stopPropagation>
      <slot></slot>
    </div>
  </div>
  <SectionInfo {section} />
</div>

<style>
  .dial-wrapper,
  .dial-rotater {
    border-radius: 50%;
    max-width: 85vmin;
    max-height: 85vmin;
  }
  .dial-wrapper {
    position: relative;
    margin: auto;
    overflow: hidden;
  }
  .dial-rotater { transition: transform 0.4s ease; }
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
