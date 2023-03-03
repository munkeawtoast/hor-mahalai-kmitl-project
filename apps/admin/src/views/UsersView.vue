<script>
import { generateDorms, generateUsers } from '@helper/data-gen'

export default {
  data() {
    return {
      users: generateUsers(0, 30),
      dorms: generateDorms(0, 30),
    }
  },
  methods: {
    banUser(user) {
      const deletingID = user.id
      this.dorms = this.dorms.filter((iter) => iter.id !== deletingID)
    },
  },
}
</script>
<template>
  <div class="group--container">
    <div class="group--title">ผู้ใช้</div>
    <table>
      <thead>
        <tr>
          <th>ไอดี</th>
          <th>ชื่อผู้ใช้</th>
          <th>ชื่อจริง</th>
          <th>E-mail</th>
          <th>วัันเกิด</th>
          <th>Role</th>
          <th>Ban</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.id }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ `${user.firstName} ${user.lastName}` }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dob }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button class="user--delete" @click="() => banUser(user)">
              ลบผู้ใช้
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.user--delete {
  all: unset;
  background-color: red;
  border-radius: 3px;
  color: white;
}

.group--container {
  display: flex;
  margin: 30px 40px;
  width: 100%;
}
</style>
