import $ from 'jquery';
import './css/base.scss';
import TapeChart from './TapeChart';
import Guest from './Guest';
import Manager from './Manager';


let tapechart;
let today = new Date();
let guest;
let guestId;
let guestName;
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
    console.log('rooms, bookings', tapechartData.roomsData, tapechartData.bookingsData);
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
})

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
function populateGuestPage(tapechart) {
  let parsedId = JSON.parse(localStorage.getItem('guestId'))
  let guestData = allGuests.users.find(guest => {
    return guest.id === parsedId;
  });
  guest = new Guest(guestData.id, guestData.name, tapechart);
  $('.guest-name').text(guest.firstName);
  showReservationsOnDOM();
  $('#guest-amount-spent').append('$' + guest.calculateAmountSpent());
}

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
}

let newDate;

$('#date-button').on('click', () => {
  createDate();
  tapechart = new TapeChart(tapechartData.roomsData, tapechartData.bookingsData, newDate);
  $('#guest-available-rooms').empty();
  showRooms(tapechart);
});

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
}

$('.room-options-button').click(() => {
  $('.room-menu-container').slideToggle();
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
})

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
    .catch(err => console.log(err));
})

function createDate() {
  let hyphenDate = $('#date-input').val()
  newDate = hyphenDate.replace(/-/g, "/");
};

$('.find-guest-button').click(() => {
  let guestId = $('.manager-guest-id-input').val();
  if (1 <= guestId && guestId <= 50) {
    localStorage.setItem('guestId', guestId);
    window.location = './guest-page.html';
    populateGuestPage(tapechart);
  } else {
    showLoginError();
  }
});

$('.delete-reservation-button-container').show();

$('.delete-booking-button').click(() => {
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
})
