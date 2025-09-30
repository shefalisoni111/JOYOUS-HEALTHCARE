<template>
  <div>
    <div class="container-fluid">
      <form>
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Assign To</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Site</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Time</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Position</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Date</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Rate Cards</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Notes</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <div class="d-flex gap-3 align-items-center">
            <div v-if="isPublished" class="d-flex gap-3 align-items-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="pushNotificationCheckbox"
                />
                <label class="form-check-label" for="pushNotificationCheckbox">
                  Push Notification
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="textNotificationCheckbox"
                />
                <label class="form-check-label" for="textNotificationCheckbox">
                  Text Notification
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="emailNotificationCheckbox"
                />
                <label class="form-check-label" for="emailNotificationCheckbox">
                  Email Notification
                </label>
              </div>
            </div>
          </div>
          <div class="d-flex gap-3">
            <div class="d-flex align-items-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="isPublished"
                  id="publishCheckbox"
                />
                <label class="form-check-label" for="publishCheckbox">
                  Tick here to publish
                </label>
              </div>
            </div>

            <div class="d-flex gap-2">
              <!-- <button class="btn btn-danger">Delete</button> -->
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPublished: false,
    };
  },
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.form-check-input {
  border: 2px solid grey;
}
label {
  font-weight: bold;
}
</style>
