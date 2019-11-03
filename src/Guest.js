class Guest {
  constructor(id, name, tapechart) {
    this.id = id;
    this.name = name;
    this.firstName = this.findFirstName();
    this.bookings = this.findBookings(tapechart);
    this.rooms = this.findRooms(tapechart);
  }

  bookRoom(givenDate, roomNumber) {
    this.bookings.push({
      date: givenDate,
      id: Date.now(),
      roomNumber: roomNumber,
      roomServiceCharges: [],
      userID: this.id  
    })
  }

  findFirstName() {
    let splitName = this.name.split(' ');
    return splitName[0];
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
    let stringAmount = this.rooms.reduce((totalSpent, room) => {
      totalSpent += room.costPerNight;
      return totalSpent
    }, 0).toFixed(2);
    return parseFloat(stringAmount);
  }
}

export default Guest;
