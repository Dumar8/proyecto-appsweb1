<template>
  <div>
    <header>
      <img :src="uleamLogo" alt="ULEAM" class="logo logo-registro" @click="goToPage('/')">
      <h1 align="center">Perfil del Estudiante</h1>
    </header>

    <div class="cards-container">
      <div class="card">
        <h2>Datos del Estudiante</h2>
        <form id="studentForm" @submit.prevent="guardarCambios">
          <div class="form-group">
            <label for="nombre">Nombres<span class="required">*</span>:</label>
            <input type="text" id="nombre" v-model="estudiante.nombre" :disabled="!editMode" required>
          </div>
          <div class="form-group">
            <label for="apellido">Apellidos<span class="required">*</span>:</label>
            <input type="text" id="apellido" v-model="estudiante.apellido" :disabled="!editMode" required>
          </div>
          <div class="form-group">
            <label for="nacimiento">Fecha de nacimiento<span class="required">*</span>:</label>
            <input type="date" id="nacimiento" v-model="estudiante.nacimiento" :disabled="!editMode" required>
          </div>
          <div class="form-group">
            <label for="cedula">Número de cédula<span class="required">*</span>:</label>
            <input type="number" id="cedula" v-model="estudiante.cedula" pattern="\d{10}" disabled>
          </div>
          <div class="form-group">
            <label for="phone">Número de teléfono<span class="required">*</span>:</label>
            <input type="tel" id="phone" v-model="estudiante.phone" pattern="^0\d{9}$" :disabled="!editMode" required>
          </div>
          <div class="form-group">
            <label for="genero">Género<span class="required">*</span>:</label>
            <select id="genero" v-model="estudiante.genero" :disabled="!editMode" required>
              <option value="" disabled>Seleccione una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <div class="form-group">
            <label for="direccion">Dirección del domicilio<span class="required">*</span>:</label>
            <textarea id="direccion" v-model="estudiante.direccion" :disabled="!editMode" required></textarea>
          </div>
          <div class="form-group">
            <label for="programa">Facultad<span class="required">*</span>:</label>
            <select id="programa" v-model="estudiante.programa" :disabled="!editMode" required>
              <option value="" disabled>Seleccione una opción</option>
              <option value="salud">FACULTAD CIENCIAS DE LA SALUD</option>
              <option value="administrativas">FACULTAD CIENCIAS ADMINISTRATIVAS, CONTABLES Y COMERCIO</option>
              <option value="educacion">FACULTAD DE EDUCACIÓN TURISMO ARTES Y HUMANIDADES</option>
              <option value="ingenieria">FACULTAD INGENIERÍA, INDUSTRIA Y CONSTRUCCIÓN</option>
              <option value="vida">FACULTAD CIENCIAS DE LA VIDA Y TECNOLOGÍAS</option>
              <option value="sociales">FACULTAD CIENCIAS SOCIALES DERECHO Y BIENESTAR</option>
            </select>
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Información sobre la Discapacidad</h2>
        <div class="form-group discapacidad-group">
          <label for="tipo_discapacidad">Tipo de Discapacidad<span class="required">*</span>:</label><br>
          <div class="discapacidad-option" v-for="(label, id) in discapacidades" :key="id">
            <input type="radio" :id="id" v-model="estudiante.tipoDiscapacidad" :value="id" :disabled="!editMode">
            <label :for="id">{{ label }}</label>
            <span class="tooltip-icon" :title="tooltips[id]"><strong>?</strong></span>
          </div>
        </div>
        <div class="form-group">
          <label for="ajustes">¿Requiere algún ajuste especial? (software especial, acceso físico, otros recursos)</label>
          <textarea id="ajustes" v-model="estudiante.ajustes" aria-label="Descripción de ajustes especiales" :disabled="!editMode"></textarea>
        </div>
      </div>

      <div class="card">
        <h2>Información de Emergencia</h2>
        <form id="studentForm">
          <div class="form-group">
            <label for="contacto_emergencia">Nombre completo del Contacto de Emergencia<span class="required">*</span>:</label>
            <input type="text" id="contacto_emergencia" v-model="estudiante.contactoEmergencia" :disabled="!editMode" required aria-label="Contacto de emergencia">
          </div>
          <div class="form-group">
            <label for="telefono_emergencia">Número de teléfono del Contacto de Emergencia<span class="required">*</span>:</label>
            <input type="tel" id="telefono_emergencia" v-model="estudiante.telefonoEmergencia" pattern="^0\d{9}$" :disabled="!editMode" required>
          </div>
          <div class="form-group">
            <label for="relacion_contacto">Relación con el Contacto de Emergencia<span class="required">*</span>:</label>
            <select id="relacion_contacto" v-model="estudiante.relacionContacto" :disabled="!editMode" required>
              <option value="" disabled>Seleccione una opción</option>
              <option value="Padre">Padre</option>
              <option value="Madre">Madre</option>
              <option value="Hermano">Hermano</option>
              <option value="Hermana">Hermana</option>
              <option value="Abuelo">Abuelo</option>
              <option value="Abuela">Abuela</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div class="form-group" v-if="estudiante.relacionContacto === 'Otro'">
            <label for="otra_relacion">Especifique otra relación:</label>
            <input type="text" id="otra_relacion" v-model="estudiante.otraRelacion" :disabled="!editMode">
          </div>
        </form>
      </div>
    </div>

    <div class="button-container">
      <button type="button" @click="goToPage('/')">← Volver</button>
      <button v-if="!editMode" @click="habilitarEdicion">Actualizar Perfil</button>
      <button v-else @click="guardarCambios">Guardar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileComponent',
  data() {
    return {
      uleamLogo: require('@/assets/uleam.png'),
      editMode: false,
      estudiante: {
        nombre: '',
        apellido: '',
        nacimiento: '',
        cedula: '',
        phone: '',
        genero: '',
        direccion: '',
        programa: '',
        ajustes: '',
        contactoEmergencia: '',
        telefonoEmergencia: '',
        relacionContacto: '',
        otraRelacion: '',
        tipoDiscapacidad: ''
      },
      estudianteOriginal: null,
      discapacidades: {
        visual: 'Discapacidad visual',
        auditiva: 'Discapacidad auditiva',
        sordoceguera: 'Sordoceguera',
        intelectual: 'Discapacidad intelectual',
        psicosocial: 'Discapacidad psicosocial (mental)',
        fisica: 'Discapacidad física',
        multiple: 'Discapacidad múltiple'
      },
      tooltips: {
        visual: 'Ceguera total, baja visión.',
        auditiva: 'Sordera, hipoacusia.',
        sordoceguera: 'Combinación de discapacidad visual y auditiva.',
        intelectual: 'Síndrome de Down, discapacidad cognitiva.',
        psicosocial: 'Trastornos mentales severos como esquizofrenia, trastorno bipolar.',
        fisica: 'Paraplejía, tetraplejía, amputaciones.',
        multiple: 'Combinación de dos o más tipos de discapacidad.'
      }
    };
  },
  methods: {
    goToPage(page) {
      window.location.href = page;
    },
    llenarFormulario() {
      const estudiante = JSON.parse(localStorage.getItem('loggedInStudent'));
      if (estudiante) {
        this.estudiante = estudiante;
        this.estudianteOriginal = { ...estudiante }; // Guardar el estado original
      }
    },
    habilitarEdicion() {
      this.editMode = true;
    },
    guardarCambios() {
      if (JSON.stringify(this.estudiante) !== JSON.stringify(this.estudianteOriginal)) {
        const confirmacion = confirm('¿Estás seguro de guardar los cambios?');
        if (confirmacion) {
          localStorage.setItem('loggedInStudent', JSON.stringify(this.estudiante));
          alert('¡Datos actualizados con éxito!');
          this.estudianteOriginal = { ...this.estudiante }; // Actualizar el estado original
          this.editMode = false;
        }
      } else {
        this.editMode = false;
      }
    }
  },
  mounted() {
    this.llenarFormulario();
  }
};
</script>

<style scoped>
@import '../css/perfil.css';

.discapacidad-group {
  display: flex;
  flex-direction: column;
}

.discapacidad-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.tooltip-icon {
  margin-left: 10px;
  font-size: 0.75em;
  font-weight: bold;
  vertical-align: super;
  cursor: pointer;
  color: #1b7721;
}
</style>
