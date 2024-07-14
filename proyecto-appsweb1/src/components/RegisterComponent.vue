<template>
  <div class="register-page">
    <div class="form-container">
      <img :src="uleamLogo" alt="ULEAM" class="logo logo-registro" @click="goToPage('/')">
      <header>
        <h1 align="center">Registro de personas con capacidades especiales</h1>
      </header>
      <h2>Ingrese los datos del estudiante:</h2>
      <form id="studentForm" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nombre">Nombres<span class="required">*</span>:</label>
          <input type="text" id="nombre" name="nombre" maxlength="30" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" v-model="nombre" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="apellido">Apellidos<span class="required">*</span>:</label>
          <input type="text" id="apellido" name="apellido" maxlength="30" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" v-model="apellido" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="nacimiento">Fecha de nacimiento<span class="required">*</span>:</label>
          <input type="date" id="nacimiento" name="nacimiento" required v-model="nacimiento" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="cedula">Número de cédula<span class="required">*</span>:</label>
          <input type="text" id="cedula" name="cedula" required v-model="cedula" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="phone">Número de teléfono<span class="required">*</span>:</label>
          <input type="tel" id="phone" name="phone" pattern="^0\d{9}$" required v-model="phone" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="genero">Género<span class="required">*</span>:</label>
          <select name="genero" id="genero" required v-model="genero" @change="markFormAsModified">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div class="form-group">
          <label for="direccion">Dirección del domicilio<span class="required">*</span>:</label>
          <textarea id="direccion" name="direccion" required v-model="direccion" @input="markFormAsModified"></textarea>
        </div>
        <div class="form-group">
          <label for="programa">Facultad<span class="required">*</span>:</label>
          <select name="programa" id="programa" required v-model="programa" @change="markFormAsModified">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="salud">FACULTAD CIENCIAS DE LA SALUD</option>
            <option value="administrativas">FACULTAD CIENCIAS ADMINISTRATIVAS, CONTABLES Y COMERCIO</option>
            <option value="educacion">FACULTAD DE EDUCACIÓN TURISMO ARTES Y HUMANIDADES</option>
            <option value="ingenieria">FACULTAD INGENIERÍA, INDUSTRIA Y CONSTRUCCIÓN</option>
            <option value="vida">FACULTAD CIENCIAS DE LA VIDA Y TECNOLOGÍAS</option>
            <option value="sociales">FACULTAD CIENCIAS SOCIALES DERECHO Y BIENESTAR</option>
          </select>
        </div>
        <h2>Información sobre la Discapacidad:</h2>
        <div class="form-group">
          <label for="tipo_discapacidad">Tipo de Discapacidad<span class="required">*</span>:</label><br>
          <input type="radio" id="visual" name="tipo_discapacidad" value="visual" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="visual">Discapacidad visual</label>
          <span class="tooltip-icon" title="Ceguera total, baja visión."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="auditiva" name="tipo_discapacidad" value="auditiva" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="auditiva">Discapacidad auditiva</label>
          <span class="tooltip-icon" title="Sordera, hipoacusia."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="sordoceguera" name="tipo_discapacidad" value="sordoceguera" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="sordoceguera">Sordoceguera</label>
          <span class="tooltip-icon" title="Combinación de discapacidad visual y auditiva."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="intelectual" name="tipo_discapacidad" value="intelectual" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="intelectual">Discapacidad intelectual</label>
          <span class="tooltip-icon" title="Síndrome de Down, discapacidad cognitiva."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="psicosocial" name="tipo_discapacidad" value="psicosocial" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="psicosocial">Discapacidad psicosocial (mental)</label>
          <span class="tooltip-icon" title="Trastornos mentales severos como esquizofrenia, trastorno bipolar."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="fisica" name="tipo_discapacidad" value="fisica" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="fisica">Discapacidad física</label>
          <span class="tooltip-icon" title="Paraplejía, tetraplejía, amputaciones."><strong>?</strong></span><br>
          <p></p>
          <input type="radio" id="multiple" name="tipo_discapacidad" value="multiple" v-model="tipoDiscapacidad" @change="markFormAsModified">
          <label for="multiple">Discapacidad múltiple</label>
          <span class="tooltip-icon" title="Combinación de dos o más tipos de discapacidad."><strong>?</strong></span><br>
        </div>
        <div class="form-group">
          <label for="ajustes">¿Requiere algún ajuste especial? (software especial, acceso físico, otros recursos)</label>
          <textarea id="ajustes" name="ajustes" aria-label="Descripción de ajustes especiales" v-model="ajustes" @input="markFormAsModified"></textarea>
        </div>
        <h2>Información de Emergencia:</h2>
        <div class="form-group">
          <label for="contacto_emergencia">Nombre completo del Contacto de Emergencia<span class="required">*</span>:</label>
          <input type="text" id="contacto_emergencia" name="contacto_emergencia" required aria-label="Contacto de emergencia" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" v-model="contactoEmergencia" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="telefono_emergencia">Número de teléfono del Contacto de Emergencia<span class="required">*</span>:</label>
          <input type="tel" id="telefono_emergencia" name="telefono_emergencia" pattern="^0\d{9}$" required v-model="telefonoEmergencia" @input="markFormAsModified">
        </div>
        <div class="form-group">
          <label for="relacion_contacto">Relación con el Contacto de Emergencia<span class="required">*</span>:</label>
          <select id="relacion_contacto" name="relacion_contacto" required v-model="relacionContacto" @change="markFormAsModified">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Padre">Padre</option>
            <option value="Madre">Madre</option>
            <option value="Hermano">Hermano</option>
            <option value="Hermana">Hermana</option>
            <option value="Abuelo">Abuelo</option>
            <option value="Abuela">Abuela</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div class="form-group" id="otro_relacion" style="display: block;">
          <label for="otra_relacion">Especifique otra relación:</label>
          <input type="text" id="otra_relacion" name="otra_relacion" v-model="otraRelacion" @input="markFormAsModified">
        </div>
        <div class="button-container">
          <button type="reset" @click="handleReset">Limpiar</button>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      uleamLogo: require('@/assets/uleam.png'),
      formModified: false,
      nombre: '',
      apellido: '',
      nacimiento: '',
      cedula: '',
      phone: '',
      genero: '',
      direccion: '',
      programa: '',
      tipoDiscapacidad: '',
      ajustes: '',
      contactoEmergencia: '',
      telefonoEmergencia: '',
      relacionContacto: '',
      otraRelacion: ''
    };
  },
  methods: {
    goToPage(page) {
      window.location.href = page;
    },
    handleSubmit() {
      // Validar el número de cédula
      if (!this.isValidCedula(this.cedula)) {
        alert('Número de cédula incorrecto. Inténtelo de nuevo.');
        return;
      }

      // Validar que al menos una discapacidad esté seleccionada
      if (!this.tipoDiscapacidad) {
        alert('Debe seleccionar al menos un tipo de discapacidad.');
        return;
      }

      // Obtener la lista de estudiantes almacenada en localStorage
      const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];

      // Verificar si el número de cédula ya existe
      const cedulaExistente = estudiantes.some(estudiante => estudiante.cedula === this.cedula);
      if (cedulaExistente) {
        alert('El número de cédula ya está registrado. Inténtelo de nuevo.');
        return;
      }

      // Verificar si el número de teléfono ya existe
      const telefonoExistente = estudiantes.some(estudiante => estudiante.phone === this.phone);
      if (telefonoExistente) {
        alert('El número de teléfono ya está registrado. Inténtelo de nuevo.');
        return;
      }

      // Guardar los datos en localStorage
      const studentData = {
        nombre: this.nombre,
        apellido: this.apellido,
        nacimiento: this.nacimiento,
        cedula: this.cedula,
        phone: this.phone,
        genero: this.genero,
        direccion: this.direccion,
        programa: this.programa,
        tipoDiscapacidad: this.tipoDiscapacidad,
        ajustes: this.ajustes,
        contactoEmergencia: this.contactoEmergencia,
        telefonoEmergencia: this.telefonoEmergencia,
        relacionContacto: this.relacionContacto,
        otraRelacion: this.otraRelacion
      };

      estudiantes.push(studentData);
      localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

      // Remover el evento beforeunload antes de redirigir
      window.removeEventListener('beforeunload', this.handleBeforeUnload);

      // Redirigir al usuario a la página de inicio de sesión después de enviar el formulario
      alert('¡Datos enviados con éxito!');
      this.formModified = false; // Restablecer el estado del formulario modificado
      window.location.href = "login.html";
    },
    handleReset(event) {
      const confirmacion = this.formModified && confirm('¿Está seguro de limpiar el formulario?');
      if (!confirmacion) {
        event.preventDefault(); // Evitar la acción predeterminada si el usuario elige "Cancelar"
      } else {
        window.scrollTo(0, 0); // Desplazar la página hacia arriba si el usuario elige "Aceptar"
      }
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
    establecerFechasNacimiento() {
      const hoy = new Date();
      const anioMinimo = hoy.getFullYear() - 18;
      const anioMaximo = hoy.getFullYear() - 60;
      const mes = hoy.getMonth() + 1; // Los meses son indexados desde 0
      const dia = hoy.getDate();
      const mesString = mes < 10 ? `0${mes}` : mes;
      const diaString = dia < 10 ? `0${dia}` : dia;
      const fechaMinima = `${anioMinimo}-${mesString}-${diaString}`;
      const fechaMaxima = `${anioMaximo}-${mesString}-${diaString}`;
      const fechaNacimientoInput = document.getElementById('nacimiento');
      fechaNacimientoInput.setAttribute('max', fechaMinima);
      fechaNacimientoInput.setAttribute('min', fechaMaxima);
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
    // Establecer la fecha mínima y máxima de nacimiento al cargar la página
    this.establecerFechasNacimiento();

    // Manejador de evento para la selección de relación con el contacto de emergencia
    document.getElementById('relacion_contacto').addEventListener('change', function() {
      const otroRelacionInput = document.getElementById('otra_relacion');
      const otroRelacionLabel = document.querySelector('label[for="otra_relacion"]');
      if (this.value === 'Otro') {
        otroRelacionLabel.style.display = 'block';
        otroRelacionInput.style.display = 'block';
        otroRelacionInput.setAttribute('required', 'required');
      } else {
        otroRelacionLabel.style.display = 'none';
        otroRelacionInput.style.display = 'none';
        otroRelacionInput.removeAttribute('required');
      }
    });

    // Verificar el estado inicial del campo "Otra relación"
    const relacionContactoValue = document.getElementById('relacion_contacto').value;
    const otroRelacionInput = document.getElementById('otra_relacion');
    const otroRelacionLabel = document.querySelector('label[for="otra_relacion"]');
    if (relacionContactoValue === 'Otro') {
      otroRelacionLabel.style.display = 'block';
      otroRelacionInput.style.display = 'block';
      otroRelacionInput.setAttribute('required', 'required');
    } else {
      otroRelacionLabel.style.display = 'none';
      otroRelacionInput.style.display = 'none';
      otroRelacionInput.removeAttribute('required');
    }

    // Mostrar mensaje de confirmación al recargar la página solo si el formulario ha sido modificado
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
};
</script>

<style scoped>
@import '../css/estilos.css';

.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/fondo.jpg') no-repeat center center fixed;
  background-size: cover;
}

.form-container {
  background: white;
  padding: 25px 20px 20px;
  border-radius: 8px;
  box-shadow: 10px 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%; 
}
</style>
