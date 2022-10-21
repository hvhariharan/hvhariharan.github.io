function appendJS(JSfile, target) {
    const targetElement = document.getElementsByTagName(target)[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //script.async = true;
    script.src = JSfile;
    targetElement.appendChild(script);
};

function appendHTML(HTMLfile, target) {
    $.get(HTMLfile, function(data){
        $(target).append(data);
    });
};

function appendCSS(CSSfile, target) {
    linkString = "<link href=" + CSSfile + " type='text/css' rel='stylesheet' />";
    $(target).append(linkString);
};

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
};

function appendSelfCSS(target) {
    var selfCSSpath = ('/src/style/').concat((window.location.pathname.split("/").pop().split(".")[0]).concat('.css'));
    if (UrlExists(selfCSSpath)) {
        appendCSS(selfCSSpath, target);
    };
};