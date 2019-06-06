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

function getEntryById(state, data, id) {
    var entries;
    switch (state) {
        case StateEnum.civs:
            entries = data.civilizations;
            break;
        case StateEnum.structs:
            entries = data.structures;
            break;
        case StateEnum.techs:
            entries = data.technologies;
            break;
        case StateEnum.units:
            entries = data.units;
            break;
        default:
            alert("Error: Non-explore must not call 'addToFav' function.")
            return;
    }
    for(let i = 0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
    return null;
}

function toggleFav(id) {
    var list = null, what = null;
    var type = null, action = null;
    var entry = getEntryById(state, exploreState.data, id);

    switch (state) {
        case StateEnum.civs:
            what = "favCivs";
            type = BaseType.civs;
            break;
        case StateEnum.structs:
            what = "favStructs";
            type = BaseType.structs;
            break;
        case StateEnum.techs:
            what = "favTechs";
            type = BaseType.techs;
            break;
        case StateEnum.units:
            what = "favUnits";
            type = BaseType.units;
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
        list.push(id);
        elem.setAttribute("value", "-");
        action = FavAction.add;
    } else {
        list.splice(list.indexOf(id), 1);
        elem.setAttribute("value", "+");
        action = FavAction.remove;
    }

    if (list.length > 0) localStorage.setItem(what, list.toString());
    else localStorage.removeItem(what);

    for(let i = 0; i < FavoriteEvent.eventHandlers.length; i++)
        FavoriteEvent.eventHandlers[i](type, action, entry);
}