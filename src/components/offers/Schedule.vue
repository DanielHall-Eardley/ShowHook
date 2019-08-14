<template lang="html">
  <section class="schedule">
    <h2 class="subheading">Schedule</h2>
    <div class="schedule-select-times">
      <label for="task" class="schedule-task-label">Select a task</label>
      <select class="edit-input schedule-select-task"
        v-on:click="selectTask($event)"
        id="task">
        <option v-for="item in offer.schedule">{{item.task}}</option>
      </select>

      <label for="start" class="schedule-start-label">Select a start time</label>
      <select class="edit-input schedule-select-start"
        v-on:click="selectTime($event)"
        id="start"
        name="start">
        <option v-for="time in timesArray">{{time}}</option>
      </select>

      <label for="end" class="schedule-end-label">Select an end time</label>
      <select class="edit-input schedule-select-end"
        v-on:click="selectTime($event)"
        id="end"
        name="end">
        <option v-for="time in timesArray">{{time}}</option>
      </select>
    </div>
    <div class="schedule-show-times">
      <div v-for="item in offer.schedule" class="schedule-list">
        <span class="schedule-task">{{item.task}}</span>
        <span class="schedule-start"><b>Start: </b>{{item.start}}</span>
        <span class="schedule-end"><b>End: </b>{{item.end}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    },
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
      task: "Load In",
    }
  },
  methods:{
    selectTask(e){
      this.task = e.target.value
    },
    selectTime(e){
      this.$store.commit('updateSchedule', {
        currentTask: this.task,
        time: event.target
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/variables.scss';

.schedule{
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing);
  box-shadow: var(--box-shadow-default);
  margin-bottom: var(--spacing);
  margin-left: var(--spacing);

  grid-column: offer-start / offer-end;
  justify-self: stretch;
  align-self: start;
  display: grid;
  grid-row-gap: var(--alt-spacing);

  &-select-times{
    display: grid;
    grid-row-gap: var(--alt-spacing);
    margin-bottom: var(--alt-spacing);
  }

  &-show-times{
    display: grid;
    grid-row-gap: var(--alt-spacing);
  }

  &-list{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: .5rem;
    border-bottom: solid .5px var(--secondary-six)
  }

  &-select-task, &-select-start, &-select-end{

    option{
      outline: none;
    }
  }

  &-task{
    grid-column: 1 / -1;
    font-size: 1.8rem;
    color: var(--primary);
  }

  &-start{
    grid-column: 1 / span 2;
    padding-bottom: var(--alt-spacing);
  }

  &-end{
    grid-column: 3 / span 2;
    padding-bottom: var(--alt-spacing);
  }
}
</style>

/*
create array with of times with quarter hour intervals
when end is set for a task the next task's start is also section
start select array from most recent end
make sure end time index is greater than start time
*/
