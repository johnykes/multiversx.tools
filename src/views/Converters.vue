<template>
  <div class="page">
    <h2 class="page-title">converters</h2>
    <div id="converters">
      <!-- SECTIONS SELECTOR -->
      <ul id="converters-selections">
        <li
          class="button_hover_1"
          :class="{ activeSection: activeSection === sections.data }"
          @click="goToSection(sections.data)"
        >
          data types
        </li>
        <li
          class="button_hover_1"
          :class="{ activeSection: activeSection === sections.amounts }"
          @click="goToSection(sections.amounts)"
        >
          amounts
        </li>
        <li
          class="button_hover_1"
          :class="{ activeSection: activeSection === sections.epoch }"
          @click="goToSection(sections.epoch)"
        >
          epoch
        </li>
      </ul>
      <!-- CONVERTERS INJECTED BELOW -->
      <data-converter v-if="activeSection === sections.data"></data-converter>
      <amounts-converter
        v-else-if="activeSection === sections.amounts"
      ></amounts-converter>
      <epoch-converter
        v-else-if="activeSection === sections.epoch"
      ></epoch-converter>
    </div>
  </div>
</template>

<script>
import { Address, Balance } from "@elrondnetwork/erdjs";
import BigNumber from "bignumber.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faRepeat, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faCopy, faRepeat, faPlay);

import DataConverter from "../components/Converters/DataConverter.vue";
import AmountsConverter from "../components/Converters/AmountsConverter.vue";
import EpochConverter from "../components/Converters/EpochConverter.vue";

export default {
  components: { DataConverter, AmountsConverter, EpochConverter },
  data() {
    return {
      sections: {
        data: 0,
        amounts: 1,
        epoch: 2,
      },
      converterUrlNames: {
        data: "data",
        amounts: "amounts",
        epoch: "epoch",
      },
      activeSection: 0,
    };
  },
  mounted() {
    switch (this.$route.params.name) {
      case this.converterUrlNames.data: {
        this.activeSection = this.sections.data;
        break;
      }
      case this.converterUrlNames.amounts: {
        this.activeSection = this.sections.amounts;
        break;
      }
      case this.converterUrlNames.epoch: {
        this.activeSection = this.sections.epoch;
        break;
      }
    }
  },
  methods: {
    goToSection(idx) {
      this.activeSection = idx;

      const pathName = this.$route.name;

      switch (idx) {
        case this.sections.data: {
          this.$router.push({
            path: `/${pathName}/${this.converterUrlNames.data}`,
          });
          break;
        }
        case this.sections.amounts: {
          this.$router.push({
            path: `/${pathName}/${this.converterUrlNames.amounts}`,
          });
          break;
        }
        case this.sections.epoch: {
          this.$router.push({
            path: `/${pathName}/${this.converterUrlNames.epoch}`,
          });
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
#converters {
  margin-left: auto;
  margin-right: auto;
  max-width: calc(min(95vw, 1000px));
}

#converters-selections {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  & li {
    display: flex;
    align-content: center;
    align-items: center;
    font-size: 20px;
    background: var(--theme-color-1);

    margin: 0 7.5px;
    padding: 7.5px 10px;
    border-radius: 25px;
  }

  margin-bottom: 30px;
}
.activeSection {
  background: var(--theme-color-3) !important;
}

.converters-textarea {
  width: 100%;
  height: 200px;
  text-align: center;
}

#converters-decimals {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.decimals-input {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 5px 0;
  max-width: 95vw;

  margin-left: auto;
  margin-right: auto;

  & input {
    max-width: 100%;
    text-align: center;
    max-width: 100px;
  }
}

#converters-select {
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  word-wrap: break-word;
  margin-top: 5px;
  flex-wrap: wrap;

  & select {
    margin: 0 10px;
    height: 40px;
  }

  & svg {
    height: 30px;
    width: 30px;
    border-radius: 50px;
    --background-color: var(--theme-color-3);
    --border: 1px solid var(--theme-color-3);
    padding: 10px;
  }
}

.converters-outputs {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.output {
  margin-top: 10px;
  background: var(--theme-color-1);
  border-radius: 4px;

  margin-left: auto;
  margin-right: auto;

  padding: 10px;

  min-width: 200px;

  flex: 1 1 auto;

  border: 1px solid var(--theme-color-2);

  & .output-title {
    font-size: 20px;
  }

  & .output-value {
    font-size: 20px;
    height: auto;
    word-wrap: break-word;
    color: var(--theme-color-3);
  }

  position: relative;

  & .output-copy {
    --position: absolute;
    right: 10px;
    bottom: 10px;
    margin-left: 10px;
  }
}
</style>
