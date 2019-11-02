class TapeChart {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
  }
  findAllAvailableRooms(date) {
    return this.rooms.reduce((availableRooms, room) => {
      let todaysBookings = this.bookings.filter(booking => {
        return booking.date === date;
      });
      if (!todaysBookings.some(booking => booking.roomNumber === room.number)) {
        availableRooms.push(room)
      }
      return availableRooms
    }, []);
  }
  calculateTotalRevenue() {

  }
  findPercentAvailableRooms() {
    //use value of findAvailableRooms to calculate percent
  }
  filterAvailableRooms() {
    //set up with property as parameter to make dynamic to filter by specific property that the user is looking for
    //findAllAvailableRooms.filter
  }
}

export default TapeChart;
