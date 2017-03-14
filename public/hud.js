var health;
var stamina;
var score; 

function createHud(){
	health = document.createElement("PROGRESS");
    health.setAttribute("value", "100");
    health.setAttribute("max", "100");

    health.style.left = 0;
    health.style.up = 0; 
    health.style.position = "fixed";

    stamina = document.createElement("CODE");
  
  	stamina.style.left = 0;
  	stamina.style.up = 0; 
    
    stamina.style.position = "fixed";

    document.body.appendChild(health);
    document.body.appendChild(stamina);



  


}	

function drawHud(){
	
	stamina.innerHTML = "Your health: " + health.value;

}

function getHealth(){

	return health.value;
}
