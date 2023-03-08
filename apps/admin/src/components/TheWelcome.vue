<script></script>
<template>
  <div
    class="hor-hero full-width text-center justify-center q-pa-xl text-white"
  >
    <div class="wrap">
      <q-icon name="fa-solid fa-city" size="5rem" />
      <h2 class="text-bold">หน้าแอดมินหอมหาลัย</h2>
    </div>
  </div>
  <div class="full-width row justify-around text-center q-pa-xl gap-y-20 wrap">
    <router-link to="/dorms" class=" col-auto-1 col-12 col-md-3 q-my-md ">
      <q-card class="q-pa-lg">
        <q-card-section>
          <q-icon name="apartment" size="4rem" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">จัดการหอพัก</div>
          <div class="text-caption text-grey">
            จัดการหอพัก และห้องพักในแต่ละหอ
          </div>
        </q-card-section>
      </q-card>
    </router-link>
    <router-link to="/users" class="q-my-md col-auto-1 col-12 col-md-3">
      <q-card class="q-pa-lg">
        <q-card-section>
          <q-icon name="people" size="4rem" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">จัดการผู้ใช้</div>
          <div class="text-caption text-grey">จัดการผู้ใช้ทั้งหมดในระบบ</div>
        </q-card-section>
      </q-card>
    </router-link>
    <router-link to="/reports" class="q-my-md col-auto-1 col-12 col-md-3">
      <q-card class="q-pa-lg">
        <q-card-section>
          <q-icon name="error" size="4rem" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">ดูรายงานปัญหา</div>
          <div class="text-caption text-grey">ดูรายงานปัญหาที่ผู้ใช้แจ้งมา</div>
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>
<style scoped>
.hor-hero {
  position: relative;
}
.hor-hero::after {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: blur(2px);
  opacity: 0.6;
  background: url('@/assets/images/hero.png') no-repeat center center;
}
.wrap {
  position: relative;
  z-index: 1;
}

a {
  all: unset;
  cursor: pointer;
}


</style>
