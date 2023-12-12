import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const form = document.querySelector('.form');

let position = 1;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    const delayTimer = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
function onSubmit(evt) {
  evt.preventDefault();
  const firstDelay = parseInt(form.elements.delay.value);
  const delayStep = parseInt(form.elements.step.value);
  const promiseAmount = form.elements.amount.value;
  let delay = firstDelay;
  if ((firstDelay < 0 || delayStep) < 0 || promiseAmount < 1) {
    Report.failure('Try again🐱‍👤', 'All numbers must be positive', 'Okay');
  } else {
    for (let i = 1; i <= promiseAmount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Виконана обіцянка ${position} за ${delay}мс`, {
            success: {
              background: '#78a5a3',
              textColor: '#444c5c',
              notiflixIconColor:'#444c5c',
            },
          });
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Відхилена обіцянка ${position} за ${delay}мс`, {
            failure: {
              background: '#ce5a57',
              textColor: '#444c5c',
              notiflixIconColor:'#444c5c',
            },
          });
        });
      delay += delayStep;
      position++;
    }
  }
}
