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
        Page Schema Management
      </h1>
    </div>
    <b-container fluid>
      <b-table
        :items="is_pageschema"
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
            @click="handleUpdate(row.item.page, row.item.key, row.item.label)"
          >
            Update
          </b-button>
          <b-button
            size="sm"
            @click="handleDelete(row.item.key)"
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
      title="Create Page Schema"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Page"
          label-for="name-input"
          invalid-feedback="Page is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input2"
            v-model="page"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Key"
          label-for="name-input"
          invalid-feedback="Key is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="key"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Label"
          label-for="name-input"
          invalid-feedback="Label is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="label"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <b-form-group label="Sortable" label-for="name-input6">
        <b-form-select v-model="sortable" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Selected" label-for="name-input6">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>
    </b-modal>
    <b-modal
      id="modal-edit-prevent-closing"
      ref="modal-update"
      title="Update Model Device"
      @ok="Update"
    >
      <form ref="form">
        <b-form-group label="Page" label-for="name-input">
          <b-form-input
            id="name-input6"
            v-model="page"
            :placeholder="this.page_update"
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form">
        <b-form-group label="Key" label-for="name-input1">
          <b-form-input
            id="name-input5"
            v-model="key"
            :placeholder="this.key_update"
          ></b-form-input>
        </b-form-group>
      </form>
      <form ref="form">
        <b-form-group label="Label" label-for="name-input2">
          <b-form-input
            id="name-input6"
            v-model="label"
            :placeholder="this.label_update"
          ></b-form-input>
        </b-form-group>
      </form>
      <b-form-group label="Sortable" label-for="name-input3">
        <b-form-select v-model="sortable" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Selected" label-for="name-input4">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      page: "",
      key: "",
      label: "",
      sortable: false,
      selected: false,
      nameState: null,
      page_update: "",
      key_update: "",
      label_update: "",
      options: [
        { value: true, text: "true" },
        { value: false, text: "false" }
      ],
      fields: [
        {
          key: "page",
          label: "Page"
        },

        {
          key: "key",
          label: "Key"
        },
        {
          key: "label",
          label: "Label"
        },
        {
          key: "sortable",
          label: "Sortable"
        },
        {
          key: "selected",
          label: "Selected"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  computed: { ...mapState(["pageschema"]), ...mapGetters(["is_pageschema"]) },
  created() {
    this.$store.dispatch("loadPageSchema");
  },

  methods: {
    Update() {
      let data = new FormData();
      data.append("page", this.page);
      data.append("key", this.key);
      data.append("label", this.label);
      data.append("sortable", this.sortable);
      data.append("key", this.selected);
      this.$store.dispatch("updatePageSchema", {
        id: this.key_update,
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
      this.page = "";
      this.key = "";
      this.label = "";
      this.sortable = "";
      this.selected = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      this.handleSubmit(bvModalEvt);
    },
    handleUpdate(page, key, label) {
      this.$refs["modal-update"].show();
      this.page_update = page;
      this.key_update = key;
      this.label_update = label;
    },
    handleSubmit(bvModalEvt) {
      if (!this.checkFormValidity()) {
        bvModalEvt.preventDefault();
        return;
      }
      let bodyFormData = new FormData();
      bodyFormData.append("page", this.page);
      bodyFormData.append("key", this.key);
      bodyFormData.append("label", this.label);
      bodyFormData.append("sortable", false);
      bodyFormData.append("key", false);
      this.$store.dispatch("addPageSchema", bodyFormData);
    },
    handleDelete(data) {
      let result = confirm("Are you sure ?");
      if (result) {
        this.$store.dispatch("delPageSchema", data);
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
