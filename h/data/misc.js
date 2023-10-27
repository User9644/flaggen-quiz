toNextValue = function(operation, value, values){
    if(operation=="decrease"){
        let i = value;
        while(true){
            if(values.indexOf(i)!=-1){
                return i;
            }
            i--;
        }
    }
    if(operation=="increase"){
        let i = value;
        while(true){
            if(values.indexOf(i)!=-1){
                return i;
            }
            i++;
        }
    }
}

/*class randomFromArray {
    constructor(array) {
        this.array = array;
    }
    getRandom(){
        let random = Math.floor(Math.random() * this.array.length);
        let value = this.array[random];
        this.array.splice(random, 1);
        return value;
    }
}*/
