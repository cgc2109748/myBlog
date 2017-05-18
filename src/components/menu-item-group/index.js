import vMenuItemGroup from '../menu/src/menu-item-group';

/* istanbul ignore next */
vMenuItemGroup.install = function(Vue) {
  Vue.component(vMenuItemGroup.name, vMenuItemGroup);
};

export default vMenuItemGroup;
