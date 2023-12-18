<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <div class="login-form col-md-6">
        <div class="login d-flex align-items-center">
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
                  <h2 class="mb-2 fw-bold">Signup</h2>
                </div>

                <form @submit.prevent="handleSubmit" class="loginform">
                  <div class="mb-3">
                    <input
                      id="inputFName"
                      type="text"
                      v-model="first_name"
                      placeholder="First Name"
                      required
                      autofocus="true"
                      class="form-control border-0 shadow-sm"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputLName"
                      type="text"
                      v-model="last_name"
                      placeholder="Last Name"
                      required
                      autofocus="true"
                      class="form-control border-0 shadow-sm"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputEmail"
                      type="email"
                      v-model="email"
                      placeholder="Email Address"
                      required
                      autofocus="true"
                      class="form-control border-0 shadow-sm"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputPassword"
                      type="password"
                      v-model="password"
                      placeholder="Password"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="confirmPassword"
                      type="password"
                      v-model="confirm_password"
                      placeholder="confirm Password"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputAddress"
                      type="text"
                      v-model="address"
                      placeholder="Address"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputPostCode"
                      type="text"
                      v-model="postcode"
                      placeholder="Postcode"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputPNumber"
                      type="text"
                      v-model="phone_number"
                      placeholder="Phone Number"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>

                  <div class="my-4 d-flex justify-content-between">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block text-capitalize shadow-sm"
                    >
                      Sign up
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
import { useRouter } from "vue-router";
let error = "";
export default {
  name: "SignUp",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      postcode: "",
      phone_number: "",
    };
  },
  methods: {
    async handleSubmit() {
      const router = useRouter();
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        address: this.address,
        postcode: this.postcode,
        phone_number: this.phone_number,
      };
      try {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch("https://logezy.onrender.com/merchants", {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
        const jsonData = await response.json();

        if (response.status == 200) {
          alert("SignUp Successful!!");
          localStorage.setItem("token", JSON.stringify(data));
        }
      } catch (error) {}
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("src/assets/signupimg3.png");
  background-size: cover;
  background-position: center center;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
}
</style>
