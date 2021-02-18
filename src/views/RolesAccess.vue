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
        Roles-Access Management
      </h1>
    </div>
    <b-container fluid>
      <b-table
        :items="is_rolesaccess"
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
            @click="handleUpdate(row.item.id_extra, row.item.name_model)"
          >
            Update
          </b-button>
          <b-button
            size="sm"
            @click="handleDelete(row.item.id_extra)"
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
      title="Create Event Code"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="ID user"
          label-for="name-input"
          invalid-feedback="ID user is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="id_extra"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name Model"
          label-for="name-input"
          invalid-feedback="Name Model is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input2"
            v-model="name_model"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <b-form-group label="Read" label-for="name-input6">
        <b-form-select v-model="read" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Add" label-for="name-input6">
        <b-form-select v-model="add" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Update" label-for="name-input6">
        <b-form-select v-model="update" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Delete" label-for="name-input6">
        <b-form-select v-model="del" :options="options"></b-form-select>
      </b-form-group>
    </b-modal>
    <b-modal
      id="modal-edit-prevent-closing"
      ref="modal-update"
      title="Update Roles Access"
      @ok="Update"
    >
      <form ref="form">
        <b-form-group label="ID User" label-for="name-input6">
          <b-form-input
            id="name-input6"
            v-model="id_extra"
            :placeholder="this.id_extra_update.toString()"
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form">
        <b-form-group label="Name Model" label-for="name-input">
          <b-form-input
            id="name-input5"
            v-model="name_model"
            :placeholder="this.name_model_update.toString()"
          ></b-form-input>
        </b-form-group>
      </form>
      <b-form-group label="Read" label-for="name-input3">
        <b-form-select v-model="read" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Add" label-for="name-input4">
        <b-form-select v-model="add" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Update" label-for="name-input3">
        <b-form-select v-model="update" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Delete" label-for="name-input4">
        <b-form-select v-model="del" :options="options"></b-form-select>
      </b-form-group>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      name_model: "",
      id_extra: "",
      add: "",
      read: "",
      del: "",
      update: "",
      nameState: null,
      name_model_update: "",
      id_extra_update: "",
      options: [
        { value: "true", text: "true" },
        { value: "false", text: "false" }
      ],
      fields: [
        {
          key: "id_extra",
          label: "ID User"
        },
        {
          key: "name_model",
          label: "Name Model"
        },
        {
          key: "read",
          label: "Read"
        },
        {
          key: "add",
          label: "Add"
        },

        {
          key: "update",
          label: "Update"
        },
        {
          key: "delete",
          label: "Delete"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  computed: { ...mapState(["rolesaccess"]), ...mapGetters(["is_rolesaccess"]) },
  created() {
    this.$store.dispatch("loadRolesAccess");
  },

  methods: {
    Update() {
      let data = new FormData();
      data.append("id_extra", this.id_extra);
      data.append("name_model", this.name_model);
      data.append("add", this.add);
      data.append("read", this.read);
      data.append("update", this.update);
      data.append("delete", this.del);
      this.$store.dispatch("updateRolesAccess", {
        id: this.id_extra_update,
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
      this.name = "";
      this.code = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      this.handleSubmit(bvModalEvt);
    },
    handleUpdate(id_extra, name_model) {
      this.$refs["modal-update"].show();
      this.id_extra_update = id_extra;
      this.name_model_update = name_model;
    },
    handleSubmit(bvModalEvt) {
      if (!this.checkFormValidity()) {
        bvModalEvt.preventDefault();
        return;
      }
      let bodyFormData = new FormData();
      bodyFormData.append("id_extra", this.id_extra);
      bodyFormData.append("name_model", this.name_model);
      bodyFormData.append("add", this.add);
      bodyFormData.append("read", this.read);
      bodyFormData.append("update", this.update);
      bodyFormData.append("delete", this.del);
      this.$store.dispatch("addRolesAccess", bodyFormData);
    },
    handleDelete(data) {
      let result = confirm("Are you sure ?");
      if (result) {
        this.$store.dispatch("delRolesAccess", data);
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
