<script>
  import { format, isValid } from "date-fns";

  export let section = null;

  const FORMAT = "H:mm:ss"
  const NA = "--/--";

  $:start = isValid(section && section.start) ? format(section && section.start, FORMAT) : NA;
  $:end = isValid(section && section.end) ? format(section && section.end, FORMAT) : NA;

</script>
<style>
.section-info {
  padding: 1px 0;
  line-height: 1.2;
  text-align: center;
  height: 2.5em;
  margin: 1em 0;
  font-size: 2.5vmin;
}
.section-name {
  margin: 0 0 0.2em;
}
.section-time {
  margin: 0;
  font-size: 0.85em;
}
</style>
<div class="section-info">
  {#if section}
    <p class="section-name">
      {section.name}
    </p>
    <p class="section-time">
      {#if section.time}
        { format(section.time, FORMAT) }
      {:else}
        <time datetime={start}>{start}</time> &mdash;
        <time datetime={end}>{end}</time>
      {/if}
    </p>
  {/if}
</div>
