var StateEnum = Object.freeze({"error":0, "index":1, "civs":2, "structs":3, "techs":4, "units":5});
var BaseType = Object.freeze({"civs":0, "structs":1, "techs":2, "units":3});
class ExploreState {
    constructor(input, output) {
        this.data = null;
        this.fav = null;
        this.input = input;
        this.output = output;
    }
}
class FavoriteState {
    constructor(output) {
        this.data = null;
        this.output = output;
    }
}