function Validation() {
    this.checkEmpty = function (inputVal, spanEle, message,icon, idInput) {
        if(inputVal.trim() === ''){
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false;
        }
        else{
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }
    }
    this.checkTK = function (inputVal, spanEle, message,icon, idInput) {
        var reg = /^(?=.*[a-z])[a-z0-9]{4,6}$/;
        if(inputVal.match(reg)){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
    this.checkName = function (inputVal, spanEle, message, icon, idInput) {
        var reg = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
        if(inputVal.trim().match(reg)){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
    this.checkEmail = function (inputVal, spanEle, message, icon, idInput) {
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputVal.match(reg)){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
    this.checkPass = function (inputVal, spanEle, message, icon, idInput) {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if(inputVal.match(reg)){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
    this.checkDate = function (inputVal, spanEle, message, icon, idInput) {
        var reg = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
        if(inputVal.match(reg)){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon-date');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon-date');
            return false
        }
    }
    this.checkSalary = function (inputVal, spanEle, message, icon, idInput,min,max) {
        var reg = /^\d*$/;
        if(inputVal.match(reg) && inputVal >= min && inputVal <= max){
            spanEle.innerHTML = '';
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
    this.checkDropdown = function(selectEle,spanEle,message, icon, idInput){
        if(selectEle.selectedIndex != 0){
            spanEle.innerHTML = "";
            idInput.classList.remove('border-input');
            spanEle.classList.remove('show-error');
            icon.classList.remove('show-icon');
            return true;
        }else{
            spanEle.innerHTML = message;
            idInput.classList.add('border-input');
            spanEle.classList.add('show-error');
            icon.classList.add('show-icon');
            return false
        }
    }
}