<script>
  import moment from "moment";

  export let section = null;

  const FORMAT = "H:mm:ss"

  $:start = moment(section && section.start).format(FORMAT);
  $:end = moment(section && section.end).format(FORMAT)

</script>
<style>
.section-info {
  text-align: center;
}
.section-name {
  margin-bottom: 0.2em;
}
.section-time {
  margin-top: 0;
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
