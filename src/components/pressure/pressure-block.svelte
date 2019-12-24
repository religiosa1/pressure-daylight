<script>
import moment from "moment";

import { pressureEntries, startDate } from "./pressure.store.js";
import { TimeRanges } from "./time-ranges";

import PressureChart from "./pressure-chart.svelte";
import PressureTable from "./pressure-table.svelte";

$: filteredEntries = validateEntries($pressureEntries);

let dateRange = TimeRanges[0];
let displayType = "chart";

let endDate = new Date();
refresh();

function refresh() {
  endDate = new Date();
  $startDate = moment().subtract(dateRange.value, "days").toDate()
}

function validateEntries(etr) {
  return etr.then( e => {
    if (e && Array.isArray(e.data)) {
      return e.data.filter(p=>{
        if (
          !p ||
          !Number.isFinite(p.pressure) ||
          !moment(p.time).isAfter($startDate) ||
          !moment(p.time).isBefore(endDate)
        ) return false;
        return true;
      });
    }
    return Promise.reject(new Error("Нет массива данных в полученных точках"));
  });
}
</script>

<div class="pressure-chart-wrapper">
  <h2>Атмосферное давление</h2>
  <div class="chart-controls">
    <div class="ranges">
      {#each TimeRanges as range}
      <label>
        <input type="radio" bind:group={dateRange} value={range} on:change={refresh} />
        {range.name}
      </label>
      {/each}
    </div>
    <div class="display-type">
      <label>
        <input type="radio" bind:group={displayType} value="chart" />
        График
      </label>
      <label>
        <input type="radio" bind:group={displayType} value="table" />
        Таблица
      </label>
    </div>
    <button type="button" on:click={refresh}>Обновить</button>
  </div>
  <div class="pressure-data">
  {#await filteredEntries}
   <p>...загрузка</p>
  {:then entries}
    {#if displayType === "chart"}
    <PressureChart {entries} startDate={$startDate} endDate={endDate} {dateRange} />
    {:else}
    <PressureTable {entries} />
    {/if}
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
  </div>
</div>

<style>
  .pressure-chart-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  .pressure-data {
    min-height: 600px;
  }
  .chart-controls {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
</style>
