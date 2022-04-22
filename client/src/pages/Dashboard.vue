<template>
  <div class="dashboard">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>Token</h3>
        <p>{{ message }}</p>
        <button
          class="cp-btn"
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          {{ copy }}
        </button>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showNotes" @click="showNotes = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showNotes">
        <div class="note-title">
          <h3>CATATAN</h3>
        </div>
        <div class="note-list">
          <ol>
            <li>
              1. Untuk melakukan voting, setiap pemilih tetap diharuskan untuk melakukan claim token
              dengan menekan tombol <b>Claim Token</b> pada dashboard. Token tersebut akan digunakan
              sebagai syarat agar hasil voting yang diberikan valid.
            </li>
            <li>
              2. Proses klaim token hanya dapat dilakukan satu kali. Harap langsung menyalin token
              yang muncul dengan menekan tombol COPY. Sebaiknya, token yang telah tersalin pada
              clipboard diingat atau di-screenshot karena hanya akan ditampilkan satu kali.
            </li>
          </ol>
        </div>
        <div class="check-note">
          <div class="checkbox-note">
            <input id="checknotes" type="checkbox" v-model="checked" />
            <label for="checknotes">Setuju pada catatan di atas</label>
          </div>
          <button class="acc-btn" :disabled="checked === false" @click="markNotes">Continue</button>
        </div>
      </div>
    </transition>
    <div class="dashboard-container" v-if="userAuth.isAuth">
      <button class="sign-out" @click.prevent="handleLogout">
        <i class="fas fa-door-open"></i>
        <span>Sign out</span>
      </button>
      <div class="inner-container">
        <div class="profile">
          <div class="profile-img">
            <img src="@/images/dashboard/people.png" alt="people" />
          </div>
          <h4 class="nis">{{ userAuth.user.nis }}</h4>
          <div class="profile-content">
            <h2 class="name">
              {{ userAuth.user.name }}
            </h2>
          </div>
        </div>
        <div class="web-content">
          <button class="token-btn" @click="claimToken">Claim Token</button>
          <router-link to="voting">
            <button class="vote-btn">Voting</button>
          </router-link>
          <button class="notes-btn" @click="popUpNotes">Read Notes</button>
          <router-link to="calon">
            <button class="calon-btn">Lihat Calon</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex";
import { mapActions } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      copy: "COPY",
      checked: false,
      showModal: false,
      showNotes: false,
      message: null
    };
  },
  computed: {
    userAuth() {
      return store.state.userAuth;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout().then(() => {
        this.$nextTick().then(() => {
          this.$router.push({ name: "home" });
        });
      });
    },
    claimToken() {
      this.$http
        ._post("/token", { user: this.userAuth.user })
        .then(res => {
          if (!res.error) {
            this.message = res.token;
            this.showModal = true;
          } else {
            this.message = res.message;
            this.showModal = true;
          }
        })
        .catch(err => {
          alert(err.message);
        });
    },
    popUpNotes() {
      this.showNotes = true;
    },
    markNotes() {
      this.$http._post("/users/read", { user: this.userAuth.user }).then(res => {
        if (!res.error) {
          this.showNotes = false;
        }
      });
    },
    onCopy: function() {
      this.copy = "COPIED";
    },
    onError: function(e) {
      this.copy = "COPY AGAIN";
      console.log(e);
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #61b0b7;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em;
  font-family: "Montserrat", sans-serif;
}

.dashboard-container {
  padding: 10px 4em;
  z-index: 2;
  height: 100%;
  width: 60vw;
  background: rgba(224, 223, 223, 0.17);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(224, 223, 223, 0.3);
}

.inner-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.sign-out {
  border: 1px solid white;
  position: absolute;
  top: 5%;
  background-color: #eeeeee;
  padding-inline: 15px;
  height: 2.2em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222831;
  transition: all 0.2s ease-in-out;
  gap: 7px;
}

.sign-out i {
  color: #222831;
  font-size: 18px;
}

.profile {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70%;
  justify-content: space-evenly;
  background-color: rgba(27, 190, 166, 0.8);
  border-radius: 4px;
  box-shadow: 2px 2px 3px 2px rgba(255, 226, 226, 0.48);
  padding: 1em;
}

.profile-img {
  width: 10em;
  height: 10em;
  background-color: #fff;
  border-radius: 50%;
}

.profile-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.profile-content {
  margin-top: 10px;
}

.nis {
  text-align: center;
  font-size: 1.2rem;
  color: whitesmoke;
}

.name {
  text-align: center;
  font-size: 24px;
  color: whitesmoke;
}

.web-content {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 12.5em 12.5em;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}

.web-content button {
  width: 12.5em;
  height: 9em;
  outline: none;
  transition: 0.15s ease-in-out;
  font-weight: bold;
  color: white;
  border-radius: 2px;
}

.token-btn {
  background-color: #ffafcc;
}

.token-btn:hover {
  background-color: #00adb540;
  box-shadow: 2px 2px 12px 1px #393e46;
  transform: scale(1.05);
}

.vote-btn {
  background-color: #f697ba;
}

.vote-btn:hover {
  background-color: #00adb540;
  box-shadow: 2px 2px 12px 1px #393e46;
  transform: scale(1.05);
}

.notes-btn {
  background-color: #f697ba;
}

.notes-btn:hover {
  background-color: #00adb540;
  box-shadow: 2px 2px 12px 1px #393e46;
  transform: scale(1.05);
}

.calon-btn {
  background-color: #ffafcc;
}

.calon-btn:hover {
  background-color: #00adb540;
  box-shadow: 2px 2px 12px 1px #393e46;
  transform: scale(1.05);
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  gap: 1rem;
}

.modal .note-title {
  font-weight: bold;
}

.modal .note-list {
  margin-top: 1rem;
}

.modal .note-list ol li {
  margin-top: 0.5rem;
}

.modal .check-note {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal .cp-btn {
  color: white;
  padding: 0.5rem 1rem;
  background: #e52463;
  outline-color: #e52463;
  border-radius: 2px;
}

.modal .acc-btn {
  color: white;
  padding: 0.5rem 1rem;
  background: #e52463;
  outline-color: #e52463;
  border-radius: 2px;
}

.modal .acc-btn:disabled {
  background: palevioletred;
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
@media only screen and (max-width: 1368px) {
  .dashboard-container {
    width: 70vw;
    padding: 2em 2em;
  }
  .profile-img {
    width: 8em;
    height: 8em;
  }
  .name {
    font-size: 14px;
  }
  .nis {
    font-size: 12px;
  }
  .web-content {
    grid-column-gap: 4px;
    grid-row-gap: 4px;
  }
  .web-content button {
    width: 9rem;
    height: 6.75rem;
    font-size: 0.8rem;
  }
}
@media only screen and (max-width: 900px) {
  .dashboard-container {
    width: 80vw;
    padding: 2em 2em;
  }
  .inner-container {
    flex-direction: column;
  }
  .profile {
    width: 10em;
  }
  .profile-img {
    width: 5em;
    height: 5em;
  }
  .name {
    font-size: 12px;
  }
  .nis {
    font-size: 10px;
  }
  .sign-out {
    font-size: 12px;
  }
  .sign-out i {
    font-size: 12px;
  }
  .web-content button {
    height: 3rem;
  }
}
@media only screen and (max-width: 600px) {
  .inner-container {
    gap: 2rem;
  }
  .web-content {
    display: flex;
    flex-direction: column;
  }
  .web-content button {
    height: 2rem;
    font-weight: normal;
  }
  .profile {
    margin-top: 2rem;
  }
}
@media only screen and (max-width: 600px) {
  .modal {
    width: 90vw;
  }
}
@media only screen and (max-width: 360px) {
  .modal {
    width: 90vw;
  }
  .modal .note-list {
    font-size: 12px;
  }
  .modal .check-note {
    font-size: 12px;
  }
}
</style>
