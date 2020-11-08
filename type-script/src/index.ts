import * as _ from "loadsh";

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return _.join()
    }
}

let greeter = new Greeter("world");

alert(greeter.greet());