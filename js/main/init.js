// MAIN LOADING

function onLoad() {
    var title = document.title;
    switch (title) {
        case "AoE2 Game Querry":
            state = StateEnum.index;
            break;
        case "Explore Civilizations":
            state = StateEnum.civs;
            break;
        case "Explore Structures":
            state = StateEnum.structs;
            break;
        case "Explore Technologies":
            state = StateEnum.techs;
            break;
        case "Explore Units":
            state = StateEnum.units;
            break;
        default:
            state = StateEnum.error;
            break;
    }
    if (state == StateEnum.error) {
        alert("Error: could not infer state from the page.");
    } else {
        initState();
    }
}


// ENTITY LOADING

function loadBase(where, what, then, errOutElem) {
    var data = localStorage.getItem(what);
    if (data == null || data == undefined) {
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/" + where,
            type:"GET",
            dataType: "text",
            success: function(data) {
                localStorage.setItem(what, data);
                then(JSON.parse(data));
            },
            failure: function () {
                $(errOutElem).append("<h2>ERROR: Flaiend to get civilizations.</h2>");
            }
        });
    } else {
        then(JSON.parse(data));
    }
}
function loadCivs(then, errOutElem) {
    loadBase(
        "https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations",
        "civs", then, errOutElem
    );
}
function loadStructs(then, errOutElem) {
    loadBase(
        "https://age-of-empires-2-api.herokuapp.com/api/v1/structures",
        "structs", then, errOutElem
    );
}
function loadTechs(then, errOutElem) {
    loadBase(
        "https://age-of-empires-2-api.herokuapp.com/api/v1/technologies",
        "techs", then, errOutElem
    );
}
function loadUnits(then, errOutElem) {
    loadBase(
        "https://age-of-empires-2-api.herokuapp.com/api/v1/units",
        "units", then, errOutElem
    );
}


// INIT

function initState() {
    switch(state) {
        case StateEnum.index:
            favoriteState = new FavoriteState(
                document.getElementById("favorite_content")
            );
            loadCivs(function(civs) {
                loadStructs(function(structs) {
                    loadTechs(function(techs) {
                        loadUnits(function(units) {
                            showFavs(civs, structs, techs, units);
                        });
                    });
                });
            });
            break;
        default:
            exploreState = new ExploreState(
                document.getElementById("search_input"),
                document.getElementById("search_content")
            );
            switch(state) {
                case StateEnum.civs:
                    loadCivs(function(data) {
                        exploreState.data = data;

                        var list = localStorage.getItem("favCivs");
                        if (list != null && list != undefined) {
                            list = list.split(',').map(Number);
                            exploreState.fav = list;
                        } else exploreState.fav = [].map(Number);

                        searchCivs();
                    }, exploreState.output);
                    break;
                case StateEnum.structs:
                    loadStructs(function(data) {
                        exploreState.data = data;

                        var list = localStorage.getItem("favStructs");
                        if (list != null && list != undefined) {
                            list = list.split(',').map(Number);
                            exploreState.fav = list;
                        } else exploreState.fav = [].map(Number);

                        searchStructs();
                    }, exploreState.output);
                    break;
                case StateEnum.techs:
                    loadTechs(function(data) {
                        exploreState.data = data;

                        var list = localStorage.getItem("favTechs");
                        if (list != null && list != undefined) {
                            list = list.split(',').map(Number);
                            exploreState.fav = list;
                        } else exploreState.fav = [].map(Number);

                        searchTechs();
                    }, exploreState.output);
                    break;
                case StateEnum.units:
                    loadUnits(function(data) {
                        exploreState.data = data;

                        var list = localStorage.getItem("favUnits");
                        if (list != null && list != undefined) {
                            list = list.split(',').map(Number);
                            exploreState.fav = list;
                        } else exploreState.fav = [].map(Number);

                        searchUnits();
                    }, exploreState.output);
                    break;
                default:
                    break;
            }
            break;
    }
}