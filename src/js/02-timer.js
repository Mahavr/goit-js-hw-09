import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const startBtn = document.querySelector('button[data-start]');
const timerForm = document.querySelector('.timer');

startBtn.disabled = true;
let ms = 0;
let changeTimer = null;
let selectedTime = new Date(Date.now());
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      //   window.alert('Please choose a date in the future');
      Report.failure('Error', 'Please choose a date in the future', 'Okay');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
startBtn.addEventListener('click', event => {
  changeTimer = setInterval(() => {
    if (selectedTime <= new Date()) {
      clearInterval(changeTimer);
      Loading.remove();
    } else {
      const { days, hours, minutes, seconds } = convertMs(
        selectedTime - new Date()
      );
      timerForm.querySelector('[data-days]').textContent = addLeadingZero(days);
      timerForm.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      timerForm.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      timerForm.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
      Loading.pulse({
        svgColor: '#800080',
        backgroundColor: 'rgba(124, 97, 149, 0.85)',
      });

      Loading.change(
        addLeadingZero(days) +
          ':' +
          addLeadingZero(hours) +
          ':' +
          addLeadingZero(minutes) +
          ':' +
          addLeadingZero(seconds)
      );
    }
  }, 1000);
});
flatpickr('#datetime-picker', options);
