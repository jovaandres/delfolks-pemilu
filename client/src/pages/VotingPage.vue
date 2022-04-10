<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <div class="wrapper">
        <div class="candidate">
          <div class="candidate-1">
            <div class="img-holder">
              <img src="@/images/voting/candidate-1.jpg" alt="candidate-2" class="img-1" />
            </div>
          </div>
          <div class="candidate-2">
            <div class="img-holder">
              <img src="@/images/voting/candidate-2.jpg" alt="candidate-2" class="img-2" />
            </div>
          </div>
        </div>
        <div class="choice-wrapper">
          <input type="radio" name="calon" id="number1" v-model="value" value="number1" />
          <input type="radio" name="calon" id="number2" v-model="value" value="number2" />
          <label for="number1" class="option number1">
            <span>IU</span>
          </label>
          <label for="number2" class="option number2">
            <span>IU Juga</span>
          </label>
        </div>
        <div class="user-choice">
          <div class="form__group">
            <input type="text" class="form__input" id="name" v-model="inputToken" placeholder="Token" />
            <label for="name" class="form__label">Token</label>
          </div>
          <button class="button-26" :disabled="inputToken === null || value === null || value === ''" @click="vote">
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
      inputToken: null
    };
  },
  methods: {
    vote() {
      this.$http
        ._post("/vote", { choice: this.value, token: this.inputToken, user: this.userAuth.user })
        .then(res => {
          if (!res.error) {
            alert("Success");
            this.markTokenAsUsed();
          } else {
            alert(res.message);
          }
        })
        .catch(err => {
          alert(err.message);
        });
    },
    markTokenAsUsed() {
      this.$http._post("/token/mark", { token: this.inputToken });
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

.wrapper {
  height: 100%;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}

.form__label {
  font-family: "Roboto", sans-serif;
  color: palevioletred;
  font-size: 1rem;
  display: block;
  transition: all 0.3s;
  transform: translateY(0rem);
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

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(-4rem);
  transform: translateY(-4rem);
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
  appearance: button;
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
</style>
