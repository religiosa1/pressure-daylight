<script>
import {pressureEntries} from "./pressure.store.js";
</script>

{#await $pressureEntries}
 <p>...загрузка</p>
{:then entries}
<ul>
  {#each entries.data as item}
  <li>
    {item.pressure}
  </li>
  {/each}
</ul>
{:catch error}
  <p class="error">{error.message}</p>
{/await}
