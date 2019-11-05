import Guest from '../src/Guest';

class Manager extends Guest {
  constructor(id, name, tapechart) {
    super(id, name, tapechart);
      this.id = id;
      this.name = name;
      this.tapechart = tapechart;
  }
  deleteBooking(id, tapechart) {

  }
}

export default Manager;
