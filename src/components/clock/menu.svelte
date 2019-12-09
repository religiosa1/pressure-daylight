<script>
  import { tableView, state, ClockState } from './clock.store';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let menuShown = false;

  $: tableViewTitle = $tableView? "циферблат" : "табличный вид";

  export function open() {
    menuShown = true;
  }
  export function close() {
    menuShown = false;
  }
  function toggle() {
    if (menuShown) close();
    else open();
  }

  function toggleTableView() {
    tableView.update(n => !n);
  }

  function togglePlaceForm() {
    if ($state === ClockState.placeform) {
      $state = ClockState.default;
    } else {
      $state = ClockState.placeform;
    }
  }

  function toggleDateForm() {
    if ($state === ClockState.dateform) {
      $state = ClockState.default;
    } else {
      $state = ClockState.dateform;
    }
  }
</script>

<aside class="menu">
  <button
    type="button"
    title={menuShown? 'Закрыть меню' : 'Открыть меню'}
    class="menu_button menu-toggler"
    class:active={menuShown}
    on:click={toggle}
  />
  {#if menuShown}
  <div class="menu-dropdown" transition:slide="{{ duration: 200, easing: quintOut }}">
    <button
      type="button"
      class="menu_button display-type"
      class:display-type-dial={$tableView}
      title={tableViewTitle}
      on:click={toggleTableView}
    />
    <button
      type="button"
      class="menu_button placeform"
      class:active={ $state === ClockState.placeform }
      title="Выбор места"
      on:click={togglePlaceForm}
    />
    <button
      type="button"
      class="menu_button dateform"
      class:active={ $state === ClockState.dateform }
      title="Выбор даты"
      on:click={toggleDateForm}
    />
  </div>
  {/if}
</aside>

<style>
.menu {
  position: absolute;
  top: 10px;
  right: 30px;
}
  .menu_button {
    display: block;
    width:50px;
    height: 50px;
    border: 1px solid #888;
    border-radius: 50%;
    margin: 0 0 10px;
    padding: 0;
    background: #eee no-repeat center / 65% auto;
    box-shadow: 0 0 20px #ccc inset;
    transition: background-color 0.4s ease-in-out;
  }
    .menu_button:active { transform: translate(1px, 1px); }
    .menu_button.active { background-color: #999; }

    .display-type { background-image: url("/img/table.svg"); }
    .display-type-dial { background-image: url("/img/dial.svg"); }
    .menu-toggler { background-image: url("/img/burger.svg");  }
    .menu-toggler.active { background-image: url("/img/cross.svg");  }
    .placeform { background-image: url("/img/globe.svg"); }
    .dateform { background-image: url("/img/calendar.svg"); }

</style>
