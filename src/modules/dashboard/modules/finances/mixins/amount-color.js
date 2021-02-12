export default {
  methods: {
    amountColor (amount) {
      return amount < 0
        ? 'error--text text--lighten-1'
        : 'secondary--text text--lighten-1'
    }
  }
}
