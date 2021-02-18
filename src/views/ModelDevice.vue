<template>
  <div class="table">
    <div class="head">
      <b-button
        variant="success"
        v-b-modal.modal-prevent-closing
        class="button"
      >
        Add
      </b-button>
      <h1>
        Model-Device Management
      </h1>
    </div>
    <b-container fluid>
      <b-table
        :items="is_modeldevice"
        :fields="fields"
        stacked="md"
        show-empty
        small
      >
        <template #cell(user_name)="row">
          {{ jsUcfirst(row.value) }}
        </template>
        <template #cell(actions)="row">
          <b-button
            variant="outline-warning"
            size="sm"
            class="mr-1"
            @click="handleUpdate(row.item.code, row.item.name)"
          >
            Update
          </b-button>
          <b-button
            size="sm"
            @click="handleDelete(row.item.name)"
            variant="outline-danger"
          >
            Delete
          </b-button>
        </template>
      </b-table>
    </b-container>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create Model Device"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input2"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Code"
          label-for="name-input"
          invalid-feedback="Code is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="code"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-edit-prevent-closing"
      ref="modal-update"
      title="Update Model Device"
      @ok="Update"
    >
      <form ref="form">
        <b-form-group label="Code" label-for="name-input6">
          <b-form-input
            id="name-input6"
            v-model="code"
            :placeholder="this.code_update.toString()"
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form">
        <b-form-group label="Name" label-for="name-input">
          <b-form-input
            id="name-input5"
            v-model="name"
            :placeholder="this.name_update"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      code: "",
      name: "",
      nameState: null,
      name_update: "",
      code_update: "",
      fields: [
        {
          key: "name",
          label: "Name"
        },
        {
          key: "code",
          label: "Code"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  computed: { ...mapState(["modeldevice"]), ...mapGetters(["is_modeldevice"]) },
  created() {
    this.$store.dispatch("loadModelDevice");
  },

  methods: {
    Update() {
      let data = new FormData();
      data.append("code", this.code);
      data.append("name", this.name);
      this.$store.dispatch("updateModelDevice", {
        id: this.name_update,
        data
      });
    },
    jsUcfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.code = "";
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      this.handleSubmit(bvModalEvt);
    }, 
    handleUpdate(code, name) {
      this.$refs["modal-update"].show();
      this.name_update = name;
      this.code_update = code;
    },
    handleSubmit(bvModalEvt) {
      if (!this.checkFormValidity()) {
        bvModalEvt.preventDefault();
        return;
      }
      let bodyFormData = new FormData();
      bodyFormData.append("code", this.code);
      bodyFormData.append("name", this.name);
      this.$store.dispatch("addModelDevice", bodyFormData);
    },
    handleDelete(data) {
      let result = confirm("Are you sure ?");
      if (result) {
        this.$store.dispatch("delModelDevice", data);
      }
    }
  }
};
</script>
<style>
.table {
  margin-top: 40px;
  margin-left: 142px;
  width: 980px;
}
.button {
  margin-left: 180px;
  margin-top: 20px;
}
.head {
  display: flex;
}
.head h1 {
  margin-left: 200px;
}
</style>
