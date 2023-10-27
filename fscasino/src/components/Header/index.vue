<template>
  <section class="container">
    <article class="col px-2 mx-0" style="position: relative; max-width: 650px">
      <div class="search">
        <img src="@/assets/icons/search-icon.png" alt="icon" width="21" />
      </div>
      <input type="text" placeholder="Searching for..." />
    </article>
    <article class="col-1">
      <select class="form-select" aria-label="Default select example">
        <option value="1" selected>
          <div>
            <img
              :src="require('@/assets/icons/icon-navbar/korea.png')"
              alt="flag"
            />
          </div>
          Korean
        </option>
        <option value="2">English</option>
        <option value="3">Thailand</option>
      </select>
    </article>
    <article class="d-none d-lg-block">
      <button @click="handleCloseModal('login')">Login</button>
      <button @click="handleCloseModal('signup')">Register</button>
    </article>
  </section>
</template>

<script setup>
import { handleCloseModal } from "@/utils";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

button {
  font-weight: 600;
  background: var(--white);
  padding: 0 1.5rem;

  &:hover {
    color: var(--pink);
  }

  &:first-child {
    border-right: 2px solid #000;
  }
}

input {
  width: 100%;
  padding: 0.5rem 3rem;
  border: none;
  border-radius: 20px;
  background: #f2f2f2;
  color: #7a7a7a;
}

.search {
  position: absolute;
  top: 0.5rem;
  left: 1.2rem;
}

.form-select {
  border: none;

  &:hover {
    cursor: pointer;
  }
}
</style>
