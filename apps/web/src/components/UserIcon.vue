<script>
export default {
  data() {
    return {
      clicked: false,
    }
  },
  methods: {
    handleClick(event) {
      if (event) {
        event.preventDefault()
        this.clicked = !this.clicked
      }
    },
  },
}
</script>

<template>
  <div class="outer">
    <button
      class="usericon"
      @click="
        (event) => {
          handleClick(event)
        }
      "
    >
      <div class="usericon--letter">ห</div>
    </button>
    <div class="drop-down" v-show="clicked">
      <div>a</div>
    </div>
  </div>
</template>
<style scoped>
.outer {
  position: relative;
}
.usericon {
  all: unset;
  margin-left: 1em;
  border-radius: 8px;
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
  overflow: hidden;
  cursor: pointer;
}

.usericon--letter {
  transform: translateY(-0.06em);
  font-size: 2em;
  font-weight: 500;
}

.drop-down {
  position: absolute;
  background-color: red;
  top: 100;
  right: 0;
  clip-path: path('m 0 10 L 8 2 Q 10 0 10 4 L 10 10 z');
}
.drop-down::before {
  width: 10px;
  height: 10px;
  content: '';
  background-color: red;
  color: blue;
  outline: solid 800px black;
}
</style>
