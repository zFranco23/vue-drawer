<template>
    <div id="swatch">
        <input type="color" :value="color" @input="handleSelect">
    </div>
</template>

<script>
export default {
    props: {
        color: String,
        handleSelect: Function,
    },
    methods: {
        handleUpdateColor(e){
            this.handleSelect(e);
        }
    },
}
</script>

<style scoped>
#swatch{
  background: white;
  box-shadow: 1em 1em 1em rgba(0, 0, 0, .1);
  display: flex;
  width:4rem;
  height: 4rem;
  flex-direction: column;
}

input[type="color"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0;
}

*:focus{
  border-radius: 0;
  outline: none;
}

::-webkit-color-swatch-wrapper {
  padding: 0;
}

::-webkit-color-swatch{
  border: 0;
  border-radius: 0;
}

::-moz-color-swatch,
::-moz-focus-inner{
  border: 0;
}

::-moz-focus-inner{
  padding: 0;
}
</style>