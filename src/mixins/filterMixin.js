const filterMixin = {
  methods: {
    updateCheckedInput(e) {
      const checked = e.target.checked
      const title = e.target.value
      const key = e.target.id

      this.$store.commit("addArrayFilter", {
        checked,
        title,
        arrayType: this.arrayType
      })
      
      this[key] = checked
    },
    updateSingleFilter(e) {
      const key = e.target.name

      this.$store.commit("addSingleFilter", {
        key: key,
        value: this[key]
      })

      this[key] = ""
    },
    checkInputState(id) {
      console.log(id)
      const inputState = document.getElementById("Solo")
      console.log(inputState)
      return true
    }    
  }
}

export default filterMixin