// 定义一个函数，将给定的秒数转换为时分秒的格式
function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  
  // 如果小时，分钟或秒数少于10，前面补0
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return hours + ":" + minutes + ":" + seconds;
}


// 使用 jQuery UI 的 Spinner widget 创建滚轮选择器
$(function() {
  $("#hours").spinner({
      min: 0
  });
  $("#minutes").spinner({
      min: 0,
      max: 59
  });
  $("#seconds").spinner({
      min: 0,
      max: 59
  });
});

// 添加新的倒计时器的函数
function addTimer(name, time) {
  // 创建倒计时器的名称，使用时长作为前缀
  var timerName = formatTime(time);
  if (name != "") {
      timerName += ": " + name;
  }

  // 创建新的倒计时器
  var timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.innerHTML = "<div class='timer-name'>" + timerName + "</div>" + formatTime(time);
  document.getElementById('timers').appendChild(timerElement);

  // 开始倒计时
  var timer = setInterval(function() {
      time--;

      // 更新倒计时器的显示
      timerElement.innerHTML = "<div class='timer-name'>" + timerName + "</div>" + formatTime(time);

      // 倒计时结束
      if (time <= 0) {
          clearInterval(timer);
          timerElement.innerHTML = "<div class='timer-name'>" + timerName + "</div>" + 'Time is up!';

          // 播放声音
          var audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
          audio.play();
      }
  }, 1000);
}

document.getElementById('timer-form').addEventListener('submit', function(event) {
  // 阻止表单的默认提交行为
  event.preventDefault();

  // 获取用户输入的时间
  var name = document.getElementById('name').value;
  var hours = document.getElementById('hours').value;
  var minutes = document.getElementById('minutes').value;
  var seconds = document.getElementById('seconds').value;

  // 将时间转换为总秒数
  var time = hours * 3600 + minutes * 60 + seconds * 1;

  addTimer(name, time);
});

// 对预设的倒计时按钮添加点击事件
var presetTimers = document.getElementsByClassName('preset-timer');
for (var i = 0; i < presetTimers.length; i++) {
  presetTimers[i].addEventListener('click', function(event) {
      var time = event.target.getAttribute('data-time');
      addTimer("", time);
  });
}

