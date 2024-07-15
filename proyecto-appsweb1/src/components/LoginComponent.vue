<template>
  <div class="login-page">
    <div class="login-container">
      <img :src="uleamLogo" alt="ULEAM" class="logo logo-login" @click="goToPage('/')">
      <h2>Iniciar Sesión</h2>
      <form id="loginForm" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="cedula">Número de Cédula:</label>
          <input type="text" id="cedula" name="cedula" pattern="\d{10}" required v-model="cedula" @input="markFormAsModified">
        </div>
        <div class="button-container">
          <button class="register-button" @click="goToPage('/register.html')" type="button">Registrarse</button>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
      <p id="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      uleamLogo: require('@/assets/uleam.png'),
      formModified: false,
      mensaje: '',
      cedula: '' // Recuperar la cédula guardada
    };
  },
  methods: {
    goToPage(page) {
      window.location.href = page;
    },
    handleSubmit() {
      // Obtener la lista de estudiantes almacenada en localStorage
      const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
      
      // Verificar si la cédula ingresada existe en la lista de estudiantes
      const estudiante = estudiantes.find(est => est.cedula === this.cedula);
      if (!estudiante) {
        this.mensaje = 'Número de cédula no existe. Inténtelo de nuevo.';
        return;
      }

      // Guardar los datos del estudiante logueado en localStorage
      localStorage.setItem('loggedInStudent', JSON.stringify(estudiante));

      // Remover el evento beforeunload antes de redirigir
      window.removeEventListener('beforeunload', this.handleBeforeUnload);

      // Simulación de verificación exitosa
      alert('¡Inicio de sesión exitoso!');
      this.formModified = false;
      window.location.href = "index.html";
    },
    isValidCedula(cedula) {
      if (cedula.length !== 10) {
        return false;
      }

      const digitoRegion = parseInt(cedula.substring(0, 2));
      if (digitoRegion < 1 || digitoRegion > 24) {
        return false;
      }

      const coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      const verificador = parseInt(cedula.substring(9, 10));
      let suma = 0;

      for (let i = 0; i < (cedula.length - 1); i++) {
        let digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
        suma += ((digito % 10) + Math.floor(digito / 10));
      }

      suma = Math.round(suma);

      return (Math.round(suma % 10) === 0 && suma % 10 === verificador) || (10 - (suma % 10)) === verificador;
    },
    markFormAsModified() {
      this.formModified = true;
    },
    handleBeforeUnload(event) {
      if (this.formModified) {
        event.preventDefault();
        event.returnValue = '';
      }
    }
  },
  mounted() {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    if (estudiantes.length > 0) {
      this.cedula = estudiantes[0].cedula; // Recuperar la cédula del primer estudiante como ejemplo
    }

    // Mostrar mensaje de confirmación al recargar la página solo si el formulario ha sido modificado
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
};
</script>

<style scoped>
@import '../css/estilos.css';

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/fondo.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>