<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1>Calon Nomor 1</h1>
      <div class="inner-container">
        <div class="calon">
          <div class="Foto">
            <img src="@/images/calon/calon.jpg" alt="calon" />
          </div>
          <div class="Identitas">
            <div class="Nama">
              <h1>Nama Calon</h1>
            </div>
            <div class="Angkatan">
              <h3>Angkatan</h3>
            </div>
          </div>
        </div>
        <div class="Isi">
          <div class="Visi">
            <div class="Visi1">
              <h2>Visi</h2>
            </div>
            <div class="Visi2">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem impedit unde quis
                magni cum asperiores.
              </p>
            </div>
          </div>
          <div class="Misi">
            <div class="Misi1">
              <h2>Misi</h2>
            </div>
            <div class="Misi2">
              <ul class="Num">
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem impedit unde
                  quis magni cum asperiores.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem impedit unde
                  quis magni cum asperiores.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem impedit unde
                  quis magni cum asperiores.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex";

export default {
  name: "calon",
  computed: {
    userAuth() {
      return store.state.userAuth;
    }
  },
  methods: {}
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
  font-family: "Montserrat", sans-serif;
}

.dashboard-container {
  z-index: 2;
  background-color: rgba(162, 232, 243, 0.75);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 4px;
  box-shadow: 5px 5px 8px 5px rgba(255, 226, 226, 0.48);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inner-container {
  display: flex;
  height: 80%;
  align-items: center;
  gap: 5rem;
  justify-content: center;
}
.calon {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
img {
  border-radius: 8px;
  width: 210px;
  height: 280px;
}
.Identitas {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.Angkatan {
  color: gray;
}
.Isi {
  text-align: left;
  width: 50%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 2.5;
}
.Visi2 {
  text-indent: 40px;
  color: gray;
  font-size: 12px;
}
.Misi2 {
  color: gray;
  line-height: 3;
  font-size: 12px;
}
</style>
