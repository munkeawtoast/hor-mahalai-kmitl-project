<script>
const items = [
  {
    title: 'จัดการหอพัก',
    caption: 'จัดการหอพัก และห้องพักในแต่ละหอ',
    icon: 'apartment',
    to: '/dorms',
  },
  {
    title: 'จัดการผู้ใช้',
    caption: 'จัดการผู้ใช้ทั้งหมดในระบบ',
    icon: 'people',
    to: '/users',
  },
  {
    title: 'ดูรายงานปัญหา',
    caption: 'ดูรายงานปัญหาที่ผู้ใช้แจ้งมา',
    icon: 'error',
    to: '/reports',
  },
]

export default {
  data() {
    return {
      items,
    }
  },
}
</script>
<template>
  <div
    class="hor-hero full-width text-center justify-center q-pa-xl text-white"
  >
    <div class="wrap">
      <q-icon name="fa-solid fa-city" size="5rem" />
      <h2 class="text-bold">หน้าแอดมินหอมหาลัย</h2>
    </div>
  </div>
  <div class="full-width row justify-around text-center q-pa-xl gap-y-20 wrap items-stretch">
    <template v-for="(el, index) in items" :key="index">
      <router-link :to="el.to" class="col-auto-1 col-12 col-md-3 q-my-md">
        <q-card class="q-pa-lg self-stretch">
          <q-card-section>
            <q-icon :name="el.icon" size="4rem" />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">{{ el.title }}</div>
            <div class="text-caption text-grey">
              {{ el.caption }}
            </div>
          </q-card-section>
        </q-card>
      </router-link>
    </template>
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

.q-my-md {
  margin: 1rem 0;
}
</style>
