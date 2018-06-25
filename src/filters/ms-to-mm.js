const msToMm = {}

// Convierte milisegundos en segundos.
function convertMsToMm (ms) {
  const min = Math.floor(ms / 60000)
  const sec = ((ms % 60000 / 1000).toFixed(0))

  return `${min}:${(sec < 10) ? '0' + sec : sec}`
}
// Se instala al objecto msToMm un filtro de Vue.
msToMm.install = function (Vue) {
  Vue.filter('ms-to-mm', (val) => {
    return convertMsToMm(val)
  })
}

export default msToMm
