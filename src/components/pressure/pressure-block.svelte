<script>
import { format, isAfter, isBefore, subDays } from 'date-fns'

import { pressureEntries, startDate, endDate } from "./pressure.store.js";
import { TimeRanges } from "./time-ranges";

import PressureChart from "./pressure-chart.svelte";
import PressureTable from "./pressure-table.svelte";

$: filteredEntries = validateEntries($pressureEntries);

let dateRange = TimeRanges[0];
let displayType = "chart";

refresh();

function refresh() {
  $startDate = subDays(new Date(), dateRange.value);
}

function validateEntries(etr) {
  return etr.then( e => {
    if (e && Array.isArray(e.data)) {
      return e.data.filter(p=>{
        if (
          !p ||
          !Number.isFinite(p.pressure) ||
          !isAfter(p.time, $startDate) ||
          !isBefore(p.time, $endDate)
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
    <div class="ctrl-grp ranges">
      {#each TimeRanges as range}
      <label>
        <input type="radio" bind:group={dateRange} value={range} on:change={refresh} />
        {range.name}
      </label>
      {/each}
    </div>
    <div class="ctrl-grp display-type">
      <label>
        <input type="radio" bind:group={displayType} value="chart" />
        График
      </label>
      <label>
        <input type="radio" bind:group={displayType} value="table" />
        Таблица
      </label>
    </div>
    <div class="ctrl-grp refresh-ctrl">
      {#if $endDate}
        <span class="data-timestamp">
          Данные от { format($endDate, "HH:mm:ss") }
        </span>
      {/if}
      <button type="button" on:click={refresh}>Обновить</button>
    </div>
  </div>
  <div class="pressure-data">
  {#await filteredEntries}
   <p>...загрузка</p>
  {:then entries}
    {#if displayType === "chart"}
    <PressureChart {entries} startDate={$startDate} endDate={$endDate} {dateRange} />
    {:else}
    <PressureTable {entries} />
    {/if}
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
  </div>
</div>

<style>
  label {
    display: inline-block;
    vertical-align: middle;
  }
  .pressure-chart-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 6%;
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
  .ctrl-grp {
    margin-bottom: 1em;
  }
  @media (max-width: 900px) {
    .chart-controls {
      flex-flow: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
  .data-timestamp {
    font-size: smaller;
  }
</style>
