import Guest from '../src/Guest';

class Manager extends Guest {
  constructor(id, name, tapechart) {
    super(id, name, tapechart);
      this.id = id;
      this.name = name;
      this.tapechart = tapechart;
  }
  deleteBooking() {
    let bookingId = parseInt(event.target.dataset.bookingid);
    console.log(bookingId);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: bookingId
      })
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
}

export default Manager;
