<template>
  <div class="auth-action">
    <button class="login-btn">
      Login
    </button>
    <button class="signup-btn">
      Sign up
    </button>
  </div>
</template>
<script setup>

</script>
<style>
.auth-action {
  padding: 10px;
}
.login-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 12px 24px;
  align-items: center;
  width: 101px;
  height: 51px;
  color: #CC9A6C;
  background: var(--bg);
  /* Neutral / 200 */
  border: 1px solid #E4E4E7;
  border-radius: 64px;
  margin-right: 20px;

}
.signup-btn {
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  width: 120px;
  height: 51px;
  background: #CC9A6C;
  border-radius: 111px;
  justify-content: center;
}
</style>