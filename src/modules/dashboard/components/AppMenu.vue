
<template>
  <v-navigation-drawer
    app
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant="mini"
    absolute
    temporary
  >
    <v-list-item
      v-if="mini"
      @click.stop="mini = !mini"
    >
      <v-icon>chevron_right</v-icon>
    </v-list-item>

    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-icon>person</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{user.name}}
      </v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider light></v-divider>

    <v-list
      class="pt-0"
      dense
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input', false)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>

import AuthService from '@/modules/auth/services/auth-service'

export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true },
      { title: 'Receita', icon: 'add', url: '/dashboard/records/add?type=credit', exact: true },
      { title: 'Despesa', icon: 'remove', url: '/dashboard/records/add?type=debit', exact: true },
      { title: 'Relatórios', icon: 'assessment', url: '/dashboard/reports', exact: true }
    ],
    mini: false,
    user: {}
  }),
  async created () {
    this.user = await AuthService.user()
  }
}
</script>
