class TapeChart {
  constructor(fetchedHotelData) {
    console.log(fetchedHotelData);
    this.bookings = fetchedHotelData.bookingsData;
    this.rooms = fetchedHotelData.roomsData;
    console.log(this.bookings, this.rooms);
  }
  findAllAvailableRooms() {
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
