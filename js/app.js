var broserch = function(){ //브라우저 체크
    var word;
    var version = "N/A";
    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower )
    if ( name == "Microsoft Internet Explorer" ) word = "msie ";

    else {
        // IE 11
        if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

        // IE 12  ( Microsoft Edge )
        else if ( agent.search("edge/") > -1 ) word = "edge/";
    }

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
    if (  reg.exec( agent ) != null  )
        version = RegExp.$1 + RegExp.$2;

    return version;
};
if(broserch() == "9.0" || broserch() == "8.0" || broserch() == "7.0" || broserch() == "6.0" || broserch() == "5.0"){
    alert("You are using an older browser. Please use the latest browser.");
    window.open('','_self').close();
}

var text = "", pt = 0;
var url = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
function event(){ //event
    $(document)
    .on("mouseenter", ".side-menu-list>li", function(e){ //sidemenu list hover
        $(".active").removeClass("active");
        $(this).find("ul").addClass("active");
    })
    .on("mouseleave", ".side-menu-list>li", function(e){ //sidemenu list mouseout
        $(this).find("ul").removeClass("active");
    })
    .on("scroll", function(){ //scroll function
        scroll();
    })
    .on("mouseenter", ".side-menu-list>li>ul>li", function(){ //sidemenu list in menu hover
        $(this).css({"background":"#3aabdc"});
        $(this).find("a").css({"color":"#fff"});
    })
    .on("mouseleave", ".side-menu-list>li>ul>li", function(){ //sidemenu list in menu mouseout
        $(this).css({"background":"none"});
        $(this).find("a").css({"color":"#000"});
    })
    .on("mouseenter", ".aboutus-li li", function(e){ //sidemenu list in menu click
        if(url.indexOf("aboutus.html") != -1){ //this page is aboutus.html
            e.preventDefault();
            var ts = $(this).index();
            $("html, body").animate({scrollTop : $("section").eq(ts).offset().top}, 400);
        }
        text = $(this).text();
        localStorage.setItem("mainST", text);
    })
}

function scroll(){ //sidemenu scroll event
    var h = $("aside .side-bg-box img").height();
    var dh = $(document).height();
    var wh = $(window).height();
    var st = $(document).scrollTop();
    var top = ((h-wh)*st)/(dh-wh);
    $("aside .side-bg-box img").css({"top": -top+"px"});
}

$(document).ready(function(){
    if(url == "index.html")
        localStorage.setItem("mainST", "Mission and Vision");
    if(url == "aboutus.html"){
        text = localStorage.getItem("mainST")=="" ? 0 : localStorage.getItem("mainST");
        switch(text){
            case "Mission and Vision":
                pt = $("#philosophy").offset().top;
                break;
            case "Five Educational Goals":
                pt = $("#five_goals").offset().top;
                break;
            case "DEGITECH Talents":
                pt = $("#digi_talents").offset().top;
                break;
            case "School Facilities":
                pt = $("#facilities").offset().top;
                break;
            case "History and Founding orders":
                pt = $("#history").offset().top;
                break;
            case "Contact Us":
                pt = $("#contact_us").offset().top;
                break;
        }
        $(document).scrollTop(pt);
        localStorage.setItem("mainST", "Mission and Vision");
    }else if(url == ""){
        location.href = "/index.html";
    }
    event();
    scroll();
});
// window.onload = function(){
    
// }