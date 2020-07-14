import formatDate from '@/helper/formatDate'

export default {
  methods: {
    readableDate(date, addTime) {
      const addTimeBoolean = addTime || false
      return formatDate(date, addTimeBoolean)
    }
  }
}