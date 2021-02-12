<template>
  <v-toolbar :color="color">
    <v-layout align-center>
      <v-flex xs1>
        <div class="text-left"></div>
        <v-btn
          icon
          text
          @click="decrement"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-flex>

      <v-flex
        xs8
        offset-xs2
      >
        <v-toolbar-title class="text-center">
          <span> {{ currentMonth }} </span>
        </v-toolbar-title>
      </v-flex>

      <v-flex
        xs2
        text-xs-right
        v-if="showSlot"
      >
        <slot />
      </v-flex>

      <v-flex
        xs1
        :class="arrowRightClass"
      >
        <div class="text-right"></div>
        <v-btn
          icon
          text
          @click="increment"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  props: {
    format: String,
    color: String,
    month: String,
    showSlot: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: undefined
  }),
  computed: {
    arrowRightClass () {
      return !this.showSlot ? 'offset-xs2' : ''
    },
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  created () {
    this.setCurrentMonth()
    this.emit()
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    },
    setCurrentMonth () {
      this.date = this.month ? moment(this.month, this.format) : moment()
    }
  }
}
</script>
