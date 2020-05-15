<template lang="html">
  <section class="schedule">
    <h2 class="subheading">Schedule</h2>
    <div class="container">
      <div class="schedule-select-times">
        <label for="task" class="schedule-task-label">Select a task</label>
        <select 
          class="default-input schedule-select-task"
          v-model='currentTask'>
          <option disabled>Select Task</option>
          <option>Load In</option>
          <option>Set Up</option>
          <option>Openers</option>
          <option>Main Event</option>
          <option>Teardown</option>
          <option>Load Out</option>
        </select>

        <label for="start" class="schedule-start-label">Select a start time</label>
        <select 
          class="default-input schedule-select-start"
          v-on:change='addTask($event)'
          name='start'>
          <option selected disabled>Select Start Time</option>
          <option v-for="time in timesArray">{{time}}</option>
        </select>

        <label for="end" class="schedule-end-label">Select an end time</label>
        <select class="default-input schedule-select-end"
          v-on:change='addTask($event)'
          name='end'>
          <option selected disabled>Select End Time</option>
          <option v-for="time in timesArray">{{time}}</option>
        </select>
      </div>
      <div class="schedule-summary">
        <ul>
          <li v-for='(task, key) in showSchedule' :key='key'>
            {{key}}: {{task.start}} - {{task.end}}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    showSchedule () {
      return this.$store.state.showSetup.schedule
    }
  },
  data(){
    return{
      timesArray: [
        "5:00 pm",
        "5:15 pm",
        "5:30 pm",
        "5:45 pm",
        "6:00 pm",
        "6:15 pm",
        "6:30 pm",
        "6:45 pm",
        "7:00 pm",
        "7:15 pm",
        "7:30 pm",
        "7:45 pm",
        "8:00 pm",
        "8:15 pm",
        "8:30 pm",
        "8:45 pm",
        "9:00 pm",
        "9:15 pm",
        "9:30 pm",
        "9:45 pm",
        "10:00 pm",
        "10:15 pm",
        "10:30 pm",
        "10:45 pm",
        "11:00 pm",
        "11:15 pm",
        "11:30 pm",
        "11:45 pm",
        "12:00 am",
        "12:15 am",
        "12:30 am",
        "12:45 am",
        "1:00 am",
        "1:15 am",
        "1:30 am",
        "1:45 am",
        "2:00 am",
        "2:15 am",
        "2:30 am",
        "2:45 am",
        "3:00 am",
      ],
      currentTask: 'Select Task',
    }
  },
  methods:{
    addTask (e) {
      this.$store.commit('clearError')
      const time = e.target.value
      const timeType = e.target.name
      
      if (this.currentTask === 'Select Task') {
        this.$store.commit('updateError', {
          messages: ['You must select a task to modify']
        })
        return
      }

      this.$store.commit('updateSchedule', {
        currentTask: this.currentTask,
        timeType,
        time
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../globalStyles/helper.scss';

.schedule{
  background-color: white;
  padding: var(--spacing);
  border-bottom: var(--light-border);
  border-right: var(--light-border);

  .container {
    display: grid;
    grid-row-gap: var(--alt-spacing);
  }
  
  select{
    font-size: 1.6rem;
  }

  &-select-times{
    display: grid;
    grid-row-gap: var(--alt-spacing);
    margin-bottom: var(--alt-spacing);
  }

  &-summary {
    h3 {
      margin-bottom: var(--alt-spacing);
    }

    ul {
      list-style: none;
    }

    li {
      margin-bottom: .5rem;
      margin-left: var(--alt-spacing);
    }
  }
}
</style>
