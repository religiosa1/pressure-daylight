<script>
  import { format as dateFormat, isValid } from "date-fns";

  import { suncalc } from "./clock.store";

  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const NA = "—/—"

  function format(time) {
    return isValid(time)? dateFormat(time, "H:mm:ss") : NA;
  }
</script>

<div class="table-responsive times-list" transition:slide="{{ duration: 300, easing: quintOut }}">
  <table class="table">
    <tbody>
      <tr>
        <th>Астрономические сумерки</th>
        <td>{ format($suncalc.nightEnd) }</td>
        <td>{ format($suncalc.nauticalDawn) }</td>
      </tr>
      <tr>
        <th>Навигационные сумерки</th>
        <td>{ format($suncalc.nauticalDawn) }</td>
        <td>{ format($suncalc.dawn) }</td>
      </tr>
      <tr>
        <th>Гражданские сумерки</th>
        <td>{ format($suncalc.dawn) }</td>
        <td>{ format($suncalc.sunrise) }</td>
      </tr>
      <tr>
        <th>Восход</th>
        <td>{ format($suncalc.sunrise) }</td>
        <td>{ format($suncalc.sunriseEnd) }</td>
      </tr>
      <tr>
        <th>Утренний "золотой час"</th>
        <td>{ format($suncalc.sunriseEnd) }</td>
        <td>{ format($suncalc.goldenHourEnd) }</td>
      </tr>
      <tr>
        <th>День</th>
        <td>{ format($suncalc.goldenHourEnd) }</td>
        <td>{ format($suncalc.goldenHour) }</td>
      </tr>
      <tr>
        <th>Полдень</th>
        <td colspan="2">{ format($suncalc.solarNoon) }</td>
      </tr>
      <tr>
        <th>Вечерний "золотой час"</th>
        <td>{ format($suncalc.goldenHour) }</td>
        <td>{ format($suncalc.sunsetStart) }</td>
      </tr>
      <tr>
        <th>Закат</th>
        <td>{ format($suncalc.sunsetStart) }</td>
        <td>{ format($suncalc.sunset) }</td>
      </tr>
      <tr>
        <th>Гражданские сумерки</th>
        <td>{ format($suncalc.sunset) }</td>
        <td>{ format($suncalc.dusk) }</td>
      </tr>
      <tr>
        <th>Навигационные сумерки</th>
        <td>{ format($suncalc.dusk) }</td>
        <td>{ format($suncalc.nauticalDusk) }</td>
      </tr>
      <tr>
        <th>Астрономические сумерки</th>
        <td>{ format($suncalc.nauticalDusk) }</td>
        <td>{ format($suncalc.night) }</td>
      </tr>
      <tr>
        <th>Ночь</th>
        <td>{ format($suncalc.night) }</td>
        <td>{ NA }</td>
      </tr>
      <tr>
        <th>Надир</th>
        <td colspan="2">{ format($suncalc.nadir) }</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.times-list {
  max-width: 600px;
  margin: auto;
}
.table { margin: auto; }
</style>
