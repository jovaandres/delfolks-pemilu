<template>
  <div class="container">
    <div class="wrapper">
      <div class="candidate-1">
        <img src="@/images/voting/candidate-1.jpg" alt="candidate-2" class="img-1" />
        <div class="voteInput">
          <input type="radio" name="calon" id="number1" v-model="value" value="number1" />
          <label for="number1" style="font-size: 35px;" class="text-dark">IU</label>
        </div>
      </div>
      <div class="candidate-2">
        <img src="@/images/voting/candidate-2.jpg" alt="candidate-2" class="img-2" />
        <div class="voteInput">
          <input type="radio" name="calon" id="number2" v-model="value" value="number2" />
          <label for="number1" style="font-size: 35px;" class="text-dark">IU Juga</label>
        </div>
      </div>
    </div>
    <button class="button-26" :disabled="value === null" @click="vote">VOTE</button>
  </div>
</template>

<script>
export default {
  name: "VotingPage",
  data() {
    return {
      value: null
    };
  },
  methods: {
    vote() {
      this.$http
        ._post("/vote", { choice: this.value })
        .then(() => {})
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: flex;
  flex-direction: row;
}
.img-1 {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.img-2 {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.button-26 {
  appearance: button;
  background-color: #1652f0;
  border: 1px solid #1652f0;
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
  background-color: #0a46e4;
  border-color: #0a46e4;
}

.button-26:active {
  background-color: #0039d7;
  border-color: #0039d7;
}
</style>
