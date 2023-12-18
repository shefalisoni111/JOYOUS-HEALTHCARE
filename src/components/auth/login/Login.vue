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
                  <h4 class="mb-2 fw-bold">Login</h4>
                  <span>Welcome Back! Login to Access your Account</span>
                </div>
                <!-- <div class="error" v-if="msg.error">
                  <router-link to="/signup">SignUp</router-link>
                  <p class="text-danger">{{ msg.error }}</p>
                </div> -->

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
        const response = await fetch(
          "https://logezy.onrender.com/merchant_login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const jsonData = await response.json();

        if (jsonData.is_loged_in) {
          localStorage.setItem("token", jsonData.token);
          //localStorage.setItem("data", JSON.stringify(data));
          this.$router.push({ name: "Home" });

          // If "Remember Me" is checked, store the user's credentials
          // if (this.rememberMe) {
          //   localStorage.setItem("email", this.email);
          //   localStorage.setItem("password", this.password);
          // } else {

          //   localStorage.removeItem("email");
          //   localStorage.removeItem("password");
          // }
        } else {
          this.error = true;
          this.error = "Invalid Email or Password";
          // if (email) {
          //   this.error = "Please Enter Correct Email";
          // }

          // if (password) {
          //   this.error = "Please Enter Correct Password";
          // }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
        }
      }
    },
    clearError() {
      // Clear the error message when the user starts typing
      this.error = false;
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
</style>
