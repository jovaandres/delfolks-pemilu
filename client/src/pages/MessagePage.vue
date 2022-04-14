<template>
  <div class="home-page">
    <div class="wrapper">
      <div class="box-msg" v-bind:key="value.id" v-for="value in allMessage">
        <h1>{{ value.name }}</h1>
        <h3>{{ value.email }}</h3>
        <h4>{{ value.message }}</h4>
        <div class="hl"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessagePage",
  data() {
    return {
      allMessage: []
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      this.$http
        ._get("/users/getMsgaoidnawidoisncoaiwf")
        .then(res => {
          this.allMessage = res.data;
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>
<style scoped>
.home-page {
  background: url("../images/background.webp");
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 65vw;
  border-radius: 4px;
  background: rgba(224, 223, 223, 0.17);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(224, 223, 223, 0.3);
  margin-top: 5rem;
  margin-bottom: 4rem;
}
.box-msg {
  width: 100%;
  padding: 1rem 2rem;
  color: #222831;
}
.box-msg h3 {
  margin-bottom: 0.75rem;
}
.hl {
  width: 100%;
  height: 1px;
  background: black;
}
@media only screen and (max-width: 375px) {
  .wrapper {
    width: 80vw;
    height: 40vh;
  }
}
</style>
