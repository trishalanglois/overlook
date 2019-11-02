import $ from 'jquery';
import './css/base.scss';

let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(json => json.rooms)
  .catch(error => console.log(error));
let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(json => json.bookings)
  .catch(error => console.log(error));
let tapechart;

$('#login-button').on('click', () => {
  tapechart = new TapeChart(roomsData, bookingsData);

  let username = $('.username').val();
  if (username === 'manager' && $('.password').val() === 'overlook2019') {
    window.location = './staff-page.html'
  } else if (username.includes('customer') && $('.password').val() === 'overlook2019') {
    window.location = './guest-page.html'
  } else {
    showLoginError();
  }
})

$('.nav-to-login').click(function(){
  $('#main-input').slideToggle();
});

function showLoginError() {
  $('.error-message').show();
}
