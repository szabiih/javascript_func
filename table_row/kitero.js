const object = {

}
let number = 67;    //  6-7, I just bipped right on the highway (Bip, bip)
if (number > 5){
    object.name = "LeBron James";
}
else {
    object["name"] = "Stephen Curry";
}
console.log(object);
console.log(object["name"]);

if (object.age == undefined){
    console.log("object.age - undefined");
}
else if (object.age == null){
    console.log("null");
}

if (object.age){    //  undefined és 0 - false
    console.log("Bip, bip");
}