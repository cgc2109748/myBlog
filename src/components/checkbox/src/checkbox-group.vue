<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
  import Emitter from 'src/utils/emitter'
  export default {
    name: 'CheckboxGroup',
    componentName: 'CheckboxGroup',
    mixins: [Emitter],
    props: {
      value: {},
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },
    watch: {
      value(value) {
        this.dispatch('FormItem', 'el.form.change', [value])
      }
    }
  };
</script>
