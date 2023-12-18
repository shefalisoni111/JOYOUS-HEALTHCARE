<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <div class="login-form col-md-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <img
                  src="../logo.png"
                  class="img-fluid mb-2"
                  alt="RecPal"
                  width="150"
                />
                <div class="mb-4">
                  <h2 class="mb-2 fw-bold">ForgotPassword</h2>
                </div>

                <form @submit.prevent="forgot" class="loginform">
                  <div class="mb-3">
                    <input
                      id="inputEmail"
                      type="email"
                      v-model="email"
                      placeholder="Email address"
                      required
                      autofocus="true"
                      class="form-control border-0 shadow-sm"
                    />
                  </div>

                  <div class="my-4 d-flex justify-content-between">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block text-capitalize shadow-sm"
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
    };
  },
  methods: {
    async forgot() {},
  },
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("src/assets/login-split.jpg");
  background-size: cover;
  background-position: center center;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
}
</style>
