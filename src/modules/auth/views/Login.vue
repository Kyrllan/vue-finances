<template>
  <v-container fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm6
        md4
        lg3
        x1
      >
        <v-card class="elevation-12">
          <v-toolbar color="primary">
            <v-spacer></v-spacer>
            <v-toolbar-title>{{texts.toolbar}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="white"
              width="2"
            ></v-progress-circular>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-if="!isLogin"
                prepend-icon="person"
                name="name"
                label="Nome"
                type="text"
                :success="!$v.user.name.$invalid"
                :error-messages="nameErrors"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                :success="!$v.user.password.$invalid"
                :error-messages="passwordErrors"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn
                :disabled="$v.$invalid"
                block
                depressed
                color="primary"
                @click="submit"
              >
                {{texts.toolbar}}
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                depressed
                @click="isLogin = !isLogin"
              >{{texts.button}}</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-snackbar
          v-model="showSnackbar"
          timeout="4000"
        >{{error}}
          <v-btn
            color="pink"
            text
            @click="showSnackbar = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { required, email, minLength } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-service'
import { formatError } from '@/utils.js'

export default {
  name: 'Login',
  data: () => ({
    error: undefined,
    showSnackbar: false,
    isLogin: true,
    isLoading: false,
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  validations () {
    const validations = {
      user: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    }

    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin
        ? { toolbar: 'Entrar', button: 'Criar Conta' }
        : { toolbar: 'Criar Conta', button: 'Já tenho uma conta' }
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Email é obrigatório!')
      !email.email && errors.push('Insira um email válido')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatória!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)
      return errors
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        // await new Promise(resolve => setTimeout(resolve, 3000))
        this.isLogin
          ? await AuthService.login(this.user)
          : await AuthService.signup(this.user)
        // ponto ideal para fazer o redirect do login da aplicação
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (error) {
        console.log(error)
        this.error = formatError(error.message)
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
