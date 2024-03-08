<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h6 class="fw-bold">Rate settings</h6>
        <div class="col-4">
          <div class="d-flex justify-content-between my-3">
            <div>Split rate:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div>Enable split rate only for Holidays:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-content-center">Invoice settings</h6>
          <button class="btn btn-primary"><i class="bi bi-save2-fill"></i> Save</button>
        </div>
        <div class="col-4">
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in client invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div>Rate per mile in candidate invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex my-3" style="gap: 37.3%">
            <div>Invoice creation period:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 41.3%">
            <div>Invoice Due Period:</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 37.3%">
            <div>Invoice Number format:</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 39.3%">
            <div>Invoice Start number:</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 52.3%">
            <div>VAT (%):</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 40.3%">
            <div>Invoice PO Number:</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 46.3%">
            <div>Invoice Email:</div>
            <div>
              <input class="form-control" />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex my-3 justify-content-between">
            <div>Hide email in invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
          <div class="d-flex my-3 justify-content-between">
            <div>Hide mobile in invoice:</div>
            <div>
              <label class="switch">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex my-3">
            <div class="card p-2">
              You can manage the client invoice's site details here.
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex my-3" style="gap: 45.3%">
            <div>Site unit Name:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 40.4%">
            <div>Site Address Line 1:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 40.4%">
            <div>Site Address Line 2:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 44.6%">
            <div>Site Post Code:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 42.7%">
            <div>Invoice Template:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 37.3%">
            <div>Enable Vat Number:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
          <div class="d-flex my-3" style="gap: 37.3%">
            <div>Disable footer in invoice:</div>
            <div>
              <input class="form-control w-100" />
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="d-flex my-3" style="gap: 37.3%">
            <div>Invoice Footer Note:</div>
            <div>
              <TextFormator />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextFormator from "../../textformator/TextFormator.vue";

export default {
  components: {
    TextFormator,
  },
};
</script>

<style scoped>
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 7px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: rgb(189, 84, 15);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
