var employeeService = new EmployeeService();
var validation = new Validation();


function getEle(id) {
    return document.getElementById(id);
}

var dataBase;

getListEmployee();

function getListEmployee() {
    var promise = employeeService.getList();
    promise.then(function (result) {
        dataBase = result.data;
        show(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}

function filterByRank(typeOfRank) {
    return dataBase.filter(function (employee) {
        return typeOfRank === employee.loaiNV;
    })
}

getEle('searchName').onkeyup = function () {
    var chuoiTK = getEle('searchName').value;
    show(filterByRank(chuoiTK));
}


function show(employeeList) {
    var tbody = getEle('tableDanhSach');
    var content = '';
    employeeList.map(function (item) {
        content += `
            <tr>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>${item.tongLuong}</td>
                <td>${item.loaiNV}</td>
                <td>
                    <button style="mar-right:5px" class="btn btn-danger" onclick="deleteEmployee('${item.id}')"><i class="fa fa-trash"></i></button>
                    <button class="btn btn-info" onclick="updateEmployee('${item.id}')" data-toggle="modal"
                    data-target="#myModal"
                    ><i class="fa fa-paint-brush"></i></button>
                </td>
            </tr>
        `;
    })
    tbody.innerHTML = content;
}

function getButton() {
    reset()
    var modalFooter = document.querySelector("#myModal .modal-footer");
    modalFooter.innerHTML = `
        <button id="btn-add" class="btn btn-success" onclick="addEmployee()">Thêm</button>
        <button
              id="btnDong"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Đóng
            </button>
    `;
}

function addEmployee() {

    var taiKhoan = getEle('tknv').value;
    var hoTen = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngayLam = getEle('datepicker').value;
    var luongCB = getEle('luongCB').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;
    
    var isValid = true;

    // TK
    isValid &= validation.checkEmpty(taiKhoan,getEle('tbTKNV'),'Tài khoản không được bỏ trống!', getEle('icon-error-tk'), getEle('tknv')) && validation.checkTK(taiKhoan,getEle('tbTKNV'),'Tên tài khoản chỉ chữ và số (min: 4 - max: 6)(en)!',getEle('icon-error-tk'),getEle('tknv'));
    // Name
    isValid &= validation.checkEmpty(hoTen,getEle('tbTen'),'Tên nhân viên không được bỏ trống!',getEle('icon-error-name'),getEle('name')) && validation.checkName(hoTen,getEle('tbTen'),'Tên nhân viên chỉ được nhập ký tự (En-en)!',getEle('icon-error-name'),getEle('name'));
    // Email
    isValid &= validation.checkEmpty(email,getEle('tbEmail'),'Email không được bỏ trống!',getEle('icon-error-email'),getEle('email')) && validation.checkEmail(email,getEle('tbEmail'),'Email phải đúng format (abcxyz@abc.com) (en-EN)',getEle('icon-error-email'),getEle('email'));
    // Pass
    isValid &= validation.checkEmpty(matKhau,getEle('tbMatKhau'),'Mật khẩu không được bỏ trống!',getEle('icon-error-pass'),getEle('password')) && validation.checkPass(matKhau,getEle('tbMatKhau'),'Mật khẩu từ 6-10 ký tự (format: Thai@1)',getEle('icon-error-pass'),getEle('password'));
    // Date
    isValid &= validation.checkEmpty(ngayLam,getEle('tbNgay'),'Ngày làm không được bỏ trống!',getEle('icon-error-date'),getEle('datepicker')) && validation.checkDate(ngayLam,getEle('tbNgay'),'Ngày phải đúng format: mm/dd/yyyy',getEle('icon-error-date'),getEle('datepicker'));
    // Salary
    isValid &= validation.checkEmpty(luongCB,getEle('tbLuongCB'),'Lương cơ bản không được bỏ trống!',getEle('icon-error-sal'),getEle('luongCB')) && validation.checkSalary(luongCB,getEle('tbLuongCB'),'Lương chỉ có thể nhập số![1M-20M]',getEle('icon-error-sal'),getEle('luongCB'),1000000,20000000) ;
    // Option
    isValid &= validation.checkDropdown(getEle('chucvu'),getEle('tbChucVu'),'Hãy chọn chức vụ!',getEle('icon-error-pos'),getEle('tbChucVu')) ;
    // Time
    isValid &= validation.checkEmpty(gioLam,getEle('tbGiolam'),'Giờ làm không được bỏ trống!',getEle('icon-error-time'),getEle('gioLam')) && validation.checkSalary(gioLam,getEle('tbGiolam'),'Giờ làm chỉ có thể nhập số![80-200]',getEle('icon-error-time'),getEle('gioLam'),80,200) ;

    if(isValid){
        var employee = new Employee(taiKhoan,hoTen,matKhau,email,ngayLam,luongCB,chucVu,gioLam);
        employee.calSalary();
        console.log(employee);
        employee.calRank();

        employeeService.addEmployee(employee).then(function (result) {
            console.log(result);
            getListEmployee();
        }).catch(function (error) {
            console.log(error);
        })
        reset();
        getEle('btn-add').setAttribute("data-dismiss","modal");
    }
}

function reset() {
    getEle('form-qlsv').reset();
}

function deleteEmployee(id) {
    employeeService.deleteEmployee(id).then(function (result) {
        getListEmployee();
    }).catch(function (error) {
        console.log(error);
    })
}

function updateEmployee(id) {

    var modalFooter = document.querySelector("#myModal .modal-footer");
    modalFooter.innerHTML = `
        <button id="btn-update" class="btn btn-success" onclick="update('${id}')">Cập Nhật</button>
        <button
              id="btnDong"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Đóng
            </button>
    `;

    employeeService.getInfo(id)
        .then(function (result) {
            console.log(result.data);
            getEle('tknv').value = result.data.taiKhoan;
            getEle('name').value = result.data.hoTen;
            getEle('email').value = result.data.email;
            getEle('password').value = result.data.matKhau;
            getEle('datepicker').value = result.data.ngayLam;
            getEle('luongCB').value = result.data.luongCB;
            getEle('chucvu').value = result.data.chucVu;
            getEle('gioLam').value = result.data.gioLam;
        }).catch(function (error) {
            console.log(error);
        });
}

function update(id) {
    var taiKhoan = getEle('tknv').value;
    var hoTen = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngayLam = getEle('datepicker').value;
    var luongCB = getEle('luongCB').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;

    var isValid = true;

    // TK
    isValid &= validation.checkEmpty(taiKhoan,getEle('tbTKNV'),'Tài khoản không được bỏ trống!', getEle('icon-error-tk'), getEle('tknv')) && validation.checkTK(taiKhoan,getEle('tbTKNV'),'Tên tài khoản chỉ chữ và số (min: 4 - max: 6)(en)!',getEle('icon-error-tk'),getEle('tknv'));
    // Name
    isValid &= validation.checkEmpty(hoTen,getEle('tbTen'),'Tên nhân viên không được bỏ trống!',getEle('icon-error-name'),getEle('name')) && validation.checkName(hoTen,getEle('tbTen'),'Tên nhân viên chỉ được nhập ký tự (En-en)!',getEle('icon-error-name'),getEle('name'));
    // Email
    isValid &= validation.checkEmpty(email,getEle('tbEmail'),'Email không được bỏ trống!',getEle('icon-error-email'),getEle('email')) && validation.checkEmail(email,getEle('tbEmail'),'Email phải đúng format (abcxyz@abc.com) (en-EN)',getEle('icon-error-email'),getEle('email'));
    // Pass
    isValid &= validation.checkEmpty(matKhau,getEle('tbMatKhau'),'Mật khẩu không được bỏ trống!',getEle('icon-error-pass'),getEle('password')) && validation.checkPass(matKhau,getEle('tbMatKhau'),'Mật khẩu từ 6-10 ký tự (format: Thai@1)',getEle('icon-error-pass'),getEle('password'));
    // Date
    isValid &= validation.checkEmpty(ngayLam,getEle('tbNgay'),'Ngày làm không được bỏ trống!',getEle('icon-error-date'),getEle('datepicker')) && validation.checkDate(ngayLam,getEle('tbNgay'),'Ngày phải đúng format: mm/dd/yyyy',getEle('icon-error-date'),getEle('datepicker'));
    // Salary
    isValid &= validation.checkEmpty(luongCB,getEle('tbLuongCB'),'Lương cơ bản không được bỏ trống!',getEle('icon-error-sal'),getEle('luongCB')) && validation.checkSalary(luongCB,getEle('tbLuongCB'),'Lương chỉ có thể nhập số![1M-20M]',getEle('icon-error-sal'),getEle('luongCB'),1000000,20000000) ;
    // Option
    isValid &= validation.checkDropdown(getEle('chucvu'),getEle('tbChucVu'),'Hãy chọn chức vụ!',getEle('icon-error-pos'),getEle('tbChucVu')) ;
    // Time
    isValid &= validation.checkEmpty(gioLam,getEle('tbGiolam'),'Giờ làm không được bỏ trống!',getEle('icon-error-time'),getEle('gioLam')) && validation.checkSalary(gioLam,getEle('tbGiolam'),'Giờ làm chỉ có thể nhập số![80-200]',getEle('icon-error-time'),getEle('gioLam'),80,200) ;

    if(isValid){
        var employee = new Employee(taiKhoan,hoTen,matKhau,email,ngayLam,luongCB,chucVu,gioLam);
        employee.calSalary();
        console.log(employee);
        employee.calRank();
        console.log(employee);

        employeeService.updateEmployee(employee,id).then(function (result) {
            console.log(result);
            getListEmployee();
        }).catch(function (error) {
            console.log(error);
        })
        reset();
        getEle('btn-update').setAttribute("data-dismiss","modal");
    }
}
