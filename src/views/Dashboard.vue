<template>
    <p>hihihihi</p>
</template>
<script>
import axios from "axios";
export default {
    created(){
            axios
      .get("http://localhost:8080/hello/hieu")
      .then(res => (this.items = res.data))
      .catch(e => this.errors.push(e));
    }
}
</script>
<style>
p{
    margin-left: 1000px;
}
</style>