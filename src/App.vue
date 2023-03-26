<template>
  <div id="app" :class="this.theme">
    <Navbar />
    <router-view id="router-view-wrapper" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
  beforeCreate() {
    // init everything
    this.$store.dispatch("init");
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.$store.dispatch("updateScreenSize", {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    },
  },
};
</script>

<style lang="scss">
// #router-view-wrapper {
//   padding: min(2%, 20px);
//   padding-bottom: 85px;
//   min-height: 90vh;
// }
</style>
