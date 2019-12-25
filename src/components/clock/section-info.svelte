<script>
  import moment from "moment";

  export let section = null;

  const FORMAT = "H:mm:ss"

  $:start = moment(section && section.start).format(FORMAT);
  $:end = moment(section && section.end).format(FORMAT)

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
        {moment(section.time).format(FORMAT)}
      {:else}
        <time datetime={start}>{start}</time> &mdash;
        <time datetime={end}>{end}</time>
      {/if}
    </p>
  {/if}
</div>
