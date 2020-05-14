<template lang="html">
  <section class="schedule">

    <h2 class="subheading">
      <span>Schedule</span>
      <svg v-if="!showSection" @click="toggleExpand">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-down"></use>
      </svg>
      <svg v-else @click="toggleExpand">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-up"></use>
      </svg>
    </h2>

    <div class="expand-container" v-show="showSection">
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
      <button class="primary-button">Update Schedule</button>
      <div class="schedule-summary" v-if='checkScheduleExists > 0'>
        <h3 class="subheading">Summary</h3>
        <ul>
          <template>
            <li v-for='(task, key) in showSchedule' :key='key'>
              {{key}}: {{task.start}} - {{task.end}}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    showSchedule () {
      if (this.editing) {
        return this.schedule
      }

      return this.$store.state.userConfig.showSetup.schedule
    },
    checkScheduleExists () {
      const obj = Object.keys(this.showSchedule)
      return obj.length
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
      showSection: false,
      editing: false,
      currentTask: 'Select Task',
      schedule: {
        'Load In': {
          start: null,
          end: null
        },
        'Set Up': {
          start: null,
          end: null
        },
        'Openers': {
          start: null,
          end: null
        },
        'Main Event': {
          start: null,
          end: null
        },
        'Teardown': {
          start: null,
          end: null
        },
        'Load Out': {
          start: null,
          end: null
        },
      }
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

      if (!this.editing) {
        this.editing = true
      }

      this.schedule[this.currentTask][timeType] = time
    },
    updateSchedule () {
       this.$store.commit('updateSchedule', {
        schedule: this.schedule
      })
    },
    toggleExpand(){
      this.showSection = !this.showSection
    }
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/variables.scss';

.schedule{
  background-color: white;
  padding: var(--spacing);
  border-bottom: var(--light-border);
  border-right: var(--light-border);

  display: grid;
  grid-row-gap: var(--alt-spacing);

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

/*
create array with of times with quarter hour intervals
when end is set for a task the next task's start is also section
start select array from most recent end
make sure end time index is greater than start time
*/
