class TapeChart {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.todaysBookings = this.findTodaysBookings(date);
  }

  findTodaysBookings(date) {
    return this.bookings.filter(booking => {
      return booking.date === date;
    });
  }
  findAllAvailableRooms(date) {
    return this.rooms.reduce((availableRooms, room) => {
      if (!this.todaysBookings.some(booking => booking.roomNumber === room.number)) {
        availableRooms.push(room)
      }
      return availableRooms
    }, []);
  }
  calculateDailyRevenue(date) {
    let stringRevenue = this.rooms.reduce((dailyRevenue, room) => {
      dailyRevenue += room.costPerNight;
      return dailyRevenue;
    }, 0).toFixed(2);
    return parseFloat(stringRevenue);
  }
  findPercentAvailableRooms() {
    let decimalPercent = this.todaysBookings.length / this.rooms.length;
    return Math.round(decimalPercent * 100);
  }
  filterAvailableRooms() {
    //set up with property as parameter to make dynamic to filter by specific property that the user is looking for
    //findAllAvailableRooms.filter
  }
}

export default TapeChart;
