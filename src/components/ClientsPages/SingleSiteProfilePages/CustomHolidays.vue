<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-items-center mb-0">
            You can add custom holidays here
          </h6>
          <button class="btn btn-primary">
            <i class="bi bi-plus"></i> Add Custom Holiday
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="table-wrapper mt-3">
          <table class="table clientTable">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <!-- <th scope="col">Jobs</th> -->
                <th scope="col">Type</th>
                <th scope="col">Actions</th>

                <!-- <th scope="col">Portal Access</th> -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>be7b58ds</td>

                <td>india</td>
                <td>9897654322</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  &nbsp;&nbsp;
                  <button class="btn btn-outline-success text-nowrap">
                    <i class="bi bi-trash"></i></button
                  >&nbsp;&nbsp;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
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
