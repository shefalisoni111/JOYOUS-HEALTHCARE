<template>
  <div>
    <label for="example-input">Choose a time</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        type="text"
        placeholder="HH:mm"
      ></b-form-input>
      <b-input-group-append>
        <b-form-timepicker
          v-model="value"
          button-only
          right
          show-seconds
          locale="en"
          aria-controls="example-input"
        ></b-form-timepicker>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "TimeSet",
  data() {
    return {
      value: "",
    };
  },
};
</script>
