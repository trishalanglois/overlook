import $ from 'jquery';
import './css/base.scss';
import TapeChart from './TapeChart';
import Guest from './Guest';
import Manager from './Manager';


let tapechart;
let today = new Date();
let guestId;
let allGuests;

var date = JSON.stringify(today.getFullYear()+'/'+(today.getMonth()+1)+'/'+ JSON.stringify(today.getDate()).padStart(2, 0));


//FETCHES
let roomsDataFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
.then(response => response.json());
let bookingsDataFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
.then(response => response.json());
let guestsDataFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json());


let tapechartData = {roomsData: [], bookingsData: []};
Promise.all([roomsDataFetch, bookingsDataFetch, guestsDataFetch])
  .then(data => {
    tapechartData.roomsData = data[0].rooms;
    tapechartData.bookingsData = data[1].bookings;
    allGuests = data[2];
    return tapechartData;
  })
  .then(tapechartData => {
    console.log('this', tapechartData.roomsData, tapechartData.bookingsData);
    console.log('guests', allGuests);
    tapechart = new TapeChart(tapechartData.roomsData, tapechartData.bookingsData, date);
    populateManagerPage(date);
  })

//LOGIN PAGE
$('#login-button').on('click', () => {
  let username = $('.username').val();
  // console.log(guestId);
  if (username === 'manager' && $('.password').val() === 'overlook2019') {
    window.location = './manager-page.html'
  } else if (username.includes('customer') && $('.password').val() === 'overlook2019') {
    let usernameSplit = username.split('r');
    // debugger;
    let guestId = usernameSplit[1];
    localStorage.setItem('guestId', guestId);
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

//MANAGER PAGE
function populateManagerPage(date) {
  $('#manager-available-rooms').text(tapechart.findAllAvailableRooms(date).length);
  $('#manager-revenue').text('$' + tapechart.calculateDailyRevenue(date));
  $('#manager-occupied-rooms').text(tapechart.findPercentAvailableRooms() + '%');

}
