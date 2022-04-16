<template>
  <div class="sign-up-page">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
      </div>
    </transition>
    <div class="sign-up-container">
      <div class="sign-up-box">
        <div class="sign-up-form">
          <h1 class="sign-up-title">Chat admin</h1>
          <input
            type="text"
            class="text-field"
            name="first-name"
            placeholder="Nama"
            v-model="nama"
          />

          <input type="text" class="text-field" name="email" placeholder="Email" v-model="email" />

          <textarea name="pesan" placeholder="Tuliskan pesan" v-model="pesan" rows="5" />

          <button type="submit" class="button w-full" @click="sendMsg">
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatAdmin",
  data() {
    return {
      nama: "",
      email: "",
      pesan: "",
      title: "",
      message: "",
      showModal: false
    };
  },
  methods: {
    sendMsg() {
      this.$http
        ._post("/users/sendMessage", {
          name: this.nama,
          email: this.email,
          message: this.pesan
        })
        .then(res => {
          this.showModal = true;
          this.title = "Berhasil";
          this.message = res.message;
          this.nama = "";
          this.email = "";
          this.pesan = "";
        })
        .catch(err => {
          if (err.response) {
            this.title = err.response.data.name;
            this.message = err.response.data.errors || err.response.data.message;
            this.showModal = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.sign-up-page {
  background: url("../images/background.webp");
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 5em;
  font-family: "Montserrat", sans-serif;
}

.sign-up-container {
  padding: 30px 4em;
  z-index: 2;
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  background: rgba(224, 223, 223, 0.17);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(224, 223, 223, 0.3);
}

.sign-up-box {
  display: flex;
  flex-direction: column;
}

.sign-up-title {
  font-size: 28px;
  text-align: center;
  color: white;
  margin-bottom: 4rem;
}

.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sign-up-form input {
  background-color: #fff1f9;
  color: #463645;
  padding: 9px;
  outline: none;
  width: 20em;
}

.sign-up-form textarea {
  color: #463645;
  background-color: #fff1f9;
  padding: 9px;
  outline: none;
}

.sign-up-form input:-webkit-autofill,
.sign-up-form input:-webkit-autofill:hover,
.sign-up-form input:-webkit-autofill:focus,
.sign-up-form input:-webkit-autofill:active {
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
  transition: color 9999s ease-out, background-color 9999s ease-out;
  transition-delay: 9999s;
}

.sign-up-form button {
  background-color: #00adb590;
  padding: 8px;
  outline: none;
  margin-top: 2rem;
}

.sign-up-form button:hover {
  background-color: #00adb550;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 50vw;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}

.modal h3 {
  color: #2c3e50;
}

.modal p {
  color: #2c3e50;
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}
@media only screen and (max-width: 426px) {
  .sign-up-container {
    padding: 3em 2em;
  }
}
@media only screen and (max-width: 360px) {
  .sign-up-box {
    gap: 2rem;
  }
  .sign-up-title {
    font-size: 20px;
    margin-bottom: 2rem;
  }
  .sign-up-form input {
    font-size: 12px;
  }
  .sign-up-form button {
    font-size: 12px;
  }
}
</style>
