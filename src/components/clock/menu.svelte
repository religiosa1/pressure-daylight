<script>
  import { tableView, state, ClockState } from './clock.store';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let menuShown = false;

  $: tableViewTitle = $tableView ? "циферблат" : "табличный вид";

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
  function closing(fn) {
    return function() {
      close();
      fn.call(this, arguments);
    };
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

<aside class="menu" class:menu-opened={ menuShown }>
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
      on:click={closing(togglePlaceForm)}
    />
    <button
      type="button"
      class="menu_button dateform"
      class:active={ $state === ClockState.dateform }
      title="Выбор даты"
      on:click={closing(toggleDateForm)}
    />
  </div>
  {/if}
</aside>

<style>
.menu {
  position: absolute;
  top: 10px;
  right: 30px;
  background: transparent;
  transition: background-color 0.4s, box-shadow 0.4s;
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
    transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out;
    outline: 0;
  }
  .menu-dropdown .menu_button:last-of-type { margin-bottom: 0; }
    .menu_button:focus {
      border-color: #88f;
    }
    @media (max-width: 700px) {
      .menu_button {
        width: 35px;
        height: 35px;
      }
      .menu {
        right: 10px;
        padding: 10px;
        border-radius: 35px;
      }
      .menu.menu-opened {
        background: rgba(0,0,0,0.5);
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      }
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
