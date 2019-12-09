<script>
  import moment from "moment";
  export let times;

  const NA = "—/—"

  function format(time) {
    let t = moment(time);
    return t.isValid()? t.format("H:mm:ss") : NA;
  }
</script>

<style>
  .times-list {
    border-collapse: collapse;
    margin: auto;
  }
  th, td {
    padding: 7px 5px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #aaa;
    background: white;
  }
  th {
    font-weight: 600;
  }
  tr:nth-child(even) th,
  tr:nth-child(even) td {
    background: #EFEFEF;
  }
  th:first-child,
  td:first-child {
    text-align: right;
  }
  td { min-width: 5em; }
</style>

<table class="times-list">
  <tbody>
    <tr>
      <th>Астрономические сумерки</th>
      <td>{ format(times.nightEnd) }</td>
      <td>{ format(times.nauticalDawn) }</td>
    </tr>
    <tr>
      <th>Навигационные сумерки</th>
      <td>{ format(times.nauticalDawn) }</td>
      <td>{ format(times.dawn) }</td>
    </tr>
    <tr>
      <th>Гражданские сумерки</th>
      <td>{ format(times.dawn) }</td>
      <td>{ format(times.sunrise) }</td>
    </tr>
    <tr>
      <th>Восход</th>
      <td>{ format(times.sunrise) }</td>
      <td>{ format(times.sunriseEnd) }</td>
    </tr>
    <tr>
      <th>Утренний "золотой час"</th>
      <td>{ format(times.sunriseEnd) }</td>
      <td>{ format(times.goldenHourEnd) }</td>
    </tr>
    <tr>
      <th>День</th>
      <td>{ format(times.goldenHourEnd) }</td>
      <td>{ format(times.goldenHour) }</td>
    </tr>
    <tr>
      <th>Полдень</th>
      <td colspan="2">{ format(times.solarNoon) }</td>
    </tr>
    <tr>
      <th>Вечерний "золотой час"</th>
      <td>{ format(times.goldenHour) }</td>
      <td>{ format(times.sunsetStart) }</td>
    </tr>
    <tr>
      <th>Закат</th>
      <td>{ format(times.sunsetStart) }</td>
      <td>{ format(times.sunset) }</td>
    </tr>
    <tr>
      <th>Гражданские сумерки</th>
      <td>{ format(times.sunset) }</td>
      <td>{ format(times.dusk) }</td>
    </tr>
    <tr>
      <th>Навигационные сумерки</th>
      <td>{ format(times.dusk) }</td>
      <td>{ format(times.nauticalDusk) }</td>
    </tr>
    <tr>
      <th>Астрономические сумерки</th>
      <td>{ format(times.nauticalDusk) }</td>
      <td>{ format(times.night) }</td>
    </tr>
    <tr>
      <th>Ночь</th>
      <td>{ format(times.night) }</td>
      <td>{ NA }</td>
    </tr>
    <tr>
      <th>Надир</th>
      <td colspan="2">{ format(times.nadir) }</td>
    </tr>
  </tbody>
</table>
