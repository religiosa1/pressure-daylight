<script>
  import { tableView } from './clock.store';
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
</script>

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
    background: #aaa no-repeat center / 65% auto;
    box-shadow: 0 0 20px #ccc inset;
  }
    .menu_button:active { transform: translate(1px, 1px); }
    .display-type { background-image: url("/img/table.svg"); }
    .display-type-dial { background-image: url("/img/dial.svg"); }
    .menu-toggler { background-image: url("/img/burger.svg");  }
    .menu-toggler.active { background-image: url("/img/cross.svg");  }

</style>

<aside class="menu">
  <button
    type="button"
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
  </div>
  {/if}
</aside>
