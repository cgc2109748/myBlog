import vSubmenu from '../menu/src/submenu';

/* istanbul ignore next */
vSubmenu.install = function(Vue) {
  Vue.component(vSubmenu.name, vSubmenu);
};

export default vSubmenu;
