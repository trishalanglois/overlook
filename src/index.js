import $ from 'jquery';
import './css/base.scss';
import TapeChart from './TapeChart';
import Guest from './Guest';
import Manager from './Manager';

let allGuests;
let guest;
let guestId;
let guestName;
let manager;
let newDate;
let tapechart;
let today = new Date();
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
    tapechart = new TapeChart(tapechartData.roomsData, tapechartData.bookingsData, date);
    populateManagerPage(date);
    populateGuestPage(tapechart);
  })

//LOGIN PAGE
$('#login-button').on('click', () => {
  let username = $('.username').val();
  if (username === 'manager' && $('.password').val() === 'overlook2019') {
    window.location = './manager-page.html'
  } else if (username.includes('customer') && $('.password').val() === 'overlook2019') {
    let usernameSplit = username.split('r');
    let guestId = usernameSplit[1];
    localStorage.setItem('guestId', guestId);
    window.location = './guest-page.html'
  } else {
    showLoginError();
  }
});

$('.nav-to-login').click(() => {
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

//GUEST PAGE
$('body').on('click', '.cancel-room-btn', () => {
  manager.deleteBooking();
});

$('body').on('click', '.book-room-btn', (tapechart) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: guest.id,
      date: newDate,
      roomNumber: parseInt(event.target.dataset.roomnumber),
    })
  })
  .then(response => response.json())
  .then(alert('We look forward to seeing you soon.'))
});

$('#date-button').on('click', () => {
  createDate();
  tapechart = new TapeChart(tapechartData.roomsData, tapechartData.bookingsData, newDate);
  $('#guest-available-rooms').empty();
  showRooms(tapechart);
});

$('.delete-booking-button').click(() => {
    guest.findUpcomingBookings(date);
    guest.upcomingBookings.forEach(booking => {
      $('#guest-available-rooms').append(
      `<section class='rooms'>
      <div class='booking-room-container'>
      <b>DATE</b>: ${booking.date}
      <br>
      <b>ROOM NUMBER</b>: ${booking.roomNumber}
      <br>
      </div>
      <button class='cancel-room-btn' data-bookingid='${booking.id}'>CANCEL RESERVATION</button>
      <br>
      </section>`)
    })
});

$('.filter-button').click(() => {
  let roomType = $('.room-options').val();
  guest.filterAvailableRooms(tapechart, roomType).forEach(room => {
    if (!room) {
      $('#guest-available-rooms').text('Our deepest apologies. There are no rooms that match your specifications.')
    } else {
    $('#guest-available-rooms').html(
      `<section class='rooms'>
      <div class='booking-room-container'>
      <b>ROOM TYPE</b>: ${room.roomType}
      <br>
      <b>BED SIZE</b>: ${room.bedSize}
      <br>
      <b>COST:</b> $${room.costPerNight}
      <br>
      <b>ROOM NUMBER:</b>${room.number}</span>
      </div>
      <button class='book-room-btn' data-roomnumber='${room.number}'>BOOK ROOM</button>
      <br>
      </section>`)
    }
  })
});

$('.find-guest-button').click(() => {
  let guestId = $('.manager-guest-id-input').val();
  if (1 <= guestId && guestId <= 50) {
    localStorage.setItem('guestId', guestId);
    localStorage.setItem('managerControl', true);
    window.location = './guest-page.html';
  } else {
    showLoginError();
  }
});

$('.room-options-button').click(() => {
  $('.room-menu-container').slideToggle();
});

function createDate() {
  let hyphenDate = $('#date-input').val()
  newDate = hyphenDate.replace(/-/g, "/");
};

function populateGuestPage(tapechart) {
  let parsedId = JSON.parse(localStorage.getItem('guestId'))
  let guestData = allGuests.users.find(guest => {
    return guest.id === parsedId;
  });
  guest = new Guest(guestData.id, guestData.name, tapechart);
  manager = new Manager(guestData.id, guestData.name, tapechart);
  $('.guest-name').text(guest.firstName);
  showReservationsOnDOM();
  $('#guest-amount-spent').append('$' + guest.calculateAmountSpent());
  if(localStorage.getItem('managerControl')) {
    $('.delete-reservation-button-container').removeClass('hide');
    localStorage.removeItem('managerControl');
  }
};

function showRooms(tapechart) {
  tapechart.todaysAvailableRooms.forEach(room => {
    if (!room) {
      $('#guest-available-rooms').text('Our deepest apologies. There are no rooms that match your specifications.')
    } else {
    $('#guest-available-rooms').append(
      `<section class='rooms'>
      <div class='booking-room-container'>
      <b>ROOM TYPE</b>: ${room.roomType}
      <br>
      <b>BED SIZE</b>: ${room.bedSize}
      <br>
      <b>COST:</b> $${room.costPerNight}
      <br>
      <b>ROOM NUMBER:</b> ${room.number}
      </div>
      <button class='book-room-btn' data-roomnumber='${room.number}'>BOOK ROOM</button>
      <br>
      </section>`)
    }
  })
};

function showReservationsOnDOM() {
  guest.rooms.forEach(room => {
    $('#guest-reservations').append(
    `<b>ROOM TYPE</b>: ${room.roomType}
    <br>
    <b>BED SIZE</b>: ${room.bedSize}
    <br>
    <b>REWARD POINTS</b>: ${room.costPerNight}
    <br>
    ---------
    <br>`
    )
  })
};
