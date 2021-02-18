<template>
  <div>
    <div class="top"></div>
    <div class="main">
      <div class="alert alert-success alert-dismissible" v-if="done">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        Successful registration, please login now...
      </div>
      <div class="alert alert-danger alert-dismissible" v-if="fail">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        {{ this.fail }}
      </div>
      <div class="alert alert-warning alert-dismissible" v-if="warn">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        {{ success ? "Please fill the otp" : "Please fill the email" }}
      </div>

      <b-form-input
        required
        placeholder="email"
        v-if="!success"
        v-model="email"
        :state="validationEmail"
        @keyup="nowarn()"
      ></b-form-input>
      <b-form-invalid-feedback :state="validationEmail" class="err">
        email invalid
      </b-form-invalid-feedback>
      <input
        type="text"
        placeholder="OTP"
        v-if="success && !reset"
        v-model="otp"
        @keyup="nowarn()"
      />
      <input
        type="password"
        placeholder="password"
        v-if="reset"
        v-model="passw"
        @keyup="nowarn()"
      />
      <input
        type="password"
        placeholder="repeat pass"
        v-if="reset"
        v-model="repassw"
        @keyup="nowarn()"
      />
      <button class="submit" @click="submit()">
        {{ !success ? "Send me OTP" : "Submit" }}
      </button>
      <div class="foot">
        <router-link to="/login"><p>Login now</p></router-link>
      </div>
    </div>
    <div class="bot"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  computed: {
    validationEmail() {
      if (!this.email) {
        return null;
      }
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.email
      );
    }
  },
  methods: {
    submit() {
      if (!this.success) {
        if (!this.email) {
          this.warn = true;
        } else {
          if (this.validationEmail) {
            let bodyFormData = new FormData();
            bodyFormData.append("email", this.email);
            axios
              .post("http://localhost:4000/forget-pass", bodyFormData)
              .then(res => {
                this.success = true;
                this.fail = false;
                this.sub_otp = res.data;
                this.sub_otp = this.sub_otp / 369;
              })
              .catch(e => {
                this.success = false;
                this.fail = "Your email don't match any user";
              });
          }
        }
      } else if (this.success && !this.reset) {
        if (!this.otp) {
          this.warn = true;
        }
        if (this.otp != this.sub_otp) {
          this.fail = "OTP is invalid";
        } else {
          this.fail = false;
          this.reset = true;
        }
      } else {
        if (!this.passw || !this.repassw) {
          return (this.warn = true);
        }
        if (this.passw !== this.repassw) {
          return (this.fail = "password and re-pass not match");
        }
        let DataPass = new FormData();
        DataPass.append("email", this.email);
        DataPass.append("password", this.passw);
        axios
          .post("http://localhost:4000/update-pass", DataPass)
          .then(res => {
            this.fail = false;
            this.done = true;
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          })
          .catch(e => {});
      }
    },
    nowarn() {
      this.warn = false;
    }
  },
  data() {
    return {
      email: "",
      passw: "",
      repassw: "",
      otp: "",
      sub_otp: "",
      success: false,
      fail: "",
      warn: false,
      reset: false,
      done: false
    };
  }
};
</script>

<style scoped>
.top {
  height: 120px;
  width: 100%;
  background-color: #3abffd;
  position: relative;
  margin-top: -60px;
}
.err {
  margin-left: 10px;
  text-align: center;
  margin: -11px 0px 0px -305px;
}
.foot {
  width: 400px;
  display: flex;
  justify-content: space-between;
}
.bot {
  height: 100px;
  width: 100%;
  background-color: #3abffd;
  margin-top: 520px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 540px;
  position: absolute;
  background-color: #e5e5e5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  margin: -13px 5%;
}
input {
  width: 385px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #e0d7d7;
  padding-left: 20px;
  margin-bottom: 10px;
}
.forget-pass {
  margin-left: 142px;
  margin-top: 0px;
  color: #5a5757;
  font-family: DM Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
}
.submit {
  width: 405px;
  height: 55px;
  padding: 10px;
  background: #3abffd;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
