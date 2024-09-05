<template>
    {{ formater }}
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
  // 组件间传递值
  const props = defineProps({
    second: {
      type: Number,
      default: 0,
    },
    format: {
      type: String,
      default: "MM-dd hh:mm",
    },
    sformat: {
      type: String,
      default: "hh:mm:ss",
    },
    suffix: {
      type: String,
      default: "",
    },
  });
  const emit = defineEmits(["counterOver"]);
  // 倒计时显示
  const formater = ref("");
  
  onMounted(() => {
    // 传入时间戳
    formater.value = TIME_FORMAT(props.second);
  });
  // 倒计时逻辑处理
  const TIME_FORMAT = (ts) => {
    let res;
  
    const showtime = () => {
      if (ts <= 0) {
        // 倒计时结束 清空计时器
        clearInterval(run);
        emit("counterOver");
        return TIME_SFORMAT(0, props.sformat, props.suffix);
      }
      // 传入时间，时间格式 suffix？
      res = TIME_SFORMAT(ts, props.sformat, props.suffix );
      return res;
    };
    const run = setInterval(() => {
      ts -= 1000;
      res = showtime();
      formater.value = res;
    }, 1000);
    return showtime();
  };
  // 时间格式 小于10秒前面加0
  const TIME_FORMIN = (param) => {
    if (param < 0) {
      param = 0;
    }
    if (param < 10) {
      param = "0" + param;
    }
    return param;
  };
  // sfmt: "hh:mm:ss",
  const TIME_SFORMAT = (ts, sfmt, suffix) => {
    const time = {
      "h+": TIME_FORMIN(Math.floor((ts / 1000 / 60 / 60) % 24)),
      "m+": TIME_FORMIN(Math.floor((ts / 1000 / 60) % 60)),
      "s+": TIME_FORMIN(Math.floor((ts / 1000) % 60)),
    };
    for (let k in time) {
      // 使用正则表达式测试检查该键是否与sfmt字符串的任何部分匹配。如果找到匹配项，它会将匹配的部分替换为对象中格式化的时间值time。
      if (new RegExp("(" + k + ")").test(sfmt)) {
        sfmt = sfmt.replace(
          // 匹配的正则表达式中第一个捕获组的内容replace 如果时间是一位数字 需要在前面补0
          // substr(("" + time[k]).length)子字符串的起始索引由原始时间值的字符串表示的长度决定
          // 与正则表达式匹配的第一个子匹配字符串，以括号为标志
          RegExp.$1,
          RegExp.$1.length == 1
            ? time[k]
            : ("00" + time[k]).substr(("" + time[k]).length)
        );
      }
    }
    return sfmt + suffix;
  };
  </script>
  
  <style></style>
  