<template>
  <div id="app">
    <IndexHeaderComponent />
    <IndexMainComponent />
    <IndexFooterComponent />
  </div>
</template>

<script>
import IndexHeaderComponent from './components/IndexHeaderComponent.vue';
import IndexMainComponent from './components/IndexMainComponent.vue';
import IndexFooterComponent from './components/IndexFooterComponent.vue';

export default {
  name: 'App',
  components: {
    IndexHeaderComponent,
    IndexMainComponent,
    IndexFooterComponent
  }
};
</script>

<style>
/* Puedes agregar estilos globales aquí si es necesario */
</style>
