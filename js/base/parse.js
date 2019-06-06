// COMMON

function parseUrlRef(url) {
    var pos = url.lastIndexOf('/');
    var name = url.substring(pos + 1).replace(/_/g, ' ');
    name = name.charAt(0).toUpperCase() + name.substring(1);
    return name;
}


// GLUE FUNCTIONS

function glueBase(type, json) {
    switch (type) {
        case BaseType.civs:
            return glueCiv(json);
        case BaseType.structs:
            return glueStruct(json);
        case BaseType.techs:
            return glueTech(json);
        case BaseType.units:
            return glueUnit(json);
    }
}
function glueCiv(civJson) {
    var str = "";
    str += civJson.name + "\n";
    str += civJson.army_type + "\n";
    str += civJson.team_bonus + "\n";
    $.each(civJson.civilization_bonus, function(key, val) {
        str += val + "\n";
    });
    str += civJson.expansion + "\n";
    $.each(civJson.unique_unit, function(key, val) {
        str += parseUrlRef(val.toString()) + "\n";
    });
    $.each(civJson.unique_tech, function(key, val) {
        str += parseUrlRef(val.toString()) + "\n";
    });
    return str.toLowerCase();
}
function glueUnit(unitJson) {
    var str = "";
    str += unitJson.name + "\n";
    str += unitJson.description + "\n";
    str += parseUrlRef(unitJson.created_in.toString()) + "\n";
    str += unitJson.age + "\n";
    $.each(unitJson.cost, function(key, val) {
        str += val + " " + key;
    });
    str += unitJson.expansion + "\n";
    return str.toLowerCase();
}
function glueStruct(structJson) {
    var str = "";
    str += structJson.name + "\n";
    str += structJson.age + "\n";
    $.each(structJson.special, function(key, val) {
        str += val + "\n";
    });
    $.each(structJson.cost, function(key, val) {
        str += val + " " + key;
    });
    str += structJson.expansion + "\n";
    return str.toLowerCase();
}
function glueTech(techJson) {
    var str = "";
    str += techJson.name + "\n";
    str += techJson.description + "\n";
    str += techJson.age + "\n";
    str += parseUrlRef(techJson.develops_in.toString()) + "\n";
    $.each(techJson.applies_to, function(key, val) {
        str += parseUrlRef(val.toString()) + "\n";
    });
    $.each(techJson.cost, function(key, val) {
        str += val + " " + key;
    });
    str += techJson.expansion + "\n";
    return str.toLowerCase();
}


// PARSE FUNCTIONS

function parseBase(type, json) {
    switch (type) {
        case BaseType.civs:
            return parseCiv(json);
        case BaseType.structs:
            return parseStruct(json);
        case BaseType.techs:
            return parseTech(json);
        case BaseType.units:
            return parseUnit(json);
    }
}
function parseCiv(civJson) {
    var elem = "";

    var favVal = null;
    if (exploreState != null) {
        if ((exploreState.fav.length > 0) && (exploreState.fav.indexOf(civJson.id) != -1)) favVal = '-';
        else favVal = '+';
    }

    elem += "\n<div class=\"entry\">";
    elem += "\n  <h2>" + civJson.name + "</h2>";
    if (favVal != null) {
        elem += "\n  <input class=\"entry_fav_btn\" type=\"button\" value=\"" + favVal + "\"";
        elem += "onclick=\"toggleFav(" + civJson.id + ")\" id=\"_e" + civJson.id + "\"/>\n";
    }
    elem += "\n  <table class=\"enty_data_table\">";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Expansion:</td>";
    elem += "\n      <td>" + civJson.expansion + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Army composition:</td>";
    elem += "\n      <td>" + civJson.army_type + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Unique unit:</td>";
    elem += "\n      <td>"
    $.each(civJson.unique_unit, function(key, val) {
        elem += "\n        <p>" + parseUrlRef(val.toString()) + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Unique tech:</td>";
    elem += "\n      <td>"
    $.each(civJson.unique_tech, function(key, val) {
        elem += "\n        <p>" + parseUrlRef(val.toString()) + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Team bonus:</td>";
    elem += "\n      <td>" + civJson.team_bonus + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Civilization bonus:</td>";
    elem += "\n      <td>"
    $.each(civJson.civilization_bonus, function(key, val) {
        elem += "\n        <p>" + val + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n  </table>";
    elem += "\n</div>";

    return elem;
}
function parseUnit(unitJson) {
    var elem = "";

    var favVal;
    if (exploreState != null) {
        if ((exploreState.fav.length > 0) && (exploreState.fav.indexOf(unitJson.id) != -1)) favVal = '-';
        else favVal = '+';
    }

    elem += "\n<div class=\"entry\">";
    elem += "\n  <h2>" + unitJson.name + "</h2>";
    if (favVal != null) {
        elem += "\n  <input class=\"entry_fav_btn\" type=\"button\" value=\"" + favVal + "\"";
        elem += "onclick=\"toggleFav(" + unitJson.id + ")\" id=\"_e" + unitJson.id + "\"/>\n";
    }
    elem += "\n  <table class=\"enty_data_table\">";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Description:</td>";
    elem += "\n      <td>" + unitJson.description + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Expansion:</td>";
    elem += "\n      <td>" + unitJson.expansion + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Age:</td>";
    elem += "\n      <td>" + unitJson.age + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Created in:</td>";
    elem += "\n      <td>" + parseUrlRef(unitJson.created_in.toString()) + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Cost:</td>";
    elem += "\n      <td>"
    $.each(unitJson.cost, function(key, val) {
        elem += "\n        <p>"+ val + " " + key + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n  </table>";
    elem += "\n</div>";

    return elem;
}
function parseStruct(structJson) {
    var elem = "";

    var favVal;
    if (exploreState != null) {
        if ((exploreState.fav.length > 0) && (exploreState.fav.indexOf(structJson.id) != -1)) favVal = '-';
        else favVal = '+';
    }

    elem += "\n<div class=\"entry\">";
    elem += "\n  <h2>" + structJson.name + "</h2>";
    if (favVal != null) {
        elem += "\n  <input class=\"entry_fav_btn\" type=\"button\" value=\"" + favVal + "\"";
        elem += "onclick=\"toggleFav(" + structJson.id + ")\" id=\"_e" + structJson.id + "\"/>\n";
    }
    elem += "\n  <table class=\"enty_data_table\">";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Expansion:</td>";
    elem += "\n      <td>" + structJson.expansion + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Age:</td>";
    elem += "\n      <td>" + structJson.age + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Cost:</td>";
    elem += "\n      <td>"
    $.each(structJson.cost, function(key, val) {
        elem += "\n        <p>"+ val + " " + key + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Special:</td>";
    elem += "\n      <td>"
    $.each(structJson.special, function(key, val) {
        elem += "\n        <p>" + val + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n  </table>";
    elem += "\n</div>";

    return elem;
}
function parseTech(techJson) {
    var elem = "";

    var favVal;
    if (exploreState != null) {
        if ((exploreState.fav.length > 0) && (exploreState.fav.indexOf(techJson.id) != -1)) favVal = '-';
        else favVal = '+';
    }

    elem += "\n<div class=\"entry\">";
    elem += "\n  <h2>" + techJson.name + "</h2>";
    if (favVal != null) {
        elem += "\n  <input class=\"entry_fav_btn\" type=\"button\" value=\"" + favVal + "\"";
        elem += "onclick=\"toggleFav(" + techJson.id + ")\" id=\"_e" + techJson.id + "\"/>\n";
    }
    elem += "\n  <table class=\"enty_data_table\">";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Description:</td>";
    elem += "\n      <td>" + techJson.description + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Expansion:</td>";
    elem += "\n      <td>" + techJson.expansion + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Age:</td>";
    elem += "\n      <td>" + techJson.age + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Develops in:</td>";
    elem += "\n      <td>" + parseUrlRef(techJson.develops_in.toString()) + "</td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Cost:</td>";
    elem += "\n      <td>"
    $.each(techJson.cost, function(key, val) {
        elem += "\n        <p>"+ val + " " + key + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n    <tr>";
    elem += "\n      <td class=\"enty_label\">Applies to:</td>";
    elem += "\n      <td>"
    $.each(techJson.applies_to, function(key, val) {
        elem += "\n        <p>" + parseUrlRef(val.toString()) + "</p>";
    });
    elem += "\n      </td>";
    elem += "\n    </tr>";
    elem += "\n  </table>";
    elem += "\n</div>";

    return elem;
}