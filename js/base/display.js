function showFavs(civs, structs, techs, units) {
    var output = favoriteState.output;
    var favCivs = loadFav("Civs");
    var favStructs = loadFav("Structs");
    var favTechs = loadFav("Techs");
    var favUnits = loadFav("Units");

    $(output).append("<hr/>");
    $(output).append("<h2>Civilizations</h2>");
    favCivs.forEach(i => {
        $.each(civs.civilizations, function(key, val) {
            if (val.id == i) $(output).append(parseCiv(val));
        });
    });

    $(output).append("<hr/>");
    $(output).append("<h2>Structures</h2>");
    favStructs.forEach(i => {
        $.each(structs.structures, function(key, val) {
            if (val.id == i) $(output).append(parseStruct(val));
        });
    });

    $(output).append("<hr/>");
    $(output).append("<h2>Technologies</h2>");
    favTechs.forEach(i => {
        $.each(techs.technologies, function(key, val) {
            if (val.id == i) $(output).append(parseTech(val));
        });
    });

    $(output).append("<hr/>");
    $(output).append("<h2>Units</h2>");
    favUnits.forEach(i => {
        $.each(units.units, function(key, val) {
            if (val.id == i) $(output).append(parseUnit(val));
        });
    });
}

function searchBase(type, what) {
    var input = exploreState.input.value.toLowerCase();
    var data = exploreState.data;
    $(exploreState.output).empty();
    if (input == "") {
        $.each(data[what], function(key, val) {
            var elem = parseBase(type, val);
            $(exploreState.output).append(elem);
        });
    } else {
        var poses = [];
        var fits = [];
        $.each(data[what], function(key, val) {
            var pos = glueBase(type, val).indexOf(input);
            if (pos != -1) {
                poses.push(pos);
                fits.push(parseBase(type, val));
            }
        });
        const len = poses.length;
        for (let i = 0; i < len; i++) {
            console.log(poses);
            var minPos = Math.min.apply(Math, poses);
            var minI = poses.indexOf(minPos);
            console.log(minPos);
            console.log(minI);
            $(exploreState.output).append(fits[minI]);
            poses.splice(minI, 1);
            fits.splice(minI, 1);
        }
    }
}
function searchCivs() {
    searchBase(BaseType.civs, "civilizations");
}
function searchStructs() {
    searchBase(BaseType.structs, "structures");
}
function searchTechs() {
    searchBase(BaseType.techs, "technologies");
}
function searchUnits() {
    searchBase(BaseType.units, "units");
}