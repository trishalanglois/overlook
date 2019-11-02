const chai = require('chai');
const expect = chai.expect;

import TapeChart from '../src/TapeChart';

let tapechart;
let date = '2019/11/12';

let bookingsData = [
  {
    date: "2019/11/06",
    id: 1572293130156,
    roomNumber: 18,
    roomServiceCharges: [],
    userID: 19,
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
    userID: 21
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
    number: 2,
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
    number: 4,
    roomType: "single room"
  }
];

beforeEach(() => {
  tapechart = new TapeChart(roomsData, bookingsData, date);
});

describe('TapeChart', () => {

  it('should be a function', () => {
    expect(TapeChart).to.be.a('function');
  });

  it('should be an instance of TapeChart', () => {
    expect(tapechart).to.be.an.instanceOf(TapeChart);
  });

  it('should have a method that finds available rooms for a given date', () => {
    expect(tapechart.findAllAvailableRooms(date)).to.deep.equal([{ bedSize: "full", bidet: false, costPerNight: 477.38, numBeds: 2, number: 2, roomType: "suite" }, { bedSize: "king", bidet: false, costPerNight: 491.14, numBeds: 1, number: 3, roomType: "single room" }, { bedSize: "queen", bidet: false, costPerNight: 429.44, numBeds: 1, number: 4, roomType: "single room" }])
  });

  it('should have a method that calculates total revenue for a given date', () => {
    expect(tapechart.calculateDailyRevenue(date)).to.equal(1756.36);
  });

  it('should have a method that calculates the percent of rooms booked for a given date', () => {
    expect(tapechart.findPercentAvailableRooms(date)).to.equal(50);
  });

  it('should have a method that finds available rooms')
});
