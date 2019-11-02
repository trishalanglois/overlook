import $ from 'jquery';
import './css/base.scss';
import TapeChart from './TapeChart';
import Guest from './Guest';
import Manager from './Manager';

let tapechart;

let roomsDataFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
.then(response => response.json());

let bookingsDataFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
.then(response => response.json());

let tapechartData = {roomsData: [], bookingsData: []};

Promise.all([roomsDataFetch, bookingsDataFetch])
  .then(data => {
    tapechartData.roomsData = data[0].rooms;
    tapechartData.bookingsData = data[1].bookings;
    return tapechartData;
  })
  .then(tapechartData => {
    console.log(tapechartData);
    return tapechart = new TapeChart(tapechartData);
  })

$('#login-button').on('click', () => {

  let username = $('.username').val();
  if (username === 'manager' && $('.password').val() === 'overlook2019') {
    window.location = './manager-page.html'
  } else if (username.includes('customer') && $('.password').val() === 'overlook2019') {
    window.location = './guest-page.html'
  } else {
    showLoginError();
  }
  console.log(tapechart);
})



$('.nav-to-login').click(function(){
  $('#main-input').slideToggle();
});

function showLoginError() {
  $('.error-message').show();
}
