// patrick 2021/09

// just help 
var info = document.getElementById("information")

function blocMove(evt) {
    var i="Position dans l'écran : (screenX, screenY) = ";
    i+="("+evt.screenX+", "+evt.screenY+")<br />";
    i+="Position dans la page : (clientX, clientY) = ";
    i+="("+evt.clientX+", "+evt.clientY+")<br />";
    i+="Position dans le bloc : (offsetX, offsetY) = ";
    i+="("+evt.offsetX+", "+evt.offsetY+")<br />";
    i+="Déplacement depuis mousemove : (movementX, movementY) = ";
    i+="("+evt.movementX+", "+evt.movementY+")";
    info.innerHTML=i;
}
document.addEventListener("mousemove",blocMove)

function afficheRGB(number){
    var redValue = parseInt(document.getElementById("raquette_Red"+number).style.marginLeft); // recup margeleft
    var greenValue = parseInt(document.getElementById("raquette_Green"+number).style.marginLeft); // recup margeleft
    var blueValue = parseInt(document.getElementById("raquette_Blue"+number).style.marginLeft); // recup margeleft
    var textValue = "rgb("+redValue+","+ greenValue+","+ blueValue+")"
    console.log(textValue);
    // TODO reste a faire une regle de 3 par rapport a largeur bloc parent pour avoir des valeurs entre 0 et 255

    document.getElementById("resultColor"+number).style.backgroundColor = textValue;
    document.getElementById("resultColor"+number).innerText = textValue;
    document.getElementById("raquette_Red"+number).innerText = redValue;
    document.getElementById("raquette_Green"+number).innerText = greenValue;
    document.getElementById("raquette_Blue"+number).innerText = blueValue;
}


// class raquette  
//raquette can move in X direction in his window width (bloc do not has specified width) with mouse down in the raquette
// move can continu if mouse is still down an outside the raquette
// not work if at the beginning raquette is not inside the bloc
// raquette color change when move is active
// not work if parent has border, need improvement
// some bugs if user clic on the text inside raquette, need improvement
class Raquette {
    constructor(element,name,number){
        element.setAttribute("data-activeMove","nottomove"); // attribut needed to initiate value
        element.style.margin = "0px";  // needed to initialize value
        var largeurBlocParent = element.parentNode.offsetWidth;   // recup largeur bloc parent
        var colorOrigin = element.style.backgroundColor; // store originecolor of element
        element.addEventListener('mousedown',function(evt){
            element.style.backgroundColor = "yellow";
            this.setAttribute("data-activeMove","tomove");
        })
        document.addEventListener('mouseup',function(evt){
            element.setAttribute("data-activeMove","nottomove");
            element.style.backgroundColor = colorOrigin
            afficheRGB()          
        })
        element.addEventListener('mouseenter',function(evt){ // not used
        })
        element.addEventListener('mouseleave',function(evt){ // not used
        })
        document.addEventListener('mousemove',function(evt){
            if (element.getAttribute("data-activeMove") == "tomove"){
                var margeLeftText = element.style.marginLeft;
                var margeLeftInt = parseInt(margeLeftText);
                margeLeftInt = margeLeftInt + evt.movementX;
                if (margeLeftInt < 0){         // case to not go outside bloc left
                    margeLeftInt = 0;
                    element.style.marginLeft = margeLeftInt+"px";
                } else if ((margeLeftInt+element.getBoundingClientRect().width) >  largeurBlocParent){  // case to not go outside bloc right
                    margeLeftInt = largeurBlocParent - element.getBoundingClientRect().width;
                    element.style.marginLeft = margeLeftInt+"px";
                } else {
                    element.style.marginLeft = margeLeftInt+"px";
                }
                afficheRGB(number)
            } else {
                // console.log(name +" ne pas deplacer");
            }
        })
    }
}

// raquette creation
raquette_1 = new Raquette(document.getElementById("raquette_Red1"),document.getElementById("raquette_Red1").id,1);
raquette_2 = new Raquette(document.getElementById("raquette_Green1"),document.getElementById("raquette_Green1").id,1);
raquette_3 = new Raquette(document.getElementById("raquette_Blue1"),document.getElementById("raquette_Blue1").id,1);

raquette_5 = new Raquette(document.getElementById("raquette_Red2"),document.getElementById("raquette_Red2").id,2);
raquette_6 = new Raquette(document.getElementById("raquette_Green2"),document.getElementById("raquette_Green2").id,2);
raquette_7 = new Raquette(document.getElementById("raquette_Blue2"),document.getElementById("raquette_Blue2").id,2);

raquette_8 = new Raquette(document.getElementById("raquette_Red3"),document.getElementById("raquette_Red3").id,3);
raquette_9 = new Raquette(document.getElementById("raquette_Green3"),document.getElementById("raquette_Green3").id,3);
raquette_10 = new Raquette(document.getElementById("raquette_Blue3"),document.getElementById("raquette_Blue3").id,3);


// console.log(document.querySelector("#raquette_1").style);
// document.querySelector("#raquette_1").style.margin = "0px";
// console.log(document.getElementById("raquette_1").getBoundingClientRect().width) ;








