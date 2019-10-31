<script>
  import moment from "moment";
  export let times;

  const FORMAT = "H:mm:ss"
</script>

<style>
  .times-list {
    border-collapse: collapse;
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
</style>

<table class="times-list">
  <tbody>
    <tr>
      <th>Астрономические сумерки</th>
      <td>{ moment(times.nightEnd).format(FORMAT) }</td>
      <td>{ moment(times.nauticalDawn).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Навигационные сумерки</th>
      <td>{ moment(times.nauticalDawn).format(FORMAT) }</td>
      <td>{ moment(times.dawn).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Гражданские сумерки</th>
      <td>{ moment(times.dawn).format(FORMAT) }</td>
      <td>{ moment(times.sunrise).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Восход</th>
      <td>{ moment(times.sunrise).format(FORMAT) }</td>
      <td>{ moment(times.sunriseEnd).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Утренний "золотой час"</th>
      <td>{ moment(times.sunriseEnd).format(FORMAT) }</td>
      <td>{ moment(times.goldenHourEnd).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>День</th>
      <td>{ moment(times.goldenHourEnd).format(FORMAT) }</td>
      <td>{ moment(times.goldenHour).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Полдень</th>
      <td colspan="2">{ moment(times.solarNoon).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Вечерний "золотой час"</th>
      <td>{ moment(times.goldenHour).format(FORMAT) }</td>
      <td>{ moment(times.sunsetStart).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Закат</th>
      <td>{ moment(times.sunsetStart).format(FORMAT) }</td>
      <td>{ moment(times.sunset).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Гражданские сумерки</th>
      <td>{ moment(times.sunset).format(FORMAT) }</td>
      <td>{ moment(times.dusk).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Навигационные сумерки</th>
      <td>{ moment(times.dusk).format(FORMAT) }</td>
      <td>{ moment(times.nauticalDusk).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Астрономические сумерки</th>
      <td>{ moment(times.nauticalDusk).format(FORMAT) }</td>
      <td>{ moment(times.night).format(FORMAT) }</td>
    </tr>
    <tr>
      <th>Ночь</th>
      <td>{ moment(times.night).format(FORMAT) }</td>
      <td>&mdash;</td>
    </tr>
    <tr>
      <th>Надир</th>
      <td colspan="2">{ moment(times.nadir).format(FORMAT) }</td>
    </tr>
  </tbody>
</table>
