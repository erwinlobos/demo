console.log('Iniciando app');

setTimeout(() => {
  console.log('Primer callback');
}, 2000);

setTimeout(() => {
  console.log('Segundo callback');
}, 0);

console.log('Fin');
