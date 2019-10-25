<script>
  import moment from "moment";
  export let times;

  const FORMAT = "H:mm:ss"
</script>

<style>
.times-list dt {
  display: inline-block;
  padding: 0;
  margin: 0;
  font-weight: bold;
}
.times-list dt::after {
  content: ": ";
  margin-right: 1ex;
}
.times-list dd {
  margin: 0;
  display: inline;
}
.times-list dd::after {
  content: "";
  display: block;
}
</style>

<dl class="times-list">
  <dt>sunrise</dt>
  <dd>{ moment(times.sunrise).format(FORMAT) }</dd>

  <dt>sunriseEnd</dt>
  <dd>{ moment(times.sunriseEnd).format(FORMAT) }</dd>

  <dt>goldenHourEnd</dt>
  <dd>{ moment(times.goldenHourEnd).format(FORMAT) }</dd>

  <dt>solarNoon</dt>
  <dd>{ moment(times.solarNoon).format(FORMAT) }</dd>

  <dt>goldenHour</dt>
  <dd>{ moment(times.goldenHour).format(FORMAT) }</dd>

  <dt>sunsetStart</dt>
  <dd>{ moment(times.sunsetStart).format(FORMAT) }</dd>

  <dt>sunset</dt>
  <dd>{ moment(times.sunset).format(FORMAT) }</dd>

  <dt>dusk</dt>
  <dd>{ moment(times.dusk).format(FORMAT) }</dd>

  <dt>nauticalDusk</dt>
  <dd>{ moment(times.nauticalDusk).format(FORMAT) }</dd>

  <dt>night</dt>
  <dd>{ moment(times.night).format(FORMAT) }</dd>

  <dt>nadir</dt>
  <dd>{ moment(times.nadir).format(FORMAT) }</dd>

  <dt>nightEnd</dt>
  <dd>{ moment(times.nightEnd).format(FORMAT) }</dd>

  <dt>nauticalDawn</dt>
  <dd>{ moment(times.nauticalDawn).format(FORMAT) }</dd>

  <dt>dawn</dt>
  <dd>{ moment(times.dawn).format(FORMAT) }</dd>
</dl>
