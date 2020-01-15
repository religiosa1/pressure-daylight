<script>
  import { onDestroy } from "svelte";
  import { tableView, state, ClockState } from "./clock.store";

  import Clock from "./clock.svelte";
  import TimesList from "./times-list.svelte";
  import Menu from "./menu.svelte";
  import DateForm from "./date-form.svelte";
  import PlaceForm from "./place-form.svelte";

  const bodyClass = "side-pain-shown";

  function closeSidePane() {
    $state = ClockState.default;
  }
  const unsubscribe = state.subscribe(value => {
    if (value === ClockState.default) {
      document.body.classList.remove(bodyClass);
    } else {
      document.body.classList.add(bodyClass);
    }
  });
  onDestroy(()=>{
    unsubscribe();
    document.body.classList.remove(bodyClass);
  });
</script>
<div class="clock">
  <div class="clock-pane">
    {#if !$tableView}
      <Clock>
        <slot></slot>
      </Clock>
    {:else}
      <TimesList />
    {/if}
  </div>

  {#if $state !== ClockState.default}
  <div class="side-form" on:click={ () => window.screen.width < 700 && closeSidePane() }>
    <div class="side-form__wrapper">
      {#if $state === ClockState.placeform}
      <PlaceForm />
      {/if}
      {#if $state === ClockState.dateform}
      <DateForm />
      {/if}
      <button type="button" class="side-form-close" on:click={closeSidePane}>
        Закрыть
      </button>
    </div>
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
    font-size: 1rem;
    line-height: 1.2;
  }
  .clock-pane { width: 100%; }
  .side-form { width: 50%; }
  :global(.side-pain-shown .clock-pane) { width: 50%; }
  @media (max-width: 700px) {
    :global(.side-pain-shown .clock-pane) { width: 100%; }
    .side-form {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      overflow-y: auto;
      display: none;
      background: rgba(0, 0, 0, 0.5);
      padding: 1px;
    }
    :global(.side-pain-shown) { overflow-y: hidden; }
    :global(.side-pain-shown .side-form) { display: block; }
    .side-form__wrapper {
      max-width: 95%;
      margin: 65px auto 15px;
      position: relative;
      background: white;
      border: 1px solid gray;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
  }
</style>
