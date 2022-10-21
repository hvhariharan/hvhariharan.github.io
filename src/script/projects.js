const AllGalleries = document.getElementsByClassName("projects-gallery");

for (let j = 0; j < AllGalleries.length; j++) {

const projectList = document.getElementsByClassName("projects-gallery")[j].children;                
    
    for (let i = 0; i < projectList.length; i++) {

        var proj_link = ( projectList[i].getAttribute("href") );

        //projectList[i].onClick(window.open(proj_link, "_self"));

        fetch(proj_link).then(r=>r.text()).then((html)=>{ // get the content of products.html
            
            let element = document.createElement("html");
            element.innerHTML = html; // parse the html
            
            let p1 = element.querySelector("#showcase-img").children[0].src;
            let h1 = element.querySelector("header").children[0].innerHTML.toString();

            const gh = document.getElementsByClassName("projects-gallery")[0].children[0];
            
            const att1 = document.createAttribute("style");
            const att2 = document.createAttribute("proj-title");
            
            att1.value = '--proj-bg' + ': url(' + p1 + ');';
            att2.value = h1;
            
            projectList[i].setAttributeNode(att1);
            projectList[i].setAttributeNode(att2);
        });
        
    };
    
};