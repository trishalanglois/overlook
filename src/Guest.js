class Guest {
  //need to instantiate user via fetch
  constructor(id, name, tapechart) {
    this.id = id;
    this.name = name;
    this.bookings = this.findBookings(tapechart);
    this.rooms = this.findRooms(tapechart);
    // this.spending?
  }

  bookRoom() {

  }

  findBookings(tapechart) {
    this.bookings = tapechart.bookings.filter(booking =>
      booking.userID === this.id)
    return this.bookings;
  }

  findRooms(tapechart) {
    return this.bookings.map(booking => {
      return tapechart.rooms.find(room => {
        return room.number === booking.roomNumber;
      })
    })
  }
  
  calculateAmountSpent() {

  }
}

export default Guest;
