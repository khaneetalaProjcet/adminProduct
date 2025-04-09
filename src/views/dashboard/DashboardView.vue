<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="welcome-text">به پنل مدیریتی خانه طلا خوش آمدید</h2>
        </v-col>
        <v-col cols="12" md="4">
          <div class="dash-box">
            <p class="title">وظایف امروز</p>
            <p class="text">0 تسک مهم برای امروز دارید</p>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="dash-box">
            <p class="title">وظایف گذشته</p>
            <p class="text">0 تسک مهم دارید که زمان انجام آن گذشته است</p>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="dash-box">
            <p class="title">پیام مدیریت</p>
            <p class="text">0 پیام نخوانده از طرف مدیر دارید</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

</script>

<style scoped>
.dash-box {
  padding: 1rem 0.5rem;
  border-radius: 10px;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: rgba(221, 196, 113, 0.1);
}

.dash-box .title {
  font-size: 18px;
  font-weight: bold;
}

.dash-box .text {
  
}


.welcome-text {
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  margin: 2rem 0;
}
</style>
