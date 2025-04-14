
// We are ensuring that only one object from the class is created and used everywhere. 
// It is not possible to do new Manager() outside the class because of the private constructor
// Look at the get instance method to get an idea. 

export class Manager {
  static myName = '';
  static age = 0;
  private static instance: Manager;

  private constructor() {}

  static getInstance() {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = new Manager();
    return Manager.instance;
  }

  static clearGame = () => {
    this.myName = '';
    this.age = 0;
  };

  changeMyDetails(name: string, age: number) {
    Manager.myName = name;
    Manager.age = age;
  }
}

console.log(Manager.age, Manager.myName)
const obj = Manager.getInstance()
obj.changeMyDetails("Karthik", 21)
console.log(Manager.age, Manager.myName)
