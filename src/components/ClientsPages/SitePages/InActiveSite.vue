<template>
  <div>
    <div class="table-wrapper mt-3">
      <table class="table clientTable">
        <thead>
          <tr>
            <th scope="col">#RefCode</th>
            <th scope="col">ClientName</th>
            <!-- <th scope="col">Jobs</th> -->
            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <!-- <th scope="col">Portal Access</th> -->
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>be7b58ds</td>
            <td>
              <router-link
                class="text-capitalize text-decoration-underline text-black"
                :to="{ name: 'SingleSiteprofile' }"
                >Merchant 1</router-link
              >
            </td>
            <td>india</td>
            <td>9897654322</td>
            <td>merchant1@gmail.com</td>
            <td>Active</td>
            <td>View</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
</style>
