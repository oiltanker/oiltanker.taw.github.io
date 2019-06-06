var FavAction = Object.freeze({"add":0, "remove":1});
class FavoriteEvent {
    static addHandler(handler/*callback(type: BaseType, action: FavAction, entry: Object)*/) {
        FavoriteEvent.eventHandlers.push(handler);
    }
    static removeHandler(handler) {
        let pos = FavoriteEvent.eventHandlers.indexOf(handler);
        if (pos != -1) FavoriteEvent.eventHandlers.splice(pos, 1);
    }
}
FavoriteEvent.eventHandlers = [];

function loadFav(what) {
    var list = localStorage.getItem("fav" + what);
    if (list != null && list != undefined) {
        list = list.split(',').map(Number);
    } else list = [].map(Number);
    return list;
}

function toggleFav(id) {
    var list = null, what = null;
    var type = null, action = null, entry = null;
    switch (state) {
        case StateEnum.civs:
            what = "favCivs";
            type = BaseType.civs;
            entry = exploreState.data.civilizations[id];
            break;
        case StateEnum.structs:
            what = "favStructs";
            type = BaseType.structs;
            entry = exploreState.data.structures[id];
            break;
        case StateEnum.techs:
            what = "favTechs";
            type = BaseType.techs;
            entry = exploreState.data.technologies[id];
            break;
        case StateEnum.units:
            what = "favUnits";
            type = BaseType.units;
            entry = exploreState.data.units[id];
            break;
        default:
            alert("Error: Non-explore must not call 'addToFav' function.")
            return;
    }
    list = localStorage.getItem(what);
    if (list == null || list == undefined) list = [].map(Number);
    else list = list.split(',').map(Number);

    var elem = document.getElementById("_e" + id);
    if ((list.length == 0) || (list.indexOf(id) == -1)) {
        console.log("Adding");
        list.push(id);
        elem.setAttribute("value", "-");
        action = FavAction.add;
    } else {
        console.log("Removing");
        list.splice(list.indexOf(id), 1);
        elem.setAttribute("value", "+");
        action = FavAction.remove;
    }

    if (list.length > 0) localStorage.setItem(what, list.toString());
    else localStorage.removeItem(what);

    for(let i = 0; i < FavoriteEvent.eventHandlers.length; i++)
        FavoriteEvent.eventHandlers[i](type, action, entry);
}