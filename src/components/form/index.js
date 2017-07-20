import vForm from './src/form';

/* istanbul ignore next */
vForm.install = function(Vue) {
  Vue.component(vForm.name, vForm);
};

export default vForm;
