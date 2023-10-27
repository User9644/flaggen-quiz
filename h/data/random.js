class random{
    static int = function(min, max){
        let _random = Math.random() * (max + 1 - min);
        return Math.floor(_random) + min;
    }

    static str = function(count, useUpperCase, use){
        const strs = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        let start = use ? 0 : 1;
        let _random_r = "";

        for(let i = 0; i < count; i++){
            let _random_int = this.int(start, 26);
            let _random_str = strs[_random_int];
            if(useUpperCase){
                if(this.bool()){
                    _random_r += _random_str.toUpperCase();
                }
                else{
                    _random_r += _random_str;
                }
            }
            else{
                _random_r += _random_str;
            }
        }
        return _random_r;
    }

    static bool = function(){
        let _random = Math.random()
        if(_random<=0.5){
            return false;
        }
        else{
            return true;
        }
    }
}
