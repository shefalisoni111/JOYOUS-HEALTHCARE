<template>
  <div class="container-fluid p-0">
    <div
      class="d-flex align-items-center justify-content-center whole-bg"
      :style="backgroundStyle"
    >
      <div
        class="row no-gutter d-flex justify-content-center align-items-center w-100"
      >
        <div class="col-4 d-flex wrapper-div p-0">
          <!-- <div class="col-md-6 d-none d-md-flex bg-image"></div>g -->
          <!-- <div class="col-md-6 d-none d-md-flex bg-image"></div> -->
          <div class="login-form">
            <img
              :src="getAgencyLogo"
              class="img-fluid mb-2 m-auto d-block"
              alt="RecPal"
              width="170"
              loading="eager"
            />
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 mx-auto">
                    <div class="d-flex justify-content-center mb-4">
                      <button
                        class="me-2"
                        :class="{
                          'btn btn-secondary': loginType === 'client',
                          'btn btn-outline-secondary': loginType !== 'client',
                        }"
                        @click="setLoginType('client')"
                      >
                        Client Login
                      </button>
                      <button
                        class="me-2"
                        :class="{
                          'btn btn-secondary': loginType === 'admin',
                          'btn btn-outline-secondary': loginType !== 'admin',
                        }"
                        @click="setLoginType('admin')"
                      >
                        Admin Login
                      </button>
                    </div>
                    <div class="mb-4">
                      <h4 class="mb-2 fw-bold">
                        {{
                          loginType === "admin" ? "Admin Login" : "Client Login"
                        }}
                      </h4>
                      <span>Welcome Back! Login to Access your Account</span>
                    </div>
                    <!-- Form -->
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

                      <!-- Conditionally Render Extra Field for Admin Login
                      <div v-if="loginType === 'admin'" class="mb-3">
                        <input
                          id="adminCode"
                          type="text"
                          v-model="adminCode"
                          placeholder="Admin Code"
                          @input="clearError"
                          class="form-control border-0 shadow-sm"
                        />
                      </div> -->

                      <div v-if="error" class="error-message text-danger">
                        {{ error }}
                      </div>

                      <div class="my-4 d-flex justify-content-between">
                        <button
                          type="submit"
                          class="btn btn-primary btn-block text-capitalize shadow-sm cursor-pointer"
                        >
                          <span v-if="loading">
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading...
                          </span>
                          <span v-else>Sign in</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Loader
              v-if="loading"
              :isLoading="loading"
              class="position-absolute start-50 translate-middle"
              style="z-index: 1000; top: 100%; transform: translate(-50%, -50%)"
            ></Loader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loader from "../../Loader/Loader.vue";
import loginBg from "@/assets/loginbggg12.png";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      rememberMe: false,
      loading: false,
      token: null,
      tokenExpiration: null,
      adminCode: "",
      loginType: "client",
      backgroundStyle: {},
    };
  },

  components: {
    Loader,
  },
  computed: {
    ...mapGetters(["getAgencyLogo"]),
  },
  methods: {
    setLoginType(type) {
      this.loginType = type;
      this.clearError();
    },
    clearError() {
      this.error = false;
    },
    async login() {
      this.loading = true;
      try {
        if (this.loginType === "admin") {
          // Handle admin login
          await this.adminLogin();
        } else {
          // Handle client login
          await this.clientLogin();
        }
      } catch (error) {
        this.error = "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async clientLogin() {
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/client_login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonData = response.data;

        if (jsonData.is_logged_in) {
          const tokenExpiration = new Date(jsonData.expiry_time).getTime();
          const expirationTime = tokenExpiration;

          localStorage.setItem("token", jsonData.token);
          localStorage.setItem("tokenExpiration", expirationTime);
          localStorage.setItem("c_unique", jsonData.client_id);
          localStorage.setItem("loginType", "client");
          this.$store.dispatch("setUser", {
            role: jsonData.role,
          });
          this.$router.push({ name: "ClientDash" });

          this.setupAutoLogout(tokenExpiration - new Date().getTime());
        } else {
          this.error = "Invalid Email or Password";
        }
      } catch (error) {
        this.error = "Invalid Email or Password";
      }
    },

    async adminLogin() {
      // this.loading = true;
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/merchant_login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonData = response.data;

        if (jsonData.is_logged_in) {
          const tokenExpiration = new Date(jsonData.expiry_time).getTime();
          const expirationTime = tokenExpiration;

          localStorage.setItem("token", jsonData.token);
          localStorage.setItem("tokenExpiration", expirationTime);
          localStorage.setItem("merchant_id", jsonData.merchant_id);
          localStorage.setItem("loginType", "admin");
          this.$router.push({ name: "Home" });

          this.setupAutoLogout(tokenExpiration - new Date().getTime());
        } else {
          this.error = "Invalid Email or Password";
        }
      } catch (error) {
        this.error = "Invalid Email or Password";
      }
      // finally {
      //   this.loading = false;
      // }
    },

    setupAutoLogout(timeToExpiration) {
      setTimeout(() => {
        this.logoutDueToExpiration();
      }, timeToExpiration);
    },
    checkTokenExpiration() {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      // if (!tokenExpiration) {
      //   this.$router.push("/home");
      //   return;
      // }
      const currentTime = new Date().getTime();

      if (tokenExpiration && currentTime >= parseInt(tokenExpiration)) {
        this.logoutDueToExpiration();
      } else {
        const remainingTime = parseInt(tokenExpiration) - currentTime;
        this.setupAutoLogout(remainingTime);
      }
    },
    logoutDueToExpiration() {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      this.logout();
    },

    logout() {
      // localStorage.removeItem("token");
      // localStorage.removeItem("tokenExpiration");
      this.$router.replace({ name: "Login" });
    },
  },

  mounted() {
    this.checkTokenExpiration();

    // Check if "Remember Me" credentials exist
    // const email = localStorage.getItem("email");
    // const password = localStorage.getItem("password");

    // if (email && password) {
    //   this.email = email;
    //   this.password = password;
    // }
    this.backgroundStyle = {
      backgroundImage: `url(${loginBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  },
};
</script>
<style scoped>
.login,
.image {
}
.whole-bg {
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
  background-image: url("src/assets/loginbggg12.png");
  background-size: cover;
  background-position: center center;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
}
.login-form {
  flex: 1;
  padding: 20px;
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
@media (max-width: 1300px) and (min-width: 800px) {
  .wrapper-div {
    width: 40%;
  }
}
@media (max-width: 799px) {
  .wrapper-div {
    width: 58%;
  }
}
</style>
