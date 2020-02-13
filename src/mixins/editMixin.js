const editMixin = {
  methods: {
    editProfile(e, type) {
      const key = e.target.name

      this.$store.commit("editProfile", {
        name: key,
        value: this[key],
        type
      })
      this[key] = ""
    }
  },
}

export default editMixin