<script>
  import {tableView, state, ClockState } from "./clock.store";

  import Clock from "./clock.svelte";
  import TimesList from "./times-list.svelte";
  import Menu from "./menu.svelte";
  import DateForm from "./date-form.svelte"
  import PlaceForm from "./place-form.svelte"
</script>

<div class="clock" class:side-pain-shown={$state !== ClockState.default}>
  <div class="clock-pane">
    {#if !$tableView}
      <Clock>
        <slot></slot>
      </Clock>
    {:else}
      <TimesList />
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
