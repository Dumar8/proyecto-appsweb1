<template>
  <div class="content">
    <h2>Seguimiento de Personas con Capacidades Especiales en la ULEAM</h2>
    <div class="menu" v-if="isLoggedIn">
      <button @click="goToPage('/profile.html')">PERFIL DE USUARIO</button>
      <button @click="goToPage('/calendar.html')" class="calendar-button">
        CALENDARIO DE EVENTOS
        <span v-if="eventNotificationCount > 0" class="notification-count">{{ eventNotificationCount }}</span>
      </button>
      <button @click="goToPage('/support.html')" class="support-button">
        CENTRO DE RECURSOS Y SOPORTE
        <span v-if="replyNotificationCount > 0" class="notification-count">{{ replyNotificationCount }}</span>
      </button>
    </div>
    <div class="info-boxes">
      <div class="info-box">
        <h3>APOYO ACADÉMICO</h3>
        <p>Proporcionamos recursos y asistencia personalizados para estudiantes con capacidades especiales, asegurando que reciban el apoyo necesario para su éxito académico.</p>
      </div>
      <div class="info-box">
        <h3>ACCESIBILIDAD</h3>
        <p>Nos comprometemos a crear un entorno accesible para todos los estudiantes, con instalaciones y servicios que cumplen con los estándares de accesibilidad.</p>
      </div>
      <div class="info-box">
        <h3>BIENESTAR INTEGRAL</h3>
        <p>Ofrecemos programas de bienestar integral que incluyen apoyo psicológico, talleres y actividades para fomentar la inclusión y el desarrollo personal.</p>
      </div>
      <div class="info-box">
        <h3>COMUNIDAD INCLUSIVA</h3>
        <p>Promovemos una comunidad inclusiva donde todos los estudiantes son valorados y respetados, y donde se fomenta la participación activa y equitativa.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexMainComponent',
  data() {
    return {
      isLoggedIn: false,
      eventNotificationCount: 0,
      replyNotificationCount: 0
    };
  },
  methods: {
    checkLoginStatus() {
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      if (studentData) {
        this.isLoggedIn = true;
        this.eventNotificationCount = this.getUpcomingEventCount(studentData.events || []);
        this.replyNotificationCount = this.getReplyCount();
      }
    },
    logout() {
      localStorage.removeItem('loggedInStudent');
      this.isLoggedIn = false;
      window.location.href = '/';
    },
    goToPage(page) {
      window.location.href = page;
    },
    getUpcomingEventCount(events) {
      const upcomingEvents = events.filter(event => new Date(event.start) >= new Date());
      return upcomingEvents.length;
    },
    getReplyCount() {
      const posts = JSON.parse(localStorage.getItem('supportPosts')) || [];
      let count = 0;
      posts.forEach(post => {
        post.replies.forEach(reply => {
          if (reply.author !== this.getLoggedInStudentName()) {
            count++;
          }
        });
      });
      return count;
    },
    getLoggedInStudentName() {
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      return studentData ? studentData.nombre : 'Anonimo';
    }
  },
  mounted() {
    this.checkLoginStatus();
  }
};
</script>

<style scoped>
@import '../css/inicio.css';

.calendar-button,
.support-button {
  position: relative;
}

.notification-count {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
}
</style>
