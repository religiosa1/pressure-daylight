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
  <label>
    <input type="number" bind:value={precision} min="0" max="10" step="1" />
    Точность
  </label>

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
</div>

<style>
.table-container {
  margin: auto;
  max-width: 500px;
}

.table-sticky {
  /* TODO */
}
</style>
