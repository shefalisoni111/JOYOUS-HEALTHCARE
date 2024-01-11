<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <div class="login-form col-md-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <img src="../logo.png" class="img-fluid mb-2" alt="RecPal" width="150" />
                <div class="mb-4">
                  <h4 class="mb-2 fw-bold">Login</h4>
                  <span>Welcome Back! Login to Access your Account</span>
                </div>
                <form @submit.prevent="login()" class="loginform">
                  <div class="mb-3">
                    <input
                      id="inputEmail"
                      type="email"
                      v-model="email"
                      placeholder="Email address"
                      @input="clearError"
                      autofocus="true"
                      class="form-control border-0 shadow-sm"
                    />
                    <!-- <div class="error" v-if="msg">
                      <span class="text-danger">{{ msg }}</span>
                    </div> -->
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputPassword"
                      type="password"
                      v-model="password"
                      placeholder="Password"
                      @input="clearError"
                      required
                      class="form-control border-0 shadow-sm text-primary"
                    />
                  </div>
                  <div v-if="error" class="error-message text-danger">
                    {{ error }}
                  </div>

                  <!-- <div class="form-check ps-0">
                    <label>
                      <input type="checkbox" v-model="rememberMe" /> Remember
                      Password
                    </label>
                  </div> -->
                  <div class="my-4 d-flex justify-content-between">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block text-capitalize shadow-sm"
                    >
                      Sign in
                    </button>
                    <!-- <div class="d-flex align-items-center">
                      Did you
                      <router-link class="ps-1" to="/forgotpassword">
                        Forget your password ?</router-link
                      >
                    </div> -->
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      rememberMe: false,
    };
  },

  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(`${VITE_API_URL}/merchant_login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Access the response data directly
        const jsonData = response.data;

        if (jsonData.is_loged_in) {
          localStorage.setItem("token", jsonData.token);
          this.$router.push({ name: "Home" });
        } else {
          this.error = "Invalid Email or Password";
        }
      } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            // console.error("Request timeout exceeded");
          } else if (error.response) {
            // console.error("Server responded with an error:", error.response.status);
          } else {
            // console.error("Request setup error:", error.message);
          }
        } else {
          // console.error("Network error:", error.message);
        }
      }
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "Home" });
    }

    // Check if "Remember Me" credentials exist
    // const email = localStorage.getItem("email");
    // const password = localStorage.getItem("password");

    // if (email && password) {
    //   this.email = email;
    //   this.password = password;
    // }
  },
};
</script>

<style scoped>
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

.btn-primary {
  border: none;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5f30;
  background: transparent;
  border-bottom: 4px solid #ff5f30;
  border-radius: 0px;
  letter-spacing: 1px;
  font-size: 19px;
}

.nav-link {
  color: black;
  letter-spacing: 1px;
  font-size: 19px;
}
</style>
