<template>
  <div id="navbar">
    <div class="left" v-show="!isSearchActive">
      <Logo />
      <div id="app_name"></div>
    </div>

    <div class="right">
      <div id="dropdown" v-show="!isSearchActive">
        <font-awesome-icon
          :icon="['fas', 'caret-down']"
          id="dropdown_button"
          class="button_hover"
        />
        <div id="dropdown_content">
          <a @click="$router.push({ path: '/converters' })">converters</a>
          <a @click="$router.push({ path: '/' })">...</a>
        </div>
      </div>

      <div id="theme" @click="toggleTheme()">
        <font-awesome-icon
          v-show="this.theme == ''"
          :icon="['fas', 'moon']"
          id="theme_moon"
          class="button_hover"
        />
        <font-awesome-icon
          v-show="this.theme == 'light'"
          :icon="['fas', 'sun']"
          id="theme_sun"
          class="button_hover"
        />
      </div>
    </div>
  </div>
  <div id="navbar-space"></div>
</template>

<script>
import Logo from "../components/Logo.vue";

import { mapState } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCopyright,
  faSun,
  faMoon,
  faCaretDown,
  faMagnifyingGlass,
  faXmark,
  faBolt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCopyright,
  faSun,
  faMoon,
  faCaretDown,
  faMagnifyingGlass,
  faXmark,
  faBolt,
  faWallet
);

import "@/style/GlobalStyle.vue";
import "@/style/GlobalButtonStyle.vue";

export default {
  components: { Logo },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      innerWidth: (state) => state.innerWidth,
    }),
  },
  data() {
    return {
      isSearchActive: false,
      lottie_white_data: {
        v: "4.8.0",
        meta: {
          g: "LottieFiles AE 3.1.1",
          a: "",
          k: "",
          d: "",
          tc: "",
        },
        fr: 23.9759979248047,
        ip: 0,
        op: 23.9999979227274,
        w: 432,
        h: 136,
        nm: "ToolsX Logo Animation - Light  Theme",
        ddd: 0,
        assets: [
          {
            id: "image_0",
            w: 88,
            h: 88,
            u: "",
            p: "data:image/png;base64,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",
            e: 1,
          },
          {
            id: "image_1",
            w: 90,
            h: 90,
            u: "",
            p: "data:image/png;base64,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",
            e: 1,
          },
          {
            id: "image_2",
            w: 417,
            h: 109,
            u: "",
            p: "data:image/png;base64,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",
            e: 1,
          },
        ],
        layers: [
          {
            ddd: 0,
            ind: 1,
            ty: 2,
            nm: "Cog 1",
            refId: "image_0",
            sr: 1,
            ks: {
              o: {
                a: 0,
                k: 100,
                ix: 11,
              },
              r: {
                a: 1,
                k: [
                  {
                    i: {
                      x: [0.833],
                      y: [0.833],
                    },
                    o: {
                      x: [0.167],
                      y: [0.167],
                    },
                    t: 0,
                    s: [0],
                  },
                  {
                    t: 23.9999979227274,
                    s: [-45],
                  },
                ],
                ix: 10,
              },
              p: {
                a: 0,
                k: [281.742, 86.157, 0],
                ix: 2,
              },
              a: {
                a: 0,
                k: [43.851, 43.852, 0],
                ix: 1,
              },
              s: {
                a: 0,
                k: [100, 100, 100],
                ix: 6,
              },
            },
            ao: 0,
            ef: [
              {
                ty: 21,
                nm: "Fill",
                np: 9,
                mn: "ADBE Fill",
                ix: 1,
                en: 1,
                ef: [
                  {
                    ty: 10,
                    nm: "Fill Mask",
                    mn: "ADBE Fill-0001",
                    ix: 1,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 1,
                    },
                  },
                  {
                    ty: 7,
                    nm: "All Masks",
                    mn: "ADBE Fill-0007",
                    ix: 2,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 2,
                    },
                  },
                  {
                    ty: 2,
                    nm: "Color",
                    mn: "ADBE Fill-0002",
                    ix: 3,
                    v: {
                      a: 0,
                      k: [1, 1, 1, 1],
                      ix: 3,
                    },
                  },
                  {
                    ty: 7,
                    nm: "Invert",
                    mn: "ADBE Fill-0006",
                    ix: 4,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 4,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Horizontal Feather",
                    mn: "ADBE Fill-0003",
                    ix: 5,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 5,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Vertical Feather",
                    mn: "ADBE Fill-0004",
                    ix: 6,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 6,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Opacity",
                    mn: "ADBE Fill-0005",
                    ix: 7,
                    v: {
                      a: 0,
                      k: 1,
                      ix: 7,
                    },
                  },
                ],
              },
            ],
            ip: 0,
            op: 23.9999979227274,
            st: 0,
            bm: 0,
          },
          {
            ddd: 0,
            ind: 2,
            ty: 2,
            nm: "Cog 2",
            refId: "image_1",
            sr: 1,
            ks: {
              o: {
                a: 0,
                k: 100,
                ix: 11,
              },
              r: {
                a: 1,
                k: [
                  {
                    i: {
                      x: [0.833],
                      y: [0.833],
                    },
                    o: {
                      x: [0.167],
                      y: [0.167],
                    },
                    t: 0,
                    s: [0],
                  },
                  {
                    t: 23.9999979227274,
                    s: [45],
                  },
                ],
                ix: 10,
              },
              p: {
                a: 0,
                k: [197.743, 86.157, 0],
                ix: 2,
              },
              a: {
                a: 0,
                k: [44.993, 44.993, 0],
                ix: 1,
              },
              s: {
                a: 0,
                k: [100, 100, 100],
                ix: 6,
              },
            },
            ao: 0,
            ef: [
              {
                ty: 21,
                nm: "Fill",
                np: 9,
                mn: "ADBE Fill",
                ix: 1,
                en: 1,
                ef: [
                  {
                    ty: 10,
                    nm: "Fill Mask",
                    mn: "ADBE Fill-0001",
                    ix: 1,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 1,
                    },
                  },
                  {
                    ty: 7,
                    nm: "All Masks",
                    mn: "ADBE Fill-0007",
                    ix: 2,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 2,
                    },
                  },
                  {
                    ty: 2,
                    nm: "Color",
                    mn: "ADBE Fill-0002",
                    ix: 3,
                    v: {
                      a: 0,
                      k: [1, 1, 1, 1],
                      ix: 3,
                    },
                  },
                  {
                    ty: 7,
                    nm: "Invert",
                    mn: "ADBE Fill-0006",
                    ix: 4,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 4,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Horizontal Feather",
                    mn: "ADBE Fill-0003",
                    ix: 5,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 5,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Vertical Feather",
                    mn: "ADBE Fill-0004",
                    ix: 6,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 6,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Opacity",
                    mn: "ADBE Fill-0005",
                    ix: 7,
                    v: {
                      a: 0,
                      k: 1,
                      ix: 7,
                    },
                  },
                ],
              },
            ],
            ip: 0,
            op: 23.9999979227274,
            st: 0,
            bm: 0,
          },
          {
            ddd: 0,
            ind: 3,
            ty: 2,
            nm: "T LS",
            refId: "image_2",
            sr: 1,
            ks: {
              o: {
                a: 0,
                k: 100,
                ix: 11,
              },
              r: {
                a: 0,
                k: 0,
                ix: 10,
              },
              p: {
                a: 0,
                k: [297.729, 65.024, 0],
                ix: 2,
              },
              a: {
                a: 0,
                k: [208.271, 54.039, 0],
                ix: 1,
              },
              s: {
                a: 0,
                k: [100, 100, 100],
                ix: 6,
              },
            },
            ao: 0,
            hasMask: true,
            masksProperties: [
              {
                inv: false,
                mode: "a",
                pt: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [0, 0],
                      [0, 109],
                      [333.042, 109],
                      [333.042, 0],
                    ],
                    c: true,
                  },
                  ix: 1,
                },
                o: {
                  a: 0,
                  k: 100,
                  ix: 3,
                },
                x: {
                  a: 0,
                  k: 0,
                  ix: 4,
                },
                nm: "Mask 1",
              },
            ],
            ef: [
              {
                ty: 21,
                nm: "Fill",
                np: 9,
                mn: "ADBE Fill",
                ix: 1,
                en: 1,
                ef: [
                  {
                    ty: 10,
                    nm: "Fill Mask",
                    mn: "ADBE Fill-0001",
                    ix: 1,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 1,
                    },
                  },
                  {
                    ty: 7,
                    nm: "All Masks",
                    mn: "ADBE Fill-0007",
                    ix: 2,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 2,
                    },
                  },
                  {
                    ty: 2,
                    nm: "Color",
                    mn: "ADBE Fill-0002",
                    ix: 3,
                    v: {
                      a: 0,
                      k: [1, 1, 1, 1],
                      ix: 3,
                    },
                  },
                  {
                    ty: 7,
                    nm: "Invert",
                    mn: "ADBE Fill-0006",
                    ix: 4,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 4,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Horizontal Feather",
                    mn: "ADBE Fill-0003",
                    ix: 5,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 5,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Vertical Feather",
                    mn: "ADBE Fill-0004",
                    ix: 6,
                    v: {
                      a: 0,
                      k: 0,
                      ix: 6,
                    },
                  },
                  {
                    ty: 0,
                    nm: "Opacity",
                    mn: "ADBE Fill-0005",
                    ix: 7,
                    v: {
                      a: 0,
                      k: 1,
                      ix: 7,
                    },
                  },
                ],
              },
            ],
            ip: 0,
            op: 23.9999979227274,
            st: 0,
            bm: 0,
          },
          {
            ddd: 0,
            ind: 4,
            ty: 2,
            nm: "X",
            refId: "image_2",
            sr: 1,
            ks: {
              o: {
                a: 0,
                k: 100,
                ix: 11,
              },
              r: {
                a: 0,
                k: 0,
                ix: 10,
              },
              p: {
                a: 0,
                k: [39.729, 53.485, 0],
                ix: 2,
              },
              a: {
                a: 0,
                k: [375.771, 54.5, 0],
                ix: 1,
              },
              s: {
                a: 0,
                k: [100, 100, 100],
                ix: 6,
              },
            },
            ao: 0,
            hasMask: true,
            masksProperties: [
              {
                inv: false,
                mode: "a",
                pt: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [334.542, 0],
                      [334.542, 109],
                      [417, 109],
                      [417, 0],
                    ],
                    c: true,
                  },
                  ix: 1,
                },
                o: {
                  a: 0,
                  k: 100,
                  ix: 3,
                },
                x: {
                  a: 0,
                  k: 0,
                  ix: 4,
                },
                nm: "Mask 1",
              },
            ],
            ip: 0,
            op: 23.9999979227274,
            st: 0,
            bm: 0,
          },
        ],
        markers: [],
      },
      wtfUrl:
        "https://lottie.host/8002b748-0717-4ed1-b753-218e3bee77ae/6IrzBRv0iM.json",
    };
  },
  methods: {
    toggleTheme() {
      this.$store.commit("TOGGLE_THEME");
    },
    toShortAddress(address) {
      const last3characters = address.substring(address.length - 3);
      return `...${last3characters}`;
    },
  },
};
</script>

<style lang="scss">
#navbar-space {
  height: 66px;
}
#navbar {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 66px;
  background: var(--theme-color-1);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  box-shadow: 0 16px 24px rgb(0 0 0 / 4%);
  font-weight: 600;
}

#logo {
  height: 100%;
  height: 37.5px;
}

#app_name {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  margin-left: 5px;
}

#wallet {
  overflow: hidden;
}

#theme {
  height: 100%;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  --background-color: var(--theme-color-0);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-left: 0px;
}

#theme_sun {
  animation: rotation 44s linear infinite;

  transition: transform 0.44s;
  &:hover {
    transform: scale(1.5);
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.left {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

#menu_search {
  display: flex;
  justify-content: right;
  align-content: center;
  align-items: center;
  max-width: 500px;
  margin-top: 2.5px;
}
#menu_search_input {
  margin-right: 15px;
  width: 500px;
  max-width: calc(100vw - 100px);
  border: 2px solid var(--theme-color-2);
  text-align: center;
}
#menu_search_icon {
  width: 27.5px;
}
#menu_search_x {
  margin-right: 15px;
}

// #menu_dropdown {
//   display: flex;
//   justify-content: right;
//   align-content: center;
//   align-items: center;
// }
// #menu_dropdown_content {
//   position: absolute;
//   border: 1px solid var(--theme-color-2);
// }

#dropdown {
  // position: relative;
  // display: inline-block;
  --margin-left: 15px;
  width: 37.5px;
}
// #dropdown_button {
// }
/* Dropdown Content (Hidden by Default) */
#dropdown_content {
  display: none;
  position: absolute;
  width: 200px;
  margin-left: -100px;
  --background: var(--theme-color-1);
  --box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding-top: 18.5px;
  z-index: 100;
}
/* Links inside the dropdown */
#dropdown_content a {
  background: var(--theme-color-1);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  color: var(--theme-color-2);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  margin-left: 1px solid var(--theme-color-2);
  margin-right: 1px solid var(--theme-color-2);
  margin-bottom: 1px solid var(--theme-color-2);
}
/* Change color of dropdown links on hover */
#dropdown_content a:hover {
  background-color: var(--theme-color-5);
  // transition: transform 0.44s;
  // &:hover {
  //   transform: scale(1.05);
  // }
}
/* Show the dropdown menu on hover */
#dropdown:hover #dropdown_content {
  display: block;
}
/* Change the background color of the dropdown button when the dropdown content is shown */
#dropdown:hover .dropdown_button {
  background-color: #3e8e41;
}

#menu_dropdown_items_wrapper {
  display: flex;
  justify-content: right;
  align-content: center;
  align-items: center;
  flex-direction: column;

  padding: 5px;
  background: var(--theme-color-2) !important;
}
</style>
