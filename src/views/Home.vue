<template>
  <div class="page">
    <h2 class="page-title">unofficial xTools</h2>

    <div class="section">open source tools for MultiversX developers</div>

    <br />

    <div class="section">
      <p>Do you have a cool idea for this project?</p>
      <p class="small-space">
        Don't hesitate to create a PR on the public
        <a href="https://github.com/johnykes/multiversx.tools"
          >github repository</a
        >
        .
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>

<style>
.section {
  margin-top: 100px;
}

.small-space {
  margin-top: 25px;
}
</style>
