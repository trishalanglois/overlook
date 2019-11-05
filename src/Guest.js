class Guest {
  constructor(id, name, tapechart) {
    this.id = id;
    this.name = name;
    this.firstName = this.findFirstName();
    this.bookings = this.findBookings(tapechart);
    this.rooms = this.findMyRooms(tapechart);
  }

  bookRoom(givenDate, roomNumber) {
    this.bookings.push({
      userID: this.id,
      date: givenDate,
      roomNumber: parseInt(roomNumber)
    })
  }

  findFirstName() {
    let splitName = this.name.split(' ');
    return splitName[0];
  }

  findBookings(tapechart) {
    return tapechart.bookings.filter(booking =>
      booking.userID === this.id)
  }

  findMyRooms(tapechart) {
    return this.bookings.map(booking => {
      return tapechart.rooms.find(room => {
        return room.number === parseInt(booking.roomNumber);
      })
    }).filter(room => room)
  }

  calculateAmountSpent() {
    let stringAmount = this.rooms.reduce((totalSpent, room) => {
      totalSpent += room.costPerNight;
      return totalSpent
    }, 0).toFixed(2);
    return parseFloat(stringAmount);
  }

  filterAvailableRooms(tapechart, roomType) {
    return tapechart.todaysAvailableRooms.filter(room => {
      return room.roomType === roomType
    })
  }
}

export default Guest;
