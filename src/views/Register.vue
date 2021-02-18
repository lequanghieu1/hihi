<template>
  <div>
    <div class="top"></div>
    <div class="main">
      <div class="alert alert-success alert-dismissible" v-if="success">
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
        Vui lòng nhập đầy đủ thông tin
      </div>
      <input
        type="text"
        placeholder="username"
        v-model="name"
        @keyup="nowarn()"
      />
      <input
        type="text"
        placeholder="fullname"
        v-model="fullname"
        @keyup="nowarn()"
      />
      <input
        type="password"
        placeholder="password"
        v-model="pass"
        @keyup="nowarn()"
      />
      <input
        type="password"
        placeholder="repeat password"
        v-model="repass"
        @keyup="nowarn()"
      />
      <button class="submit" @click="submit()">Register</button>
      <div class="foot">
        <router-link to="/"><p>Exits account ? login now !</p></router-link>
      </div>
    </div>
    <div class="bot"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  methods: {
    submit() {
      if (!this.pass || !this.name || !this.repass || !this.fullname) {
        this.warn = true;
      } else if (this.pass != this.repass) {
        this.fail = "repeat your password fail";
      } else {
        let bodyFormData = new FormData();
        bodyFormData.append("username", this.name);
        bodyFormData.append("password", this.pass);
        bodyFormData.append("email", "lequanghieufdbd@gmail.com");
        bodyFormData.append("fullname", this.fullname);
        axios
          .post("http://localhost:4000/register", bodyFormData)
          .then(res => {
            this.success = true;
            this.fail = false;
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          })
          .catch(e => {
            this.success = false;
            this.fail = "An error occurred, please re-enter";
          });
      }
    },
    nowarn() {
      this.warn = false;
    }
  },
  data() {
    return {
      name: "",
      pass: "",
      repass: "",
      fullname: "",
      success: false,
      fail: "",
      warn: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  }
};
</script>

<style scoped>
.top {
  height: 120px;
  width: 100%;
  background-color: #78fd3a;
  position: relative;
  margin-top: -60px;
}
.foot {
  width: 400px;
  display: flex;
  justify-content: space-between;
}
.bot {
  height: 100px;
  width: 100%;
  background-color: #78fd3a;
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
  background: #78fd3a;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
