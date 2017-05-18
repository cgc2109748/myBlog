import vMenuItem from '../menu/src/menu-item';

/* istanbul ignore next */
vMenuItem.install = function(Vue) {
  Vue.component(vMenuItem.name, vMenuItem);
};

export default vMenuItem;
