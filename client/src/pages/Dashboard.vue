<template>
  <div class="dashboard">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>Token</h3>
        <p>{{ message }}</p>
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
          <button class="notes-btn" @click="claimToken">Read Notes</button>
          <router-link to="voting">
            <button class="add-btn">Voting</button>
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
      showModal: false,
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
    }
  }
};
</script>

<style scoped>
.dashboard {
  background: url("../images/background.webp");
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em;
}

.dashboard-container {
  padding: 10px 4em;
  z-index: 2;
  background-color: rgba(162, 232, 243, 0.75);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 4px;
  box-shadow: 5px 5px 8px 5px rgba(255, 226, 226, 0.48);
  height: 100%;
}

.inner-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
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
  width: 18em;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70%;
  justify-content: space-evenly;
  background-color: rgba(27, 190, 166, 0.8);
  border-radius: 4px;
  box-shadow: 2px 2px 3px 2px rgba(255, 226, 226, 0.48);
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
  font-size: 30px;
  color: whitesmoke;
}

.web-content {
  width: 25em;
  display: grid;
  align-items: center;
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
  font-family: Arial, Helvetica, sans-serif;
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

.add-btn {
  background-color: #ffafcc;
}

.add-btn:hover {
  background-color: #00adb540;
  box-shadow: 2px 2px 12px 1px #393e46;
  transform: scale(1.05);
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
</style>
