<!-- eslint-disable prettier/prettier -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: none;
  -webkit-tap-highlight-color: transparent;
  background: transparent;
  font-size: 24px;
  -webkit-transition: background 0.44s ease;
  transition: background 0.44s ease;
}

#app {
  width: 100vw;
  min-height: 100vh;
  background: transparent;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-weight: 500;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --theme-color-0: #0d1117;
  --theme-color-0: #000;

  --theme-color-1: #222831;
  --theme-color-1: #161b22;

  --theme-color-2: #f3f3f5;
  --theme-color-3: #23f7dd;
  --theme-color-4: #4f7329;
  --theme-color-5: lightgray;

  /* f0b243 ba6d0a */

  background: var(--theme-color-0);
  color: var(--theme-color-2);
}

#app.light {
  --theme-color-0: #f5f4f8;
  --theme-color-1: #fff;
  --theme-color-2: #333;
  --theme-color-3: #23f7dd;
  --theme-color-4: #4f7329;
  --theme-color-5: lightgray;

  background: var(--theme-color-0);
  color: var(--theme-color-2);
}

body {
  --overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 0;
}

h1 {
  font-weight: 600;
  font-size: xxx-large;
  padding: auto;
}

h2 {
  font-size: xx-large;
  font-weight: 600;
}

img,
svg {
  user-select: none;
}

a {
  text-decoration: none;
  color: var(--theme-color-2);
}

::-webkit-scrollbar {
  width: 7.5px;
  height: 0;
  --scrollbar-color: red yellow;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 10%;
  margin-top: 1px;
  margin-bottom: 1px;
  padding: 0;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
}

input {
  color: var(--theme-color-2);
  padding: 5px;
  border-radius: 4px;

  filter: invert(1);
  color: black;
  background: var(--theme-color-2);

  font-weight: 600;
  font-size: 20px;

  border: 1px solid var(--theme-color-1);
}
.light * input {
  filter: invert(0);
  color: var(--theme-color-2);
  background: var(--theme-color-1);
}

textarea {
  color: var(--theme-color-2);
  padding: 5px;
  border-radius: 4px;

  filter: invert(1);
  color: black;
  background: var(--theme-color-2);

  font-weight: 600;
  font-size: 20px;

  resize: none;
}
.light * textarea {
  filter: invert(0);
  color: var(--theme-color-2);
  background: var(--theme-color-1);
}

select {
  font-weight: 600;
  font-size: 20px;
  filter: invert(1);
  color: black;
  background: var(--theme-color-2);
  padding: 5px;
  border-radius: 4px;
}
.light * select {
  filter: invert(0);
  color: var(--theme-color-2);
  background: var(--theme-color-1);
}

option {
  background: var(--theme-color-1);
  color: var(--theme-color-2);
}

.page {
  padding: min(2%, 20px);
  padding-bottom: 85px;
  min-height: 90vh;
}

.page-title {
  margin-top: 10;
  margin-bottom: 25px;
}

input[type="checkbox"] {
  accent-color: var(--theme-color-3);
  filter: invert(0);
}
</style>
