// $Id$

function GetXMLHttp() {
    var xmlhttp = false;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    }
    else if (window.ActiveXObject) { // code for IE
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (E) {
                xmlhttp=false
            }
        }
    }
    return xmlhttp;
}

function changeNavHover(whereTo) {
    // Reset navOn class on the nav bar
    for(i=0; i < document.getElementById("navbar").getElementsByTagName("li").length; i++) {
        document.getElementById("navbar").getElementsByTagName("li")[i].className = "";
    }
    document.getElementById(whereTo).className = "navhome";
}

function getpage(page,id) {
    changeNavHover(id);
    var currentTime = new Date();
    var hh = currentTime.getHours();
    var mm = currentTime.getMinutes();
    var xmlRequest = GetXMLHttp();
    xmlRequest.open('GET', "?q="+page+".html&k="+hh+mm );
    xmlRequest.onreadystatechange = function() {
        if ( xmlRequest.readyState == 4 && xmlRequest.status == 200 ) {

            var leftScript = '(?:<leftcolumn.*?>)((\n|.)*?)(?:</leftcolumn.*?>)';
            var left = xmlRequest.responseText.match(leftScript);
            document.getElementById( 'leftcolumn' ).innerHTML = left[1];

            var rightScript = '(?:<contentcolumn.*?>)((\n|.)*?)(?:</contentcolumn.*?>)';
            var right = xmlRequest.responseText.match(rightScript);
            document.getElementById( 'contentwrapper' ).innerHTML = right[1];

        }
    }
    xmlRequest.send(null);
}

function confirmSubmit(f) {
    return confirm("Are you sure ?");
}
