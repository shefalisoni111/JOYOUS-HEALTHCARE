<template>
  <div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-center whole-bg">
      <div class="row no-gutter d-flex justify-content-center align-items-center w-100">
        <div class="col-4 d-flex wrapper-div p-0">
          <!-- <div class="col-md-6 d-none d-md-flex bg-image"></div> -->

          <div class="login-form">
            <img
              src="../logo.png"
              class="img-fluid mb-2 m-auto d-block"
              alt="RecPal"
              width="170"
            />
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 mx-auto">
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
                          class="btn btn-primary btn-block text-capitalize shadow-sm cursor-pointer"
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

        const jsonData = response.data;

        if (jsonData.is_loged_in) {
          localStorage.setItem("token", jsonData.token);
          this.$router.push({ name: "Home" });

          if (jsonData.tokenExpiration) {
            localStorage.setItem("tokenExpiration", jsonData.tokenExpiration);
            this.setupAutoLogout();
          }
        } else {
          this.error = "Invalid Email or Password";
        }
      } catch (error) {
        // Handle errors
      }
    },

    setupAutoLogout() {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const timeToExpiration = tokenExpiration - Date.now();

      setTimeout(() => {
        this.logout();
      }, timeToExpiration);
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if token exists and set up auto logout
      if (localStorage.getItem("tokenExpiration")) {
        this.setupAutoLogout();
      } else {
        // Token doesn't have expiration info, probably manually deleted
        this.logout();
      }

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
}
.whole-bg {
  background-image: url("src/assets/loginbggg11.jpg");
  height: 100vh;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.wrapper-div {
  box-shadow: 0 8px 11px 0 rgb(0 0 0 / 42%), 0 15px 24px 0 rgb(0 0 0 / 38%);
  border-radius: 12px;
  background-color: antiquewhite;
}
.bg-image {
  flex: 1;
  background-image: url("src/assets/loginbggg.jpg");
  background-size: cover;
  background-position: center center;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
}
.login-form {
  flex: 1; /* This will make the form take up the remaining space */
  padding: 20px; /* Adjust the padding as needed */
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
.cursor-pointer {
  cursor: pointer;
}
</style>
