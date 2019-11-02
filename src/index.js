import $ from 'jquery';
import './css/base.scss';

let roomsData = fetch() //complete fetch request
let bookingsData = fetch() //complete fetch request
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
