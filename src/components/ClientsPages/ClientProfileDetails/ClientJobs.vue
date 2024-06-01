<template>
  <div class="row">
    <div class="col-12">
      <div class="">
        <div class="card mt-2">
          <div class="card-header">Manage Client Jobs here</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex justify-content-between gap-3 mb-3">
              <div class="gap-2 d-flex">
                <span class="btn btn-primary">Doctor</span>
                <span class="btn btn-primary">Nurse</span>
                <span class="btn btn-primary">HCA</span>
                <span class="btn btn-primary">Senior Doctor</span>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#addVacancies"
              data-bs-whatever="@mdo"
            >
              + Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "ClientJobs",
  data() {
    return {
      name: "",
      client_id: null,

      errors: {},
    };
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        !this.name.trim() ||
        !this.description.trim()
      );
    },
  },
  methods: {
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },

    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.name || !this.client_id;
    },

    validateAndAddJob() {
      this.errors = {};

      if (!this.name.trim()) {
        this.$set(this.errors, "name", "Name is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addJob();
      }
    },
    async addJob() {
      const data = {
        name: this.name,
        client_id: this.color,
      };
      try {
        const response = await fetch(`${VITE_API_URL}/jobs`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.$emit("jobAdded");
          // alert("Add Jobs successfully");
          const message = "Add Jobs successfully";
          this.$refs.successAlert.showSuccess(message);
          this.name = "";
          this.color = "#050505";
          this.description = "";
        } else {
        }
      } catch (error) {}
    },
  },
  mounted() {},
};
</script>
