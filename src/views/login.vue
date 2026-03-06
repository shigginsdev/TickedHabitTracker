<template>
  <div class="login-page">
    <div class="card">
      <h1>Ticked</h1>
      <p>Sign in with Google to continue.</p>

      <button class="btn" @click="signInWithGoogle" :disabled="loading">
        {{ loading ? 'Redirecting…' : 'Continue with Google' }}      
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const loading = ref(false)
const error = ref<string | null>(null)

async function signInWithGoogle() {
  loading.value = true
  error.value = null

  const { error: err } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      
      redirectTo: `${window.location.origin}/habits`,
    },
  })

  if (err) {
    error.value = err.message
    loading.value = false
  }
  // If successful, the browser redirects away immediately.
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
.card { width: 100%; max-width: 420px; padding: 24px; border: 1px solid #ddd; border-radius: 12px; }
.btn { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #111; cursor: pointer; }
.error { margin-top: 12px; color: #b00020; }
</style>