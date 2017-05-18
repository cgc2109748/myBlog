import vMenu from './src/menu';

/* istanbul ignore next */
vMenu.install = function(Vue) {
  Vue.component(vMenu.name, vMenu);
};

export default vMenu;
