<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1>Surat Suara</h1>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
      </transition>
      <transition name="pop" appear>
        <div class="modal" role="dialog" v-if="showModal">
          <h3>Alert</h3>
          <p>{{ message }}</p>
          <button class="ok-btn" @click="toHome">OK</button>
        </div>
      </transition>
      <div class="wrapper">
        <div class="candidate">
          <div class="candidate-1">
            <div class="img-holder">
              <img src="@/images/voting/leonard.jpg" alt="candidate-2" class="img-1" />
            </div>
          </div>
          <div class="candidate-2">
            <div class="img-holder">
              <img src="@/images/voting/kotak-kosong.jpg" alt="candidate-2" class="img-2" />
            </div>
          </div>
        </div>
        <div class="choice-wrapper">
          <input type="radio" name="calon" id="number1" v-model="value" value="number1" />
          <input type="radio" name="calon" id="number2" v-model="value" value="number2" />
          <label for="number1" class="option number1">
            <span>Leonard</span>
          </label>
          <label for="number2" class="option number2">
            <span>Kotak Kosong</span>
          </label>
        </div>
        <div class="user-choice">
          <div class="form__group">
            <input
              type="text"
              class="form__input"
              id="name"
              v-model="inputToken"
              placeholder="Token"
            />
          </div>
          <button
            class="button-26"
            :disabled="inputToken === null || value === null || value === ''"
            @click="vote"
          >
            VOTE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex";

export default {
  name: "VotingPage",
  computed: {
    userAuth() {
      return store.state.userAuth;
    }
  },
  data() {
    return {
      value: null,
      inputToken: null,
      message: null,
      showModal: false
    };
  },
  methods: {
    vote() {
      this.$http
        ._post("/vote", { choice: this.value, token: this.inputToken, user: this.userAuth.user })
        .then(res => {
          if (!res.error) {
            this.markTokenAsUsed();
            this.showModal = true;
            this.message = "Berhasil melakukan voting!";
          } else {
            this.showModal = true;
            this.message = res.message;
          }
        })
        .catch(err => {
          this.showModal = true;
          this.message = err.message;
        });
    },
    markTokenAsUsed() {
      this.$http._post("/token/mark", { token: this.inputToken });
    },
    toHome() {
      return this.$router.push({ name: "home" });
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
  padding: 5em;
  font-family: "Montserrat", sans-serif;
}

.dashboard-container {
  padding: 10px 4em;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(193, 193, 193, 0.17);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.9px);
  -webkit-backdrop-filter: blur(3.9px);
  border: 1px solid rgba(193, 193, 193, 0.3);
}

.dashboard-container h1 {
  color: white;
  font-weight: bold;
  font-size: 2rem;
}

.wrapper {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.candidate {
  display: flex;
  flex-direction: row;
  gap: 5rem;
}

.choice-wrapper {
  display: inline-flex;
  height: 90px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  gap: 5rem;
}
.choice-wrapper .option {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}
input[type="radio"] {
  display: none;
}
#number1:checked:checked ~ .number1,
#number2:checked:checked ~ .number2 {
  border-color: palevioletred;
  background: palevioletred;
}
.choice-wrapper .option span {
  font-size: 16px;
  color: #808080;
}
#number1:checked:checked ~ .number1 span,
#number2:checked:checked ~ .number2 span {
  color: #fff;
}

.user-choice {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.form__group {
  display: flex;
  padding: 0;
  margin: 0;
}

.form__input {
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
}

.form__input:focus {
  outline-color: palevioletred;
}

.img-holder {
  padding: 0.25rem;
  background: pink;
  border-radius: 2px;
  box-shadow: 2px 3px 2px 2px rgba(252, 185, 242, 0.4);
}

.img-1 {
  width: 15rem;
  height: 15rem;
  object-fit: cover;
}
.img-2 {
  width: 15rem;
  height: 15rem;
  object-fit: cover;
}

.button-26 {
  background-color: palevioletred;
  border: 1px solid palevioletred;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Graphik, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 1.15;
  overflow: visible;
  padding: 12px 16px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: all 80ms ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
}

.button-26:disabled {
  opacity: 0.5;
}

.button-26:focus {
  outline: 0;
}

.button-26:hover {
  background-color: #ff0c59;
  border-color: #ff0c59;
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
.modal .ok-btn {
  color: white;
  padding: 0.5rem 1rem;
  background: #e52463;
  outline-color: #e52463;
  border-radius: 2px;
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
@media only screen and (max-width: 650px) {
  .dashboard-container {
    padding: 10px 2em;
  }
  .candidate {
    gap: 2rem;
  }
  .choice-wrapper {
    gap: 2rem;
  }
}
@media only screen and (max-width: 650px) {
  .img-1 {
    width: 10rem;
    height: 10rem;
  }
  .img-2 {
    width: 10rem;
    height: 10rem;
  }
}
@media only screen and (max-width: 500px) {
  .dashboard {
    align-items: center;
    padding: 2em;
  }
  .dashboard-container {
    height: 60vh;
  }
}
@media only screen and (max-width: 420px) {
  .img-1 {
    width: 7.5rem;
    height: 7.5rem;
  }
  .img-2 {
    width: 7.5rem;
    height: 7.5rem;
  }
  .dashboard-container {
    padding: 1em;
  }
}
@media only screen and (max-width: 320px) {
  .candidate {
    gap: 1rem;
  }
  .choice-wrapper {
    gap: 1rem;
    font-size: 12px;
  }
  .form__input {
    font-size: 12px;
  }
  .button-26 {
    font-size: 12px;
  }
  .choice-wrapper .option span {
    font-size: 12px;
    color: #808080;
  }
}
</style>
