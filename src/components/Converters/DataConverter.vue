<template>
  <div class="page">
    <div>
      <textarea class="converters-textarea" v-model="inputValue" />
      <div id="converters-select">
        convert from
        <select
          name="converters-select-input"
          id="converters-select-input"
          v-model="selectedInputType"
        >
          <option v-for="type in types" v-bind:value="type">
            {{ type.name }}
          </option>
        </select>
        <font-awesome-icon
          :icon="['fas', 'repeat']"
          class="button_hover convert-buttons"
          @click="invertDataTypes()"
          title="invert options"
        />
        <select
          name="converters-select-input"
          id="converters-select-input"
          v-model="selectedOutputType"
        >
          <option v-for="type in types" v-bind:value="type">
            {{ type.name }}
          </option>
        </select>
        <font-awesome-icon
          v-if="false"
          :icon="['fas', 'play']"
          class="button_hover convert-buttons"
          @click="convert()"
          title="convert"
        />
      </div>
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
</template>

<script>
import BigNumber from "bignumber.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faRepeat, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faCopy, faRepeat, faPlay);

const typesDict = {
  all: 0,
  ascii: 1,
  decimal: 2,
  hex: 16,
  nonce: 17,
  base64: 64,
  bech32: 32,
};

export default {
  components: {},
  data() {
    return {
      inputValue: "AQ==",
      selectedInputType: {
        name: "ALL",
        id: typesDict.all,
      },
      selectedOutputType: {
        name: "ALL",
        id: typesDict.all,
      },
      types: [
        {
          name: "ALL",
          id: typesDict.all,
        },
        {
          name: "ascii",
          id: typesDict.ascii,
        },
        {
          name: "decimal",
          id: typesDict.decimal,
        },
        {
          name: "hex",
          id: typesDict.hex,
        },
        {
          name: "nonce",
          id: typesDict.nonce,
        },
        {
          name: "base64",
          id: typesDict.base64,
        },
        {
          name: "bech32",
          id: typesDict.bech32,
        },
      ],
      // data converters outputs
      outputs: [],
    };
  },
  watch: {
    inputValue() {
      this.convert();
    },
    selectedInputType() {
      this.convert();
    },
    selectedOutputType() {
      this.convert();
    },
  },
  mounted() {
    this.convert();
  },
  methods: {
    copy(value) {
      navigator.clipboard.writeText(value);
    },
    invertDataTypes() {
      const aux = this.selectedInputType;
      this.selectedInputType = this.selectedOutputType;
      this.selectedOutputType = aux;
    },
    convert() {
      this.outputs = [];

      if (this.selectedInputType.id === typesDict.all) {
        for (let i = 0; i < this.types.length; i++) {
          const inputTypeId = this.types[i].id;

          if (this.selectedOutputType.id === typesDict.all) {
            for (let j = 0; j < this.types.length; j++) {
              const outputTypeId = this.types[j].id;
              this.convertSpecific(inputTypeId, outputTypeId);
            }
          } else {
            this.convertSpecific(inputTypeId, this.selectedOutputType.id);
          }
        }
      } else if (this.selectedOutputType.id === typesDict.all) {
        for (let i = 0; i < this.types.length; i++) {
          const outputTypeId = this.types[i].id;
          this.convertSpecific(this.selectedInputType.id, outputTypeId);
        }
      } else if (this.convertAmounts) {
        this.convertAmountOrDenom();
      } else {
        this.convertSpecific(
          this.selectedInputType.id,
          this.selectedOutputType.id
        );
      }
    },
    convertSpecific(input, output) {
      if (
        input === typesDict.all ||
        output === typesDict.all ||
        input === output
      ) {
        return;
      }

      try {
        switch (input) {
          case typesDict.hex: {
            this.convertHexTo(output);
            break;
          }
          case typesDict.base64: {
            this.convertBase64To(output);
            break;
          }
          case typesDict.ascii: {
            this.convertAsciiTo(output);
            break;
          }
          case typesDict.decimal: {
            this.convertDecimalTo(output);
            break;
          }
          case typesDict.nonce: {
            this.convertNonceTo(output);
            break;
          }
          case typesDict.bech32: {
            this.convertBech32To(output);
            break;
          }
        }
      } catch (error) {
        //console.log(error);
      }
    },
    convertHexTo(output) {
      const inputType = "HEX";
      switch (output) {
        case typesDict.bech32: {
          let account = Address.fromHex(this.inputValue).bech32();
          this.pushOutput(account, inputType, "BECH32");
          break;
        }
        case typesDict.decimal: {
          const value = new BigNumber(this.inputValue, 16).toString();
          this.pushOutput(value, inputType, "DECIMAL");
          break;
        }
        case typesDict.ascii: {
          const value = Buffer.from(this.inputValue, "hex").toString("utf8");

          this.pushOutput(value, inputType, "ASCII");
          break;
        }
        case typesDict.base64: {
          let buff = Buffer.from(this.inputValue, "hex").toString("base64");
          this.pushOutput(buff, inputType, "BASE64");
          break;
        }
      }
    },
    convertBase64To(output) {
      const inputType = "BASE64";
      switch (output) {
        case typesDict.decimal: {
          let value = Buffer.from(this.inputValue, "base64").toString("hex");
          value = new BigNumber(value, 16).toString();
          this.pushOutput(value, inputType, "DECIMAL");
          break;
        }
        case typesDict.ascii: {
          const value = Buffer.from(this.inputValue, "base64").toString(
            "ascii"
          );
          this.pushOutput(value, inputType, "ASCII");
          break;
        }
        case typesDict.hex: {
          let buff = Buffer.from(this.inputValue, "base64").toString("hex");
          this.pushOutput(buff, inputType, "HEX");
          break;
        }
        case typesDict.nonce: {
          let buff = Buffer.from(this.inputValue, "base64").toString("hex");
          this.pushOutput(buff, inputType, "NONCE");
          break;
        }
      }
    },
    convertAsciiTo(output) {
      const inputType = "ASCII";
      switch (output) {
        case typesDict.hex: {
          const value = Buffer.from(this.inputValue, "ascii").toString("hex");
          this.pushOutput(value, inputType, "HEX");
          break;
        }
        case typesDict.base64: {
          let value = Buffer.from(this.inputValue, "ascii").toString("base64");
          this.pushOutput(value, inputType, "BASE64");
          break;
        }
      }
    },
    convertDecimalTo(output) {
      const inputType = "DECIMAL";
      switch (output) {
        case typesDict.hex: {
          const value = new BigNumber(this.inputValue, 10).toString(16);
          this.pushOutput(value, inputType, "HEX");
          break;
        }
        case typesDict.nonce: {
          let value = new BigNumber(this.inputValue, 10).toString(16);
          if (value.length % 2 != 0) {
            value = "0" + value;
          }
          this.pushOutput(value, inputType, "NONCE");
          break;
        }
        case typesDict.base64: {
          let value = Buffer.from(this.inputValue, "ascii").toString("base64");
          this.pushOutput(value, inputType, "BASE64");
          break;
        }
      }
    },
    convertNonceTo(output) {
      const inputType = "NONCE";
      switch (output) {
        case typesDict.decimal: {
          const value = new BigNumber(this.inputValue, 16).toString();
          this.pushOutput(value, inputType, "DECIMAL");
          break;
        }
        case typesDict.hex: {
          const value = new BigNumber(this.inputValue, 16).toString(16);
          this.pushOutput(value, inputType, "HEX");
          break;
        }
      }
    },
    convertBech32To(output) {
      const inputType = "BECH32";
      switch (output) {
        case typesDict.hex: {
          if (this.inputValue.length !== 62) {
            return;
          }
          const value = Address.fromBech32(this.inputValue).hex();
          this.pushOutput(value, inputType, "HEX");
          break;
        }
      }
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
