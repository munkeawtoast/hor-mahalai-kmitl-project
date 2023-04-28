<script>
export default {
  methods: {
    backFunction() {
      this.$router.push({ path: '/' })
    },
    onSubmit() {
      
    }
  },
}
</script>
<template>
  <div>
    <div class="container">
      <p class="backButton" @click="backFunction">&#60; Go back</p>
      <form @submit.prevent="onSubmit">
        <label>Dorm name: </label>
        <input v-model="dormName" type="text" />

        <label>dorm Location: </label>
        <input v-model="dormLocation" type="password" /><br />
        <label>Lattitude: </label>
        <input v-model="lattitude" type="password" />
        <label>Longitude: </label>
        <input v-model="longitude" type="password" /><br />

        <label>Description of the dorm: </label>
        <textarea v-model="description" rows="5" cols="50"></textarea><br />
        <label>ค่าน้ำ: </label>
        <input v-model="waterRate" type="number" />
        <label>ค่าไฟ: </label>
        <input v-model="electricityRate" type="number" /><br />
        <label>สิ่งอำนวยความสะดวก</label><br />
        <input
          v-model="bikePark"
          type="radio"
          name="bikePark"
          value="bikePark"
        />
        <label>ที่จอดรถจักรยาน</label>
        <input
          v-model="waterRefill"
          type="radio"
          name="waterRefill"
          value="waterRefill"
        />
        <label>ตู้กดน้ำ</label>
        <input
          v-model="securityCamera"
          type="radio"
          name="securityCamera"
          value="securityCamera"
        />
        <label>กล้องวงจรปิด</label>
        <input v-model="washer" type="radio" name="washer" value="washer" />
        <label>เครื่องซักผ้า</label><br />
        <input
          v-model="airConditioner"
          type="radio"
          name="airConditioner"
          value="airConditioner"
        />
        <label>แอร์</label>
        <input v-model="bed" type="radio" name="bed" value="bed" />
        <label>เตียง</label>
        <input
          v-model="waterHeater"
          type="radio"
          name="waterHeater"
          value="waterHeater"
        />
        <label>เครื่องทำน้ำอุ่น</label>
        <input v-model="fan" type="radio" name="fan" value="fan" />
        <label>พัดลม</label>

        <br />
        <button @click="submitLocal">Submit</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
form {
  font-size: 1.5em;
  font-weight: bold;
}
button {
  background-color: unset;
  margin: 0.5em 0 0.5em 0;
  padding: 0.5em 6em;
  border-radius: 10px;
}
/* a{
  all:
} */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transform: translateY(-10vh);
  height: 100vh;
}
.backButton {
  position: absolute;
  font-size: 2em;
  top: 100px;
  left: -650px;
  cursor: pointer;
}
.backButton:hover {
  color: red;
}

.danger {
  color: red;
}
</style>
