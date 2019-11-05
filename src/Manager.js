import Guest from '../src/Guest';

class Manager extends Guest {
  constructor(id, name, tapechart) {
    super(id, name, tapechart);

  }
  deleteBooking() {

  }
}

//create method to set guest.id (or this.id?) and guest.name (or this.name?), then can run all the same guest's properties by using that id

export default Manager;
