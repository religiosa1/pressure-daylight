<script>
  import { latitude, longitude, restoreLocation, saveLocation } from "./clock.store";

  const hasGeolocationApi = navigator && "geolocation" in navigator;

  let loading = false;
  let geoerror = false;

  function retrieveLocation() {
    loading = true;
    geoerror = false;
    navigator.geolocation.getCurrentPosition(pos => {
      loading = false;
      $latitude = pos.coords.latitude;
      $longitude = pos.coords.longitude;
    }, error => {
      geoerror = error;
    });
  }
</script>

<div class="place-form">
  {#if hasGeolocationApi}
  <button type="button" on:click={retrieveLocation}>
    Текущие координаты
  </button>
  {/if}
  <button type="button" on:click={restoreLocation}>
    Сохранённые координаты
  </button>

  {#if loading}
  <div class="preloader">Определяю координаты</div>
  {/if}
  {#if geoerror}
  <div class="error">
    <p>Ошибка при получении координат:</p>
    <p class="message">{geoerror.message}</p>
  </div>
  {/if}

  <div class="place-selector">
    <p class="current-coordinates">
      <input type="number" min="-90" max="90" bind:value={$latitude} step="any" />
      :
      <input type="number" min="-180" max="180" bind:value={$longitude} step="any" />
    </p>
    <p>
      <label>
        Широта
        <input bind:value={$latitude} type="range" max="90" min="-90" />
      </label>
    </p>
    <p>
      <label>
        Долгота
        <input bind:value={$longitude} type="range" max="180" min="-180" />
      </label>
    </p>
    <button type="button" on:click={saveLocation}>
      Сохранить координаты
    </button>
  </div> <!-- END .placeSelector -->
</div>
