# CoingeckoTechTask

La app accede a la api de coingecko https://docs.coingecko.com/v3.0.1/reference/introduction
La app consta de dos pantallas principales: Dashboard y Search:
 - Dashboard: Carga una lista con las monedas principales con su info principal.
 - Search: Muestra un buscador donde hay que escribir un prompt que hará una llamada a la api haciendo búsqueda con las monedas que coincidan con lo introducido.
En ambas paginas, se puede clicar en cada moneda y ver otra pantalla con datos ampliados.

También, tenemos en la barra principal de navegación: dos tabs para elegir la navegación y un switch para decidir el tema de la app('claro' u 'oscuro').

La app usa archivos de traducción para español e inglés, dependiendo del lenguaje del navegador (siendo español por defecto).
Dentro del servicio, podemos ver las distintas funciones que usa la app. En ellaas, se devuelve un observable para que el componente que lo requiera lo use.

Cosas a tener en cuenta:
 - Coingecko ofrece una número limitado de llamadas gratuitas sin api key. También, a través de la api key, se puede hacer hasta 10000 llamadas mensuales.
 - Si la app necesitara que cada vez que se cargue un componente se mantengan los datos, se podrían haber usado subjects como observables para asignarlos en el servicio y luego observarlos. Pero en este caso, no es necesario.
 - Si una llamada de api falla, se muestra un alert. En un caso real, se debería crear un servicio que active un modal o componente personalizado para gestionar errores.
 - La app esta componetizada para que cualquier componente se pueda usar o quitar, según convenga.
 - La app también tiene compatibilidad mobile para que se vea bien.

