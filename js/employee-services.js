function EmployeeService() {
    this.getList = function () {
        var promise = axios({
            method: 'get',
            url: 'https://5fd63d01ea55c40016041d95.mockapi.io/employee'
          });
        return promise;
    }

    this.addEmployee = function (employee) {
        var promise = axios({
            method: 'post',
            url: 'https://5fd63d01ea55c40016041d95.mockapi.io/employee',
            data: employee
        });
        return promise;
    }
    this.deleteEmployee = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://5fd63d01ea55c40016041d95.mockapi.io/employee/${id}`
          });

       return promise;   
    }
    this.getInfo = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://5fd63d01ea55c40016041d95.mockapi.io/employee/${id}`
          });
       return promise; 
    }
    this.updateEmployee = function (employee, id) {
        var promise = axios({
            method: 'put',
            url: `https://5fd63d01ea55c40016041d95.mockapi.io/employee/${id}`,
            data: employee
          });
       return promise; 
    }
    
}