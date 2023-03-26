<template>
  <div class="page">
    <div>
      <div id="converters-decimals">
        <div>
          <textarea
            class="converters-textarea"
            type="text"
            v-model="amountsInput"
            placeholder="full amount (with all the 0s)"
          />
        </div>
        <div class="decimals-input">
          decimals
          <input
            type="text"
            title="decimals"
            v-model="amountsDecimals"
            placeholder="token decimals (e.g. EGLD have 18 decimals)"
          />
        </div>
        <font-awesome-icon
          :icon="['fas', 'repeat']"
          class="button_hover convert-amounts"
          style="margin: 20px 0"
          @click="invertAmountsDirection()"
          title="invert options"
        />
      </div>
      <!-- OUTPUTS <3 -->
      <div class="converters-outputs">
        <div v-for="output in outputs" class="output">
          <div class="output-title">
            {{ output.title }}
            <font-awesome-icon
              :icon="['fas', 'copy']"
              class="button_hover output-copy"
              @click="copy(output.value)"
              title="copy to clipboard"
            />
          </div>

          <div class="output-value">
            {{ output.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faRepeat } from "@fortawesome/free-solid-svg-icons";
library.add(faCopy, faRepeat);

export default {
  components: {},
  data() {
    return {
      // amount <-> denom
      amountsInput: 1000000000000000000,
      amountsDecimals: 18,
      amountsOutput: 1,
      amountToDenom: true,
      // data converters outputs
      outputs: [],
    };
  },
  watch: {
    amountsInput() {
      this.convertAmountOrDenom();
    },
    amountsDecimals() {
      this.convertAmountOrDenom();
    },
  },
  mounted() {
    this.convertAmountOrDenom();
  },
  methods: {
    copy(value) {
      navigator.clipboard.writeText(value);
    },
    invertAmountsDirection() {
      this.amountToDenom = this.amountToDenom === true ? false : true;
      const aux = this.amountsInput;
      this.amountsInput = this.amountsOutput;
      this.amountsOutput = aux;
    },
    convertAmountOrDenom() {
      this.outputs = [];

      let value;
      if (this.amountToDenom) {
        value = new BigNumber(this.amountsInput).multipliedBy(
          `1e-${this.amountsDecimals}`
        );
      } else {
        value = new BigNumber(this.amountsInput)
          .multipliedBy(Math.pow(10, this.amountsDecimals))
          .toFixed();
      }

      this.pushOutput(
        value,
        this.amountToDenom ? "FULL AMOUNT" : "DENOMINATED",
        this.amountToDenom ? "DENOMINATED" : "FULL AMOUNT"
      );

      this.amountsOutput = value;
    },
    pushOutput(value, inputType, outputType) {
      if (
        value.length === 0 ||
        value === " " ||
        value === "\r\n" ||
        value.toString().includes("NaN")
      ) {
        return;
      }
      this.outputs.push({
        title: `${inputType} -> ${outputType}`,
        value: value,
      });
    },
  },
};
</script>
