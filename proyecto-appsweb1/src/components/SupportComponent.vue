<template>
    <div>
      <header>
        <img src="@/assets/uleam.png" alt="ULEAM" class="logo" @click="goToIndex">
        <h1>Centro de Recursos y Soporte</h1>
        <button class="inicio-button" @click="goToIndex">Inicio</button>
      </header>
      <div class="content-container">
        <h2>Recursos Educativos</h2>
        <div class="cards-row">
          <div class="card">
            <h3>Guías y Manuales</h3>
            <p>Encuentra una variedad de guías y manuales que te ayudarán a aprovechar al máximo las herramientas y recursos disponibles.</p>
            <ul>
              <li><a href="#">Guía de accesibilidad en el campus</a></li>
              <li><a href="#">Manual de uso de software de asistencia</a></li>
              <li><a href="#">Instrucciones para el registro en línea</a></li>
            </ul>
          </div>
          <div class="card">
            <h3>Tutoriales en Video</h3>
            <p>Accede a tutoriales en video que te mostrarán paso a paso cómo utilizar diferentes plataformas y recursos.</p>
            <ul>
              <li><a href="#">Cómo usar el lector de pantalla</a></li>
              <li><a href="#">Configuración de ajustes de accesibilidad en dispositivos móviles</a></li>
              <li><a href="#">Tutorial para el uso de la plataforma de e-learning</a></li>
            </ul>
          </div>
        </div>
        <h2>Foro de Comunidad</h2>
        <div class="card forum-card">
          <h3>Foro</h3>
          <p>Interactúa con otros estudiantes, comparte experiencias, haz preguntas y recibe apoyo.</p>
          <div id="foro">
            <form @submit.prevent="addPost">
              <textarea v-model="newPostContent" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
              <button type="submit">Publicar</button>
            </form>
            <div id="posts">
              <div v-for="(post, index) in posts" :key="index" class="post">
                <p><strong>{{ post.author }}:</strong> {{ post.content }}</p>
                <div class="post-buttons">
                  <button @click="showReplyForm(index)">Responder</button>
                  <button v-if="post.author === loggedInStudentName" @click="showEditForm(index)">Editar</button>
                  <button v-if="post.author === loggedInStudentName" @click="deletePost(index)">Eliminar</button>
                </div>
                <div v-show="post.showReplyForm" class="reply-form">
                  <textarea v-model="post.replyContent" rows="2" placeholder="Escribe tu respuesta aquí..."></textarea>
                  <button @click="addReply(index)">Enviar</button>
                </div>
                <div v-show="post.showEditForm" class="edit-form">
                  <textarea v-model="post.editContent" rows="2" placeholder="Edita tu publicación aquí..."></textarea>
                  <button @click="saveEdit(index)">Guardar</button>
                </div>
                <div v-if="post.replies.length > 0" class="replies">
                  <div v-for="(reply, replyIndex) in post.replies" :key="replyIndex" class="reply">
                    <p><strong>{{ reply.author }}:</strong> {{ reply.content }}</p>
                    <div class="post-buttons">
                      <button v-if="reply.author === loggedInStudentName" @click="showEditForm(index, replyIndex)">Editar</button>
                      <button v-if="reply.author === loggedInStudentName" @click="deleteReply(index, replyIndex)">Eliminar</button>
                    </div>
                    <div v-show="reply.showEditForm" class="edit-form">
                      <textarea v-model="reply.editContent" rows="2" placeholder="Edita tu respuesta aquí..."></textarea>
                      <button @click="saveEdit(index, replyIndex)">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards-row">
          <div class="card">
            <h3>Noticias y Actualizaciones</h3>
            <p>Mantente informado sobre las últimas novedades, actualizaciones de software, eventos y talleres próximos.</p>
            <ul>
              <li><a href="#">Actualización del software de accesibilidad</a></li>
              <li><a href="#">Taller de inclusión y diversidad</a></li>
              <li><a href="#">Seminario sobre nuevas tecnologías de asistencia</a></li>
            </ul>
          </div>
          <div class="card">
            <h3>Preguntas Frecuentes (FAQs)</h3>
            <p>Respuestas a preguntas comunes sobre el uso de recursos, herramientas disponibles y cómo acceder a soporte técnico.</p>
            <ul>
              <li><a href="#">¿Cómo puedo solicitar asistencia técnica?</a></li>
              <li><a href="#">¿Qué recursos de accesibilidad están disponibles en el campus?</a></li>
              <li><a href="#">¿Cómo me inscribo en un taller o seminario?</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SupportComponent',
    data() {
      return {
        newPostContent: '',
        posts: this.getStoredPosts(),
        loggedInStudentName: this.getLoggedInStudentName()
      };
    },
    methods: {
      goToIndex() {
        window.location.href = '/';
      },
      addPost() {
        if (this.newPostContent.trim()) {
          this.posts.push({
            author: this.loggedInStudentName,
            content: this.newPostContent,
            replies: [],
            showReplyForm: false,
            showEditForm: false,
            replyContent: '',
            editContent: ''
          });
          this.newPostContent = '';
          this.updateStoredPosts();
        }
      },
      showReplyForm(postIndex) {
        this.posts[postIndex].showReplyForm = !this.posts[postIndex].showReplyForm;
      },
      showEditForm(postIndex, replyIndex = null) {
        if (replyIndex === null) {
          this.posts[postIndex].showEditForm = !this.posts[postIndex].showEditForm;
        } else {
          this.posts[postIndex].replies[replyIndex].showEditForm = !this.posts[postIndex].replies[replyIndex].showEditForm;
        }
      },
      addReply(postIndex) {
        const replyContent = this.posts[postIndex].replyContent.trim();
        if (replyContent) {
          this.posts[postIndex].replies.push({
            author: this.loggedInStudentName,
            content: replyContent,
            showEditForm: false,
            editContent: ''
          });
          this.posts[postIndex].replyContent = '';
          this.posts[postIndex].showReplyForm = false;
          this.updateStoredPosts();
        }
      },
      saveEdit(postIndex, replyIndex = null) {
        if (replyIndex === null) {
          const newContent = this.posts[postIndex].editContent.trim();
          if (newContent) {
            this.posts[postIndex].content = newContent;
            this.posts[postIndex].showEditForm = false;
            this.updateStoredPosts();
          }
        } else {
          const newContent = this.posts[postIndex].replies[replyIndex].editContent.trim();
          if (newContent) {
            this.posts[postIndex].replies[replyIndex].content = newContent;
            this.posts[postIndex].replies[replyIndex].showEditForm = false;
            this.updateStoredPosts();
          }
        }
      },
      deletePost(postIndex) {
        if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
          this.posts.splice(postIndex, 1);
          this.updateStoredPosts();
        }
      },
      deleteReply(postIndex, replyIndex) {
        if (confirm('¿Estás seguro de que deseas eliminar esta respuesta?')) {
          this.posts[postIndex].replies.splice(replyIndex, 1);
          this.updateStoredPosts();
        }
      },
      getLoggedInStudentName() {
        const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
        return studentData ? studentData.nombre : 'Anonimo';
      },
      getStoredPosts() {
        return JSON.parse(localStorage.getItem('supportPosts')) || [];
      },
      updateStoredPosts() {
        localStorage.setItem('supportPosts', JSON.stringify(this.posts));
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../css/soporte.css';
  </style>