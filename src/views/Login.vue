<template>
  <div>
    <div class="top"></div>
    <div class="main">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>
          Login successfully,after {{ dismissCountDown }} sec you will go to the
          homepage...
        </p>
        <b-progress
          variant="success"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
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
        type="password"
        placeholder="password"
        v-model="pass"
        @keyup="nowarn()"
      />
      <button class="submit" @click="submit()">Login</button>
      <div class="foot">
        <router-link to="/register"
          ><p>Don't have account,register now!</p></router-link
        >
        <router-link to="/forgot"><p>Forget password</p></router-link>
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
      if (!this.pass || !this.name) {
        this.warn = true;
      } else {
        let bodyFormData = new FormData();
        bodyFormData.append("username", this.name);
        bodyFormData.append("password", this.pass);
        axios
          .post("http://localhost:4000/login", bodyFormData)
          .then(res => {
            document.cookie = `${res.data}`;
            this.fail = false;
            this.dismissCountDown = this.dismissSecs;
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          })
          .catch(e => {
            if (
              e
                .toString()
                .startsWith("Error: Request failed with status code 400")
            ) {
              this.success = false;
              this.fail = "username or password invalid";
            } else {
              this.success = false;
              this.fail = "this account are logged in";
            }
          });
      }
    },
    nowarn() {
      this.warn = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  data() {
    return {
      name: "",
      pass: "",
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
  background-color: #fddb3a;
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
  background-color: #fddb3a;
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
  background: #fddb3a;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
