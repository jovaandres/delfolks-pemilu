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
          <img src="../images/homepage/kayes.jpg" alt="gatau" />
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
  background: url("../images/background.webp");
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}
.wrapper {
  background-color: rgba(96, 202, 218, 0.75);
  display: flex;
  width: 65vw;
  height: 80vh;
  border-radius: 4px;
  box-shadow: 5px 5px 8px 5px rgba(255, 226, 226, 0.48);
}
.left {
  width: 65%;
  display: flex;
  justify-content: center;
  padding-inline: 5em;
  flex-direction: column;
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
  font-family: "Bowlby One SC", sans-serif;
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
.img-holder {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  background-size: auto;
}

.img-holder img {
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 1080px) {
  .left {
    padding-inline: 3em;
  }
  h1 {
    font-size: 3em;
  }
  .btn-link {
    width: 8em;
  }
}
@media only screen and (max-width: 800px) {
  .left {
    padding-inline: 2em;
  }
  h1 {
    font-size: 2em;
  }
  .btn-link {
    width: 5em;
    font-size: 12px;
  }
}
@media only screen and (max-width: 500px) {
  .left {
    width: 100%;
  }
  .right {
    display: none;
  }
  .btn-link {
    width: 7em;
    font-size: 12px;
  }
}
@media only screen and (max-width: 375px) {
  .wrapper {
    width: 80vw;
    height: 40vh;
  }
  .left {
    padding-inline: 1.5em;
    gap: 1.5rem;
  }
}
</style>
