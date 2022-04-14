<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <div class="inner-container">
        <div class="calon">
          <h1>Calon Nomor 1</h1>
          <div class="Foto">
            <img src="@/images/calon/calon.jpg" alt="calon" />
          </div>
          <div class="Identitas">
            <div class="Nama">
              <h1>Leonard Hutagaol</h1>
            </div>
            <div class="Angkatan">
              <h3>Angkatan 2</h3>
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
                Menjadi wadah perhimpunan alumni SMA Unggul Del yang profesional serta unggul,
                memiliki jiwa nasionalisme, dan ikatan kekeluargaan yang 3M (MarTuhan, MarRoha, dan
                MarBisuk) untuk menyatakan gerakan dalam rangka kemajuan berbangsa dan bernegara
                Indonesia.
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
                  1. Meningkatkan rasa cinta almamater dan menjunjung tinggi nama baik SMA Unggul
                  Del
                </li>
                <li>
                  2. Membina dan mengembangkan semangat kekeluargaan dan persatuan alumni SMA Unggul
                  Del yang memiliki beragam profesi
                </li>
                <li>
                  3. Meningkatkan sumber daya manusia melalui konsolidasi komprehensif dalam
                  implementasi 3M (MarTuhan, MarRoha, dan MarBisuk)
                </li>
                <li>
                  4. Membangun kerjasama dan bersinergi aktif dengan instansi SMA Unggul Del dalam
                  informasi-informasi yang terkini, objektif, dan realistis
                </li>
                <li>
                  5. Membantu kelancaran pendidikan melalui saran dan program nyata bagi kemajuan
                  sekolah SMA Unggul Del
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(193, 193, 193, 0.17);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.9px);
  -webkit-backdrop-filter: blur(3.9px);
  border: 1px solid rgba(193, 193, 193, 0.3);
}

.inner-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.calon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
.Foto {
  padding: 4px;
  background: white;
}
img {
  width: 210px;
  height: 280px;
}
.Identitas {
  text-align: center;
}
.Angkatan {
  color: gray;
}
.Isi {
  text-align: left;
  width: 60%;
  line-height: 2.5;
}
.Visi2 {
  text-indent: 40px;
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;
}
.Misi2 {
  font-size: 14px;
  text-align: justify;
  text-justify: inter-word;
}
@media only screen and (max-width: 1280px) {
  .Isi {
    line-height: 1.75;
  }
}
@media only screen and (max-width: 1000px) {
  .Isi {
    line-height: 1.25;
  }
}
@media only screen and (max-width: 768px) {
  .dashboard {
    align-items: normal;
    justify-content: normal;
    height: auto;
  }
  .dashboard-container {
    align-items: normal;
    justify-content: normal;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .inner-container {
    flex-direction: column;
  }
  .Isi {
    line-height: 2;
  }
}
</style>
