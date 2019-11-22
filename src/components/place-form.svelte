<script>
  import { latitude, longitude, restoretLocation, saveLocation } from "./clock.store";

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
  <p class="current-coordinates">
    {$latitude} : {$longitude}
  </p>

  {#if hasGeolocationApi}
  <button type="button" on:click={retrieveLocation}>
    Текущие координаты
  </button>
  {/if}
  <button type="button" on:click={restoretLocation}>
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
    <div class="map-wrap">
      Здесь карта
    </div>
    <button type="button" on:click={saveLocation}>
      Сохранить координаты
    </button>
  </div> <!-- END .placeSelector -->
</div>
