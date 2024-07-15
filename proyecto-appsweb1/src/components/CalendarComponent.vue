<template>
  <div class="calendar-page">
    <header>
      <img src="@/assets/uleam.png" alt="ULEAM" class="logo" @click="goToIndex">
      <h1>Calendario de Eventos</h1>
      <button class="inicio-button" @click="goToIndex">Inicio</button>
    </header>
    <div class="calendar-container">
      <FullCalendar ref="fullCalendar" :options='calendarOptions' />
    </div>
    <div v-if="showModal" class="modal">
      <form @submit.prevent="saveEvent">
        <h2>{{ selectedEvent ? 'Editar Evento' : 'Agregar Evento' }}</h2>
        <label for="event-title">Nombre del evento:</label>
        <input type="text" v-model="eventData.title" required>
        <label for="event-start">Fecha y Hora de Inicio:</label>
        <input type="datetime-local" v-model="eventData.start" required>
        <label for="event-end">Fecha y Hora de Fin:</label>
        <input type="datetime-local" v-model="eventData.end">
        <label for="event-color">Color del Evento:</label>
        <div class="color-options">
          <div v-for="color in colors" :key="color" :style="{ backgroundColor: color }" class="color-circle" @click="selectColor(color)">
            <div v-if="eventData.color === color" class="selected-circle"></div>
          </div>
        </div>
        <div class="button-group">
          <button type="submit">{{ selectedEvent ? 'Guardar Cambios' : 'Agregar Evento' }}</button>
          <button type="button" @click="deleteEvent" v-if="selectedEvent">Eliminar</button>
          <button type="button" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        locale: esLocale,
        headerToolbar: {
          left: 'prev,next today addEventButton',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        customButtons: {
          addEventButton: {
            text: 'Agregar Evento',
            click: this.openAddModal
          }
        },
        editable: true,
        selectable: true,
        events: this.getStoredEvents(),
        eventClick: this.handleEventClick,
        eventDrop: this.updateStoredEvents,
        eventResize: this.updateStoredEvents
      },
      showModal: false,
      eventData: {
        title: '',
        start: '',
        end: '',
        color: ''
      },
      selectedEvent: null,
      colors: ['#B22222', '#006400', '#00008B', '#FFD700', '#FF8C00', '#4B0082', '#FF69B4']
    };
  },
  methods: {
    goToIndex() {
      window.location.href = '/';
    },
    openAddModal() {
      this.resetEventData();
      this.showModal = true;
    },
    resetEventData() {
      this.eventData = {
        title: '',
        start: '',
        end: '',
        color: ''
      };
      this.selectedEvent = null;
    },
    saveEvent() {
      const eventApi = this.$refs.fullCalendar.getApi();
      const eventDataCopy = { ...this.eventData };

      if (this.selectedEvent) {
        this.selectedEvent.setProp('title', eventDataCopy.title);
        this.selectedEvent.setStart(new Date(eventDataCopy.start));
        this.selectedEvent.setEnd(eventDataCopy.end ? new Date(eventDataCopy.end) : null);
        this.selectedEvent.setProp('backgroundColor', eventDataCopy.color);
        this.updateStoredEvents();
      } else {
        eventApi.addEvent({
          title: eventDataCopy.title,
          start: new Date(eventDataCopy.start),
          end: eventDataCopy.end ? new Date(eventDataCopy.end) : null,
          backgroundColor: eventDataCopy.color
        });
        this.updateStoredEvents();
      }
      this.closeModal();
    },
    handleEventClick(info) {
      this.selectedEvent = info.event;
      this.eventData.title = info.event.title;
      this.eventData.start = this.formatDateTime(info.event.start);
      this.eventData.end = this.formatDateTime(info.event.end);
      this.eventData.color = info.event.backgroundColor;
      this.showModal = true;
    },
    formatDateTime(date) {
      return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
    },
    closeModal() {
      this.showModal = false;
    },
    deleteEvent() {
      this.selectedEvent.remove();
      this.updateStoredEvents();
      this.closeModal();
    },
    selectColor(color) {
      this.eventData.color = color;
    },
    getStoredEvents() {
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      return studentData && studentData.events ? studentData.events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : null
      })) : [];
    },
    updateStoredEvents() {
      const eventApi = this.$refs.fullCalendar.getApi();
      const events = eventApi.getEvents().map(event => ({
        title: event.title,
        start: event.start.toISOString(),
        end: event.end ? event.end.toISOString() : null,
        color: event.backgroundColor
      }));
      const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));
      studentData.events = events;
      localStorage.setItem('loggedInStudent', JSON.stringify(studentData));
    }
  }
}
</script>

<style scoped>
@import '../css/calendario.css';
</style>