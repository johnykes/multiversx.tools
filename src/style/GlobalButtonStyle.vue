<style lang="scss">
button {
  border-radius: 4px;
  background: var(--theme-color-2);
  color: var(--theme-color-1);
  padding: 5px;
  -webkit-transition: 0.44s ease;
  transition: 0.44s ease;
  font-weight: 600;
}

button:hover {
  --opacity: 0.8;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  transform: scale(1.01);
  box-shadow: 100px 0px 100px var(--theme-color-2);
  -webkit-box-shadow: px 2px 3px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.3);
  -webkit-transition: 0.44s ease;
  transition: 0.44s ease;
}

.button_hover {
  transition: transform 0.44s;
  &:hover {
    --transform: scale(1.02);
    color: var(--theme-color-3) !important;
  }
}

.button_hover_1 {
  -webkit-transition: 0.44s ease;
  transition: 0.44s ease;

  &:hover {
    --transform: scale(1.02);
    -webkit-transition: 0.44s ease;
    transition: 0.44s ease;
    background: var(--theme-color-3) !important;
  }
}
</style>
