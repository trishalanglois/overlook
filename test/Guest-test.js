import chai from 'chai';
const expect = chai.expect;

import Guest from '../src/Guest';
import TapeChart from '../src/TapeChart'

let tapechart, guest;
let date = '2019/11/12';

let bookingsData = [
  {
    date: "2019/11/06",
    id: 1572293130156,
    roomNumber: 18,
    roomServiceCharges: [],
    userID: 33,
  },
  {
    date: "2019/11/12",
    id: 1572293130159,
    roomNumber: 8,
    roomServiceCharges: [],
    userID: 21
  },
  {
    date: "2019/11/12",
    id: 1572293130159,
    roomNumber: 1,
    roomServiceCharges: [],
    userID: 33
  },
  {
    date: "2019/10/29",
    id: 1572293130159,
    roomNumber: 10,
    roomServiceCharges: [],
    userID: 12
  },
];

let roomsData = [
  {
    bedSize: "queen",
    bidet: true,
    costPerNight: 358.4,
    numBeds: 1,
    number: 1,
    roomType: "residential suite"
  },
  {
    bedSize: "full",
    bidet: false,
    costPerNight: 477.38,
    numBeds: 2,
    number: 18,
    roomType: "suite"
  },
  {
    bedSize: "king",
    bidet: false,
    costPerNight: 491.14,
    numBeds: 1,
    number: 3,
    roomType: "single room"
  },
  {
    bedSize: "queen",
    bidet: false,
    costPerNight: 429.44,
    numBeds: 1,
    number: 8,
    roomType: "single room"
  }
];

beforeEach(() => {
  tapechart = new TapeChart(roomsData, bookingsData, date);
  guest = new Guest(33, 'John Adams', tapechart);
});

describe('Guest', () => {

  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  });

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
  });

  it('should find bookings for guest', () => {
    expect(guest.bookings).to.deep.equal([{ date: "2019/11/06", id: 1572293130156, roomNumber: 18, roomServiceCharges: [], userID: 33 }, { date: "2019/11/12", id: 1572293130159, roomNumber: 1, roomServiceCharges: [], userID: 33 }])
  });

  it('should find specific rooms from bookings for guest', () => {
    expect(guest.rooms).to.deep.equal([{ bedSize: "full", bidet: false, costPerNight: 477.38, numBeds: 2, number: 18, roomType: "suite" }, { bedSize: "queen", bidet: true, costPerNight: 358.4, numBeds: 1, number: 1, roomType: "residential suite" }])
  });

  it('should have a method that calculates the total amount spent', () => {
    expect(guest.calculateAmountSpent()).to.equal(835.78);
  });

  it('should have a method to book a new room', () => {
    guest.bookRoom('2019/11/21', 8);
    expect(guest.bookings).to.deep.equal([{ date: "2019/11/06", id: 1572293130156, roomNumber: 18, roomServiceCharges: [], userID: 33 }, { date: "2019/11/12", id: 1572293130159, roomNumber: 1, roomServiceCharges: [], userID: 33 }, {userID: 33, date: "2019/11/21", roomNumber: 8}]);
  })
});
