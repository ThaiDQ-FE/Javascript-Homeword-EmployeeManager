function Employee(_taiKhoan,_hoTen,_matKhau,_email,_ngayLam,_luongCB,_chucVu,_gioLam) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.matKhau = _matKhau;
    this.email = _email;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = '';

    this.calSalary = function (luongCB,number) {
        this.tongLuong = luongCB * number;
    }

    this.classification = function (content) {
        this.loaiNV = content;
    }

}