class TapeChart {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
  }
  findAllAvailableRooms(date) {
    //iterate through bookings
    return this.bookings.filter(booking => {
      // console.log('log', this.bookings);
      // console.log(date);
      booking.date === date;
    })
    //find all bookings for today's date (filter)
    //iterate through today's bookings
    //for each booking, remove from the rooms array
    //return what's left of the rooms array
    //return array so can use return value for filterAvailableRooms
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
