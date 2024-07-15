<template>
  <div class="header">
    <img :src="uleamLogo" alt="ULEAM" class="logo" @click="goToPage('/')">
    <div class="center-container" v-if="isLoggedIn">
      <div class="welcome-message">
        Bienvenido, {{ studentName }}.
      </div>
    </div>
    <div class="auth-buttons" v-if="!isLoggedIn">
      <a href="/register.html" class="register-link">Registrarse</a>
      <button @click="goToPage('/login.html')">Iniciar Sesión</button>
    </div>
    <div class="logout-container" v-if="isLoggedIn">
      <button class="logout-button" @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexHeaderComponent',
  data() {
    return {
      uleamLogo: require('@/assets/uleam.png'),
      isLoggedIn: false,
      studentName: ''
    };
  },
  methods: {
    goToPage(page) {
      window.location.href = page;
    },
    checkLoginStatus() {
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      if (studentData) {
        this.isLoggedIn = true;
        this.studentName = studentData.nombre;
      }
    },
    logout() {
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      if (studentData) {
        let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
        const index = estudiantes.findIndex(est => est.cedula === studentData.cedula);
        if (index > -1) {
          estudiantes[index] = studentData;
        } else {
          estudiantes.push(studentData);
        }
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
      }
      localStorage.removeItem('loggedInStudent');
      this.isLoggedIn = false;
      window.location.href = '/';
    }
  },
  mounted() {
    this.checkLoginStatus();
  }
};
</script>

<style scoped>
@import '../css/inicio.css';
</style>