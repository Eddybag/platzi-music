const blur = {}

function setBlur (el, binding) {
  if (!binding.value) {
    // agregando estilos a los valores que sean vacios undefined o null,.
    el.style.filter = 'blur(3px)'
    el.style.cursor = 'not-allowed'
    el.querySelectorAll('button').forEach(button => {
    // agregando propiedad disabled.
      button.setAttribute('disabled', true)
    })
  }
}
// metodo para agregar la directiva.
blur.install = function (Vue) {
  Vue.directive('blur', {
    bind (el, binding) {
      setBlur(el, binding)
    }
  })
}

export default blur
