<script>
import moment from "moment";

export let entries = null;

let precision = 5;

function formatTime(time) {
  return moment(time).format("YY.MM.DD HH:mm");
}

function formatPres(pres, precision) {
  if (typeof pres === "number") {
    return pres.toFixed(precision);
  }
}
</script>

<div class="table-container">
  <div class="table-responsive table-sticky">
    <table class="table">
      <thead>
        <tr>
          <th>Время</th>
          <th>Давление мм.рт.ст.</th>
          <th>Температура датчика</th>
        </tr>
      </thead>
      <tbody>
        {#each entries as entry}
        <tr>
          <td>{formatTime(entry.time)}</td>
          <td>{formatPres(entry.pressure, precision)}</td>
          <td>{entry.temperature}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p>
    <label>
      <input type="number" bind:value={precision} min="0" max="10" step="1" />
      Точность
    </label>
  </p>
</div>

<style>
.table-container {
  margin: auto;
  max-width: 500px;
}

.table-sticky {
  position: relative;
  max-height: 74vh;
  overflow-y: auto;
  border-top: 1px solid var(--table-border-color);
  border-bottom: 1px solid var(--table-border-color);
  scrollbar-width: thin;
}
.table-sticky .table {
  width: 100%;
}
.table-sticky thead {
  border-bottom: 1px solid var(--table-border-color);
}

.table-sticky thead th,
.table-sticky thead td {
  position: sticky;
  top:0;
  background-clip: padding-box;
  border-top:0;
}
</style>
