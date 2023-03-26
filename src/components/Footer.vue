<template>
  <div id="footer">
    <div id="footer_text">
      <!-- <p>by artist, for artists</p> -->
      <p>
        all rights reserved to
        <a href="https://www.multiversx.com">MultiversX</a>
      </p>
      <div id="footer_links">
        <a
          id="footer_social"
          href="https://twitter.com/multiversxTools"
          class="button_hover"
          ><font-awesome-icon alt="Twitter" :icon="['fab', 'twitter']"
        /></a>
        <a id="footer_social" href="https://github.com/johnykes/multiversx.tools" class="button_hover"
          ><font-awesome-icon alt="Github" :icon="['fab', 'github']"
        /></a>
      </div>

      <p>made with love by community</p>
    </div>
  </div>
</template>

<script scoped>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faDiscord,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter, faDiscord, faYoutube, faGithub);

export default {
  setup() {},
};
</script>

<style lang="scss">
#footer {
  min-height: 66px;
  background: var(--theme-color-1);

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  box-shadow: 0 16px 24px rgb(0 0 0 / 4%);

  position: relative;
  bottom: 0;
}

@media (max-width: 500px) {
  #footer {
    flex-direction: column;
  }
}

#footer_text {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 50px;

  & p,
  & p a {
    font-size: 12px;
  }
}

#footer_social {
  width: 50px;
}

#footer_legal {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 50px;

  & .space {
    width: 10px;
  }
}

#footer_links {
  width: 100px;
  margin: 0 5px;
  font-size: 12px;
  word-wrap: break-word;

  & a {
    margin: 0 5px;
  }
}
</style>
