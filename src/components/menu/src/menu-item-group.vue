<template>
  <li class="v-menu-item-group">
    <div class="v-menu-item-group__title" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'MenuItemGroup',
    componentName: 'MenuItemGroup',
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      levelPadding() {
        let padding = 10;
        let parent = this.$parent;
        while (parent && parent.$options.componentName !== 'Menu') {
          if (parent.$options.componentName === 'Submenu') {
            padding += 20;
          }
          parent = parent.$parent;
        }
        padding === 10 && (padding = 20);
        return padding;
      }
    }
  };
</script>
