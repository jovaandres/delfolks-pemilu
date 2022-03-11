<template>
  <div class="home-page">
    <div class="wrapper">
      <div class="left">
        <h1 class="title">
          <span>P</span>
          <span>E</span>
          <span>M</span>
          <span>I</span>
          <span>L</span>
          <span>U</span>
          <span> D</span>
          <span>E</span>
          <span>L</span>
          <span>F</span>
          <span>O</span>
          <span>L</span>
          <span>K</span>
          <span>S</span>
        </h1>
        <div class="btn-container">
          <router-link to="/sign-in">
            <button class="btn-link sign-in">
              Sign In
            </button>
          </router-link>
          <router-link to="sign-up">
            <button class="btn-link sign-up">
              Sign Up
            </button>
          </router-link>
        </div>
      </div>
      <div class="right">
        <div class="img-holder">
          <img src="@/images/homepage/p1.png" alt="Code" class="code1" />
          <img src="@/images/homepage/p2.png" alt="Code" class="code2" />
          <div class="img-blur"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePage"
};
</script>
<style scoped>
.home-page {
  background-color: #bce5e1;
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  background-color: #222824;
  display: flex;
  width: 65vw;
  height: 80vh;
  border-radius: 0.3rem;
  box-shadow: 5px 5px 8px 5px rgba(255, 226, 226, 0.48);
}
.left {
  width: 65%;
  display: flex;
  height: 100vh;
  justify-content: center;
  padding-inline: 5em;
  flex-direction: column;
  /* border: 1px solid white; */
}
.title {
  z-index: 2;
}
.right {
  background-color: #59abbe;
  width: 45%;
  position: relative;
  /* border: 1px solid white; */
}
h1 {
  font-family: "Bowlby One SC";
  font-size: 4em;
}
h1 span {
  transition: 0.15s ease-out;
  cursor: default;
}
h1 span:hover {
  color: #00adb5;
}
.btn-container {
  display: flex;
  gap: 20px;
  z-index: 2;
}
.btn-link {
  outline: none;
  padding: 10px;
  width: 10em;
  border-radius: 30px;
  font-size: 16px;
  transition: 0.15s ease-in-out;
}
.sign-in {
  background-color: #00adb585;
}
.sign-in:hover {
  /* background-color: #14898f; */
  box-shadow: 2px 2px 12px 1px #393e46;
}
.sign-up {
  border: 1px solid #00adb585;
}
.sign-up:hover {
  box-shadow: 2px 2px 12px 1px #393e46;
}
.img-blur {
  height: 100vh;
  background: rgba(34, 40, 49, 0.3);
  box-shadow: 0 -8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
.img-holder {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}
.code1 {
  width: 35em;
  position: absolute;
  right: -10%;
  top: -8%;
}
.code2 {
  width: 32em;
  position: absolute;
  bottom: -8%;
  left: -7%;
}
</style>
