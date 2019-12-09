<script>
import moment from "moment";

import {dateType, date, manualDow, state, ClockState} from "./clock.store";

$: dateFormatted = moment($date).format("YYYY/M/DD");
let localDow;

$: if ($dateType === "auto") {
  localDow = moment($date).dayOfYear();
} else {
  $manualDow = localDow;
}

function close() {
  $state = ClockState.default;
}

</script>

<div class="date-form">
  <div class="dateType-selector">
    <p>
      <label>
        <input type="radio" bind:group={$dateType} value="auto" />
        Текущая дата
      </label>
    </p>
    <p>
      <label>
        <input type="radio" bind:group={$dateType} value="manual" />
        Выбрать дату
      </label>
    </p>
  </div>
  <div class="date-viewer">
    <!-- TODO a fancy date-viewing form -->
    <p>
      <output value="selectedDate">{dateFormatted}</output>
    </p>
    <p>
      <input
        type="range"
        bind:value={localDow}
        disabled={$dateType !== "manual"}
        min="1" max="365"
      />
    </p>
  </div>
  <button type="button" on:click={close} class="btn close">
    Закрыть
  </button>
</div>
