-- Insert dữ liệu mẫu cho database amthuc_phuongnam
USE amthuc_phuongnam;

-- 1. Insert Admin (5 tài khoản quản trị)
INSERT INTO admin (tai_khoan, mat_khau_hash, ten_hien_thi, email, quyen) VALUES
('admin1', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', 'Nguyễn Văn An', 'admin1@phuongnam.vn', 'superadmin'),
('admin2', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', 'Trần Thị Bình', 'admin2@phuongnam.vn', 'admin'),
('admin3', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', 'Lê Văn Cường', 'admin3@phuongnam.vn', 'moderator'),
('admin4', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', 'Phạm Thị Dung', 'admin4@phuongnam.vn', 'admin'),
('admin5', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', 'Hoàng Văn Em', 'admin5@phuongnam.vn', 'moderator');

-- 2. Insert Người dùng (5 khách hàng)
INSERT INTO nguoi_dung (ten_nguoi_dung, email, so_dien_thoai, mat_khau_hash, dia_chi, gioi_tinh, trang_thai) VALUES
('Nguyễn Thị Mai', 'mai.nguyen@gmail.com', '0901234567', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', '123 Lê Lợi, Q1, TP.HCM', 'nu', 1),
('Trần Văn Hùng', 'hung.tran@gmail.com', '0902345678', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', '456 Nguyễn Huệ, Q1, TP.HCM', 'nam', 1),
('Lê Thị Hoa', 'hoa.le@gmail.com', '0903456789', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', '789 Trần Hưng Đạo, Q5, TP.HCM', 'nu', 1),
('Phạm Minh Tuấn', 'tuan.pham@gmail.com', '0904567890', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', '321 Điện Biên Phủ, Q3, TP.HCM', 'nam', 1),
('Võ Thị Lan', 'lan.vo@gmail.com', '0905678901', '$2a$10$EixZaYVK1fsbw1ZfbX3OXe', '654 Cách Mạng Tháng 8, Q10, TP.HCM', 'nu', 1);

-- 3. Insert Danh mục (5 danh mục món ăn)
INSERT INTO danh_muc (ten_danh_muc, trang_thai, mo_ta) VALUES
('Món Chính', 1, 'Các món ăn chính như cơm, bún, phở, mì'),
('Món Khai Vị', 1, 'Các món khai vị, gỏi, salad'),
('Món Tráng Miệng', 1, 'Các món tráng miệng, chè, bánh ngọt'),
('Đồ Uống', 1, 'Nước giải khát, trà, cà phê, sinh tố'),
('Món Lẩu', 1, 'Các loại lẩu theo phong cách miền Nam');

-- 4. Insert Món ăn (5 món cho mỗi danh mục = 25 món)
-- Món Chính (ma_danh_muc = 1)
INSERT INTO mon_an (ten_mon, mo_ta_chi_tiet, gia_tien, so_luong_ton, don_vi_tinh, anh_mon, ma_danh_muc, trang_thai) VALUES
('Cơm Tấm Sườn Bì Chả', 'Cơm tấm thơm ngon với sườn nướng, bì và chả trứng đặc trưng miền Nam', 45000.00, 100, 'suất', '/images/com-tam-suon.jpg', 1, 1),
('Hủ Tiếu Nam Vang', 'Hủ tiếu Nam Vang với nước dùng trong ngọt, tôm tươi, thịt băm', 40000.00, 80, 'tô', '/images/hu-tieu-nam-vang.jpg', 1, 1),
('Bánh Xèo Miền Tây', 'Bánh xèo giòn rụm với nhân tôm thịt, ăn kèm rau sống và nước mắm chua ngọt', 35000.00, 60, 'cái', '/images/banh-xeo.jpg', 1, 1),
('Bún Mắm Miền Tây', 'Bún mắm đậm đà với cá lóc, thịt ba chỉ, rau muống', 50000.00, 50, 'tô', '/images/bun-mam.jpg', 1, 1),
('Cơm Chiên Dương Châu', 'Cơm chiên Dương Châu với tôm, xúc xích, trứng và rau củ đầy đủ', 55000.00, 70, 'dĩa', '/images/com-chien-duong-chau.jpg', 1, 1);

-- Món Khai Vị (ma_danh_muc = 2)
INSERT INTO mon_an (ten_mon, mo_ta_chi_tiet, gia_tien, so_luong_ton, don_vi_tinh, anh_mon, ma_danh_muc, trang_thai) VALUES
('Gỏi Cuốn Tôm Thịt', 'Gỏi cuốn tươi mát với tôm, thịt, bún và rau thơm', 30000.00, 100, 'đĩa (4 cuốn)', '/images/goi-cuon.jpg', 2, 1),
('Chả Giò Rế', 'Chả giò chiên giòn với nhân tôm thịt, rau củ', 35000.00, 80, 'đĩa (5 cuốn)', '/images/cha-gio.jpg', 2, 1),
('Gỏi Khô Bò', 'Gỏi khô bò trộn với rau răm, hành tây, đậu phộng', 45000.00, 60, 'dĩa', '/images/goi-kho-bo.jpg', 2, 1),
('Bánh Khọt Vũng Tàu', 'Bánh khọt giòn tan với tôm tươi, ăn kèm rau sống', 40000.00, 50, 'đĩa (10 cái)', '/images/banh-khot.jpg', 2, 1),
('Nem Nướng Nha Trang', 'Nem nướng thơm ngon ăn kèm bánh tráng, rau sống', 50000.00, 70, 'xiên', '/images/nem-nuong.jpg', 2, 1);

-- Món Tráng Miệng (ma_danh_muc = 3)
INSERT INTO mon_an (ten_mon, mo_ta_chi_tiet, gia_tien, so_luong_ton, don_vi_tinh, anh_mon, ma_danh_muc, trang_thai) VALUES
('Chè Ba Màu', 'Chè ba màu truyền thống với đậu xanh, đậu đỏ, thạch', 20000.00, 100, 'tô', '/images/che-ba-mau.jpg', 3, 1),
('Bánh Flan Caramen', 'Bánh flan mềm mịn với lớp caramen thơm ngon', 15000.00, 120, 'cái', '/images/banh-flan.jpg', 3, 1),
('Chè Thái', 'Chè Thái đầy đủ topping với thạch, hạt lựu, nhãn', 25000.00, 80, 'ly', '/images/che-thai.jpg', 3, 1),
('Bánh Chuối Nướng', 'Bánh chuối nướng thơm lừng với nước cốt dừa', 18000.00, 60, 'miếng', '/images/banh-chuoi-nuong.jpg', 3, 1),
('Sương Sa Hạt Lựu', 'Sương sa hạt lựu mát lạnh, thanh mát', 22000.00, 90, 'ly', '/images/suong-sa-hat-luu.jpg', 3, 1);

-- Đồ Uống (ma_danh_muc = 4)
INSERT INTO mon_an (ten_mon, mo_ta_chi_tiet, gia_tien, so_luong_ton, don_vi_tinh, anh_mon, ma_danh_muc, trang_thai) VALUES
('Cà Phê Sữa Đá', 'Cà phê phin truyền thống pha với sữa đặc', 25000.00, 200, 'ly', '/images/ca-phe-sua-da.jpg', 4, 1),
('Trà Đá Chanh', 'Trà đá chanh tươi mát, giải khát', 15000.00, 200, 'ly', '/images/tra-da-chanh.jpg', 4, 1),
('Sinh Tố Bơ', 'Sinh tố bơ béo ngậy, thơm ngon', 30000.00, 100, 'ly', '/images/sinh-to-bo.jpg', 4, 1),
('Nước Dừa Tươi', 'Nước dừa xiêm tươi mát, ngọt thanh', 20000.00, 150, 'trái', '/images/nuoc-dua.jpg', 4, 1),
('Trà Sữa Trân Châu', 'Trà sữa đài loan với topping trân châu đen', 35000.00, 120, 'ly', '/images/tra-sua-tran-chau.jpg', 4, 1);

-- Món Lẩu (ma_danh_muc = 5)
INSERT INTO mon_an (ten_mon, mo_ta_chi_tiet, gia_tien, so_luong_ton, don_vi_tinh, anh_mon, ma_danh_muc, trang_thai) VALUES
('Lẩu Mắm Miền Tây', 'Lẩu mắm đậm đà với cá lóc, tôm, rau muống (2-3 người)', 250000.00, 30, 'nồi', '/images/lau-mam.jpg', 5, 1),
('Lẩu Thái Hải Sản', 'Lẩu Thái chua cay với tôm, mực, cá, nấm (2-3 người)', 280000.00, 25, 'nồi', '/images/lau-thai.jpg', 5, 1),
('Lẩu Cá Kèo Lá Giang', 'Lẩu cá kèo lá giang đặc sản miền Nam (2-3 người)', 220000.00, 20, 'nồi', '/images/lau-ca-keo.jpg', 5, 1),
('Lẩu Gà Lá É', 'Lẩu gà lá é thơm ngon bổ dưỡng (2-3 người)', 260000.00, 25, 'nồi', '/images/lau-ga-la-e.jpg', 5, 1),
('Lẩu Hải Sản Chua Cay', 'Lẩu hải sản chua cay đầy đủ tôm, cua, cá (3-4 người)', 350000.00, 20, 'nồi', '/images/lau-hai-san.jpg', 5, 1);

-- 5. Insert Ảnh sản phẩm (5 ảnh bổ sung cho một số món)
INSERT INTO anh_san_pham (ma_mon, duong_dan_anh, mo_ta) VALUES
(1, '/images/com-tam-suon-1.jpg', 'Cơm tấm sườn - góc chụp 1'),
(1, '/images/com-tam-suon-2.jpg', 'Cơm tấm sườn - góc chụp 2'),
(6, '/images/goi-cuon-1.jpg', 'Gỏi cuốn tôm thịt - chi tiết'),
(11, '/images/che-ba-mau-1.jpg', 'Chè ba màu - topping đầy đủ'),
(21, '/images/lau-mam-1.jpg', 'Lẩu mắm - nồi lẩu đang sôi');

-- 6. Insert Khuyến mãi (5 chương trình khuyến mãi)
INSERT INTO khuyen_mai (ma_code, mo_ta, loai_giam_gia, gia_tri, don_hang_toi_thieu, ngay_bat_dau, ngay_ket_thuc, so_luong_gioi_han) VALUES
('KHAI_TRUONG', 'Khuyến mãi khai trương - Giảm 20%', 'percentage', 20.00, 100000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 1000),
('GIAM50K', 'Giảm ngay 50K cho đơn hàng từ 300K', 'fixed_amount', 50000.00, 300000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 500),
('THANHVIEN10', 'Ưu đãi thành viên - Giảm 10%', 'percentage', 10.00, 0.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NULL),
('FREESHIP', 'Miễn phí giao hàng', 'fixed_amount', 30000.00, 150000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 2000),
('CUOITUAN', 'Khuyến mãi cuối tuần - Giảm 15%', 'percentage', 15.00, 200000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', 300);

-- 7. Insert Đặt bàn (5 đơn đặt bàn)
INSERT INTO dat_ban (ten_nguoi_dat, so_dien_thoai, so_luong, ngay_dat, gio_den, ghi_chu, trang_thai) VALUES
('Nguyễn Văn A', '0906123456', 4, '2025-10-15', '12:00:00', 'Đặt bàn gần cửa sổ', 'confirmed'),
('Trần Thị B', '0907234567', 6, '2025-10-15', '18:30:00', 'Có trẻ em, cần ghế cao', 'pending'),
('Lê Văn C', '0908345678', 2, '2025-10-16', '19:00:00', 'Đặt bàn riêng tư', 'confirmed'),
('Phạm Thị D', '0909456789', 8, '2025-10-17', '12:30:00', 'Tiệc sinh nhật, cần trang trí', 'pending'),
('Hoàng Văn E', '0910567890', 3, '2025-10-18', '20:00:00', 'Không ghi chú', 'confirmed');

-- 8. Insert Tin tức (5 bài viết)
INSERT INTO tin_tuc (tieu_de, tom_tat, noi_dung, anh_dai_dien, ma_admin_dang, trang_thai, luot_xem) VALUES
('Khai trương chi nhánh mới tại Quận 7', 
 'Nhà hàng Phương Nam tự hào thông báo khai trương chi nhánh mới tại Quận 7, TP.HCM', 
 '<p>Nhà hàng Phương Nam tự hào thông báo khai trương chi nhánh mới tại Quận 7, TP.HCM. Với không gian rộng rãi, thoáng mát và menu đa dạng...</p>', 
 '/images/news-khai-truong.jpg', 1, 1, 150),

('Top 10 món ăn đặc sản miền Nam phải thử', 
 'Cùng khám phá 10 món ăn đặc sản miền Nam không thể bỏ qua khi đến với Phương Nam', 
 '<p>Miền Nam Việt Nam nổi tiếng với ẩm thực phong phú, đa dạng. Cùng chúng tôi khám phá 10 món ăn đặc sản...</p>', 
 '/images/news-top10.jpg', 1, 1, 320),

('Bí quyết làm bánh xèo giòn rụm', 
 'Chia sẻ bí quyết làm bánh xèo giòn rụm, vàng ươm đúng chuẩn miền Tây', 
 '<p>Bánh xèo là món ăn truyền thống của người miền Nam. Để có một chiếc bánh xèo giòn rụm...</p>', 
 '/images/news-banh-xeo.jpg', 2, 1, 280),

('Khuyến mãi tháng 10 - Giảm giá đến 30%', 
 'Chương trình khuyến mãi lớn trong tháng 10 với nhiều ưu đãi hấp dẫn', 
 '<p>Nhân dịp tháng 10, nhà hàng Phương Nam triển khai chương trình khuyến mãi với nhiều ưu đãi...</p>', 
 '/images/news-khuyen-mai.jpg', 1, 1, 450),

('Lẩu mắm - Tinh hoa ẩm thực miền Tây', 
 'Tìm hiểu về lẩu mắm - món ăn đậm đà bản sắc văn hóa miền Tây sông nước', 
 '<p>Lẩu mắm là món ăn đặc trưng của vùng đồng bằng sông Cửu Long. Với nước dùng đậm đà từ mắm...</p>', 
 '/images/news-lau-mam.jpg', 2, 1, 190);

-- 9. Insert Quảng cáo (5 banner quảng cáo)
INSERT INTO quang_cao (tieu_de, hinh_anh, duong_dan_lien_ket, vi_tri, ngay_bat_dau, ngay_ket_thuc, trang_thai) VALUES
('Banner Khuyến Mãi Tháng 10', '/images/banner-khuyen-mai-10.jpg', '/khuyen-mai', 'homepage-slider', '2025-10-01 00:00:00', '2025-10-31 23:59:59', 1),
('Giới thiệu Món Mới', '/images/banner-mon-moi.jpg', '/menu/mon-moi', 'homepage-slider', '2025-10-01 00:00:00', '2025-12-31 23:59:59', 1),
('Đặt Bàn Trực Tuyến', '/images/banner-dat-ban.jpg', '/dat-ban', 'sidebar', '2025-01-01 00:00:00', '2025-12-31 23:59:59', 1),
('Chương Trình Thành Viên', '/images/banner-thanh-vien.jpg', '/thanh-vien', 'footer', '2025-01-01 00:00:00', '2025-12-31 23:59:59', 1),
('Giao Hàng Miễn Phí', '/images/banner-freeship.jpg', '/chinh-sach-giao-hang', 'popup', '2025-10-01 00:00:00', '2025-10-31 23:59:59', 1);

-- 10. Insert Liên hệ (5 tin nhắn liên hệ)
INSERT INTO lien_he (ho_ten, email, so_dien_thoai, tieu_de, noi_dung, trang_thai) VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', '0911111111', 'Hỏi về địa chỉ chi nhánh', 'Cho tôi hỏi nhà hàng có chi nhánh nào ở Quận 2 không ạ?', 'replied'),
('Trần Thị B', 'tranthib@gmail.com', '0922222222', 'Đặt tiệc sinh nhật', 'Tôi muốn đặt tiệc sinh nhật cho 20 người, có gói nào phù hợp không?', 'read'),
('Lê Văn C', 'levanc@gmail.com', '0933333333', 'Góp ý về dịch vụ', 'Hôm qua tôi có đến nhà hàng, dịch vụ rất tốt. Cảm ơn!', 'read'),
('Phạm Thị D', 'phamthid@gmail.com', '0944444444', 'Hỏi về menu chay', 'Nhà hàng có phục vụ menu chay không ạ?', 'new'),
('Hoàng Văn E', 'hoangvane@gmail.com', '0955555555', 'Khiếu nại đơn hàng', 'Đơn hàng #123 của tôi bị giao thiếu món, làm sao để xử lý?', 'new');

-- 11. Insert Thống kê hàng ngày (5 ngày gần đây)
INSERT INTO thong_ke_hang_ngay (ngay_thong_ke, doanh_thu, so_don_hang, so_khach_hang_moi, luot_truy_cap) VALUES
('2025-10-08', 5600000.00, 42, 8, 1250),
('2025-10-09', 6200000.00, 48, 12, 1380),
('2025-10-10', 7100000.00, 53, 15, 1520),
('2025-10-11', 5900000.00, 45, 9, 1420),
('2025-10-12', 6800000.00, 51, 11, 1650);

-- 12. Insert Giỏ hàng (5 giỏ hàng)
INSERT INTO gio_hang (ma_nguoi_dung, trang_thai) VALUES
(1, 'active'),
(2, 'ordered'),
(3, 'active'),
(4, 'active'),
(5, 'abandoned');

-- 13. Insert Chi tiết giỏ hàng (5 items trong các giỏ hàng)
INSERT INTO chi_tiet_gio_hang (ma_gio_hang, ma_mon, so_luong, gia_tai_thoi_diem) VALUES
(1, 1, 2, 45000.00),
(1, 6, 1, 30000.00),
(3, 11, 3, 20000.00),
(4, 16, 2, 25000.00),
(4, 21, 1, 250000.00);

-- 14. Insert Đơn hàng (5 đơn hàng)
INSERT INTO don_hang (ma_nguoi_dung, ten_khach_vang_lai, so_dt_khach, dia_chi_giao, tong_tien, trang_thai, ghi_chu, ma_khuyen_mai, tien_giam_gia) VALUES
(1, NULL, NULL, '123 Lê Lợi, Q1, TP.HCM', 120000.00, 'delivered', 'Giao trước 12h', 'GIAM50K', 50000.00),
(2, NULL, NULL, '456 Nguyễn Huệ, Q1, TP.HCM', 315000.00, 'preparing', 'Không giao cuối tuần', NULL, 0.00),
(3, NULL, NULL, '789 Trần Hưng Đạo, Q5, TP.HCM', 180000.00, 'confirmed', NULL, 'THANHVIEN10', 18000.00),
(NULL, 'Võ Văn F', '0916666666', '111 Pasteur, Q3, TP.HCM', 450000.00, 'delivered', 'Khách vãng lai', NULL, 0.00),
(4, NULL, NULL, '321 Điện Biên Phủ, Q3, TP.HCM', 560000.00, 'cancelled', 'Khách hủy đơn', NULL, 0.00);

-- 15. Insert Chi tiết đơn hàng (15 items - 3 món cho mỗi đơn)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_mon, so_luong, gia_tai_thoi_diem) VALUES
-- Đơn hàng 1
(1, 1, 2, 45000.00),
(1, 6, 1, 30000.00),
(1, 16, 2, 25000.00),
-- Đơn hàng 2
(2, 2, 3, 40000.00),
(2, 7, 2, 35000.00),
(2, 11, 5, 20000.00),
-- Đơn hàng 3
(3, 3, 2, 35000.00),
(3, 8, 1, 45000.00),
(3, 12, 4, 15000.00),
-- Đơn hàng 4
(4, 21, 1, 250000.00),
(4, 4, 2, 50000.00),
(4, 16, 4, 25000.00),
-- Đơn hàng 5
(5, 5, 3, 55000.00),
(5, 10, 2, 50000.00),
(5, 22, 1, 280000.00);

-- 16. Insert Thanh toán (5 giao dịch thanh toán)
INSERT INTO thanh_toan (ma_don_hang, so_tien, phuong_thuc, ma_giao_dich, trang_thai, thoi_gian_thanh_toan, thong_tin_them) VALUES
(1, 120000.00, 'momo', 'MOMO123456789', 'success', '2025-10-10 11:30:00', 'Thanh toán qua MoMo'),
(2, 315000.00, 'cash', NULL, 'pending', NULL, 'Thanh toán khi nhận hàng'),
(3, 180000.00, 'vnpay', 'VNPAY987654321', 'success', '2025-10-11 14:20:00', 'Thanh toán qua VNPay'),
(4, 450000.00, 'cash', NULL, 'success', '2025-10-09 18:45:00', 'Thanh toán tiền mặt'),
(5, 560000.00, 'zalopay', 'ZALO111222333', 'cancelled', NULL, 'Giao dịch bị hủy');

-- 17. Insert Hóa đơn (5 hóa đơn)
INSERT INTO hoa_don (ma_don_hang, ma_thanh_toan, ma_nguoi_dat, tong_tien, trang_thai) VALUES
(1, 1, 1, 120000.00, 'issued'),
(2, 2, 2, 315000.00, 'issued'),
(3, 3, 3, 180000.00, 'issued'),
(4, 4, NULL, 450000.00, 'issued'),
(5, 5, 4, 560000.00, 'cancelled');

-- 18. Insert Chi tiết hóa đơn (15 items)
INSERT INTO chi_tiet_hoa_don (ma_hoa_don, ma_mon, ten_mon, so_luong, don_gia, thanh_tien) VALUES
-- Hóa đơn 1
(1, 1, 'Cơm Tấm Sườn Bì Chả', 2, 45000.00, 90000.00),
(1, 6, 'Gỏi Cuốn Tôm Thịt', 1, 30000.00, 30000.00),
-- Hóa đơn 2
(2, 2, 'Hủ Tiếu Nam Vang', 3, 40000.00, 120000.00),
(2, 7, 'Chả Giò Rế', 2, 35000.00, 70000.00),
(2, 11, 'Chè Ba Màu', 5, 20000.00, 100000.00),
-- Hóa đơn 3
(3, 3, 'Bánh Xèo Miền Tây', 2, 35000.00, 70000.00),
(3, 8, 'Gỏi Khô Bò', 1, 45000.00, 45000.00),
(3, 12, 'Bánh Flan Caramen', 4, 15000.00, 60000.00),
-- Hóa đơn 4
(4, 21, 'Lẩu Mắm Miền Tây', 1, 250000.00, 250000.00),
(4, 4, 'Bún Mắm Miền Tây', 2, 50000.00, 100000.00),
(4, 16, 'Cà Phê Sữa Đá', 4, 25000.00, 100000.00),
-- Hóa đơn 5
(5, 5, 'Cơm Chiên Dương Châu', 3, 55000.00, 165000.00),
(5, 10, 'Nem Nướng Nha Trang', 2, 50000.00, 100000.00),
(5, 22, 'Lẩu Thái Hải Sản', 1, 280000.00, 280000.00);

-- 19. Insert Đánh giá sản phẩm (5 đánh giá)
INSERT INTO danh_gia_san_pham (ma_mon, ma_nguoi_dung, so_sao, binh_luan, trang_thai) VALUES
(1, 1, 5, 'Cơm tấm rất ngon, sườn mềm thơm. Sẽ quay lại!', 'approved'),
(2, 2, 4, 'Hủ tiếu nước dùng ngọt, nhưng hơi ít tôm', 'approved'),
(6, 3, 5, 'Gỏi cuốn tươi ngon, rau sạch. Nước chấm đậm đà', 'approved'),
(21, 1, 5, 'Lẩu mắm đậm đà chuẩn vị miền Tây. Tuyệt vời!', 'approved'),
(11, 4, 3, 'Chè bình thường, không có gì đặc biệt', 'pending');

-- 20. Insert Lịch sử chatbot (10 cuộc hội thoại)
INSERT INTO lich_su_chatbot (ma_nguoi_dung, session_id, nguoi_gui, noi_dung) VALUES
(1, 'SESSION_001', 'user', 'Cho tôi xem menu món chính'),
(1, 'SESSION_001', 'bot', 'Dạ, đây là danh sách các món chính: Cơm Tấm Sườn Bì Chả, Hủ Tiếu Nam Vang, Bánh Xèo Miền Tây...'),
(2, 'SESSION_002', 'user', 'Món nào dưới 50k?'),
(2, 'SESSION_002', 'bot', 'Các món dưới 50k gồm: Hủ Tiếu Nam Vang (40k), Bánh Xèo Miền Tây (35k), Gỏi Cuốn (30k)...'),
(3, 'SESSION_003', 'user', 'Nhà hàng có giao hàng không?'),
(3, 'SESSION_003', 'bot', 'Có ạ, chúng tôi có dịch vụ giao hàng tận nơi. Miễn phí ship cho đơn từ 150k'),
(4, 'SESSION_004', 'user', 'Làm sao để đặt bàn?'),
(4, 'SESSION_004', 'bot', 'Quý khách có thể đặt bàn qua website hoặc gọi hotline: 1900-xxxx'),
(5, 'SESSION_005', 'user', 'Có khuyến mãi gì không?'),
(5, 'SESSION_005', 'bot', 'Hiện tại có mã KHAI_TRUONG giảm 20% và GIAM50K giảm 50k cho đơn từ 300k ạ');

-- 21. Insert Reset password (5 token reset mật khẩu)
INSERT INTO reset_password (ma_nguoi_dung, token, expired_at, da_su_dung) VALUES
(1, 'TOKEN_ABC123XYZ789', '2025-10-14 10:30:00', 0),
(2, 'TOKEN_DEF456UVW012', '2025-10-13 15:45:00', 1),
(3, 'TOKEN_GHI789RST345', '2025-10-15 09:20:00', 0),
(4, 'TOKEN_JKL012OPQ678', '2025-10-12 14:00:00', 1),
(5, 'TOKEN_MNO345ABC901', '2025-10-16 11:30:00', 0);

-- 22. Insert Dữ liệu tìm kiếm (10 lượt tìm kiếm)
INSERT INTO du_lieu_tim_kiem (tu_khoa, ma_nguoi_dung) VALUES
('cơm tấm', 1),
('lẩu mắm', 2),
('bánh xèo', 3),
('món chay', 4),
('gỏi cuốn', 5),
('cà phê', 1),
('chè', 2),
('hủ tiếu', NULL),
('đồ uống', 3),
('khuyến mãi', NULL);

-- Thông báo hoàn thành
SELECT 'Đã insert thành công dữ liệu mẫu vào database amthuc_phuongnam!' AS 'Trạng thái';

-- Kiểm tra dữ liệu đã insert (22 bảng)
SELECT 'Admin' AS Bang, COUNT(*) AS So_luong FROM admin
UNION ALL SELECT 'Người dùng', COUNT(*) FROM nguoi_dung
UNION ALL SELECT 'Danh mục', COUNT(*) FROM danh_muc
UNION ALL SELECT 'Món ăn', COUNT(*) FROM mon_an
UNION ALL SELECT 'Ảnh sản phẩm', COUNT(*) FROM anh_san_pham
UNION ALL SELECT 'Giỏ hàng', COUNT(*) FROM gio_hang
UNION ALL SELECT 'Chi tiết giỏ hàng', COUNT(*) FROM chi_tiet_gio_hang
UNION ALL SELECT 'Khuyến mãi', COUNT(*) FROM khuyen_mai
UNION ALL SELECT 'Đơn hàng', COUNT(*) FROM don_hang
UNION ALL SELECT 'Chi tiết đơn hàng', COUNT(*) FROM chi_tiet_don_hang
UNION ALL SELECT 'Thanh toán', COUNT(*) FROM thanh_toan
UNION ALL SELECT 'Hóa đơn', COUNT(*) FROM hoa_don
UNION ALL SELECT 'Chi tiết hóa đơn', COUNT(*) FROM chi_tiet_hoa_don
UNION ALL SELECT 'Đánh giá sản phẩm', COUNT(*) FROM danh_gia_san_pham
UNION ALL SELECT 'Lịch sử chatbot', COUNT(*) FROM lich_su_chatbot
UNION ALL SELECT 'Thống kê hàng ngày', COUNT(*) FROM thong_ke_hang_ngay
UNION ALL SELECT 'Reset password', COUNT(*) FROM reset_password
UNION ALL SELECT 'Liên hệ', COUNT(*) FROM lien_he
UNION ALL SELECT 'Quảng cáo', COUNT(*) FROM quang_cao
UNION ALL SELECT 'Tin tức', COUNT(*) FROM tin_tuc
UNION ALL SELECT 'Dữ liệu tìm kiếm', COUNT(*) FROM du_lieu_tim_kiem
UNION ALL SELECT 'Đặt bàn', COUNT(*) FROM dat_ban
ORDER BY Bang;

-- ========================================
-- HIỂN THỊ DỮ LIỆU CÁC BẢNG
-- ========================================

-- 1. Hiển thị bảng Admin
SELECT '========== BẢNG ADMIN ==========' AS '';
SELECT * FROM admin;

-- 2. Hiển thị bảng Người dùng
SELECT '========== BẢNG NGƯỜI DÙNG ==========' AS '';
SELECT * FROM nguoi_dung;

-- 3. Hiển thị bảng Danh mục
SELECT '========== BẢNG DANH MỤC ==========' AS '';
SELECT * FROM danh_muc;

-- 4. Hiển thị bảng Món ăn
SELECT '========== BẢNG MÓN ĂN ==========' AS '';
SELECT ma_mon, ten_mon, gia_tien, so_luong_ton, don_vi_tinh, ma_danh_muc, trang_thai 
FROM mon_an 
ORDER BY ma_danh_muc, ma_mon;

-- 5. Hiển thị bảng Ảnh sản phẩm
SELECT '========== BẢNG ẢNH SẢN PHẨM ==========' AS '';
SELECT * FROM anh_san_pham;

-- 6. Hiển thị bảng Giỏ hàng
SELECT '========== BẢNG GIỎ HÀNG ==========' AS '';
SELECT * FROM gio_hang;

-- 7. Hiển thị bảng Chi tiết giỏ hàng
SELECT '========== BẢNG CHI TIẾT GIỎ HÀNG ==========' AS '';
SELECT ctgh.*, m.ten_mon 
FROM chi_tiet_gio_hang ctgh
JOIN mon_an m ON ctgh.ma_mon = m.ma_mon
ORDER BY ctgh.ma_gio_hang;

-- 8. Hiển thị bảng Khuyến mãi
SELECT '========== BẢNG KHUYẾN MÃI ==========' AS '';
SELECT ma_khuyen_mai, ma_code, mo_ta, loai_giam_gia, gia_tri, don_hang_toi_thieu, 
       ngay_bat_dau, ngay_ket_thuc, so_luong_gioi_han, so_luong_da_dung, trang_thai 
FROM khuyen_mai;

-- 9. Hiển thị bảng Đơn hàng
SELECT '========== BẢNG ĐƠN HÀNG ==========' AS '';
SELECT ma_don_hang, ma_nguoi_dung, ten_khach_vang_lai, so_dt_khach, 
       dia_chi_giao, tong_tien, trang_thai, thoi_gian_tao, ma_khuyen_mai, tien_giam_gia 
FROM don_hang 
ORDER BY ma_don_hang;

-- 10. Hiển thị bảng Chi tiết đơn hàng
SELECT '========== BẢNG CHI TIẾT ĐƠN HÀNG ==========' AS '';
SELECT ctdh.*, m.ten_mon 
FROM chi_tiet_don_hang ctdh
JOIN mon_an m ON ctdh.ma_mon = m.ma_mon
ORDER BY ctdh.ma_don_hang, ctdh.ma_ct_don;

-- 11. Hiển thị bảng Thanh toán
SELECT '========== BẢNG THANH TOÁN ==========' AS '';
SELECT * FROM thanh_toan ORDER BY ma_thanh_toan;

-- 12. Hiển thị bảng Hóa đơn
SELECT '========== BẢNG HÓA ĐƠN ==========' AS '';
SELECT * FROM hoa_don ORDER BY ma_hoa_don;

-- 13. Hiển thị bảng Chi tiết hóa đơn
SELECT '========== BẢNG CHI TIẾT HÓA ĐƠN ==========' AS '';
SELECT * FROM chi_tiet_hoa_don ORDER BY ma_hoa_don, ma_ct_hoa_don;

-- 14. Hiển thị bảng Đánh giá sản phẩm
SELECT '========== BẢNG ĐÁNH GIÁ SẢN PHẨM ==========' AS '';
SELECT dg.ma_danh_gia, m.ten_mon, nd.ten_nguoi_dung, dg.so_sao, 
       dg.binh_luan, dg.ngay_danh_gia, dg.trang_thai 
FROM danh_gia_san_pham dg
JOIN mon_an m ON dg.ma_mon = m.ma_mon
JOIN nguoi_dung nd ON dg.ma_nguoi_dung = nd.ma_nguoi_dung
ORDER BY dg.ma_danh_gia;

-- 15. Hiển thị bảng Lịch sử chatbot
SELECT '========== BẢNG LỊCH SỬ CHATBOT ==========' AS '';
SELECT ls.ma_tin_nhan, nd.ten_nguoi_dung, ls.session_id, ls.nguoi_gui, 
       LEFT(ls.noi_dung, 50) AS noi_dung_preview, ls.thoi_diem_chat 
FROM lich_su_chatbot ls
LEFT JOIN nguoi_dung nd ON ls.ma_nguoi_dung = nd.ma_nguoi_dung
ORDER BY ls.session_id, ls.ma_tin_nhan;

-- 16. Hiển thị bảng Thống kê hàng ngày
SELECT '========== BẢNG THỐNG KÊ HÀNG NGÀY ==========' AS '';
SELECT * FROM thong_ke_hang_ngay ORDER BY ngay_thong_ke DESC;

-- 17. Hiển thị bảng Reset password
SELECT '========== BẢNG RESET PASSWORD ==========' AS '';
SELECT rp.id, nd.ten_nguoi_dung, nd.email, rp.token, 
       rp.expired_at, rp.da_su_dung 
FROM reset_password rp
JOIN nguoi_dung nd ON rp.ma_nguoi_dung = nd.ma_nguoi_dung
ORDER BY rp.id;

-- 18. Hiển thị bảng Liên hệ
SELECT '========== BẢNG LIÊN HỆ ==========' AS '';
SELECT ma_lien_he, ho_ten, email, so_dien_thoai, tieu_de, 
       LEFT(noi_dung, 50) AS noi_dung_preview, ngay_gui, trang_thai 
FROM lien_he 
ORDER BY ngay_gui DESC;

-- 19. Hiển thị bảng Quảng cáo
SELECT '========== BẢNG QUẢNG CÁO ==========' AS '';
SELECT ma_quang_cao, tieu_de, hinh_anh, duong_dan_lien_ket, vi_tri, 
       ngay_bat_dau, ngay_ket_thuc, trang_thai 
FROM quang_cao 
ORDER BY ma_quang_cao;

-- 20. Hiển thị bảng Tin tức
SELECT '========== BẢNG TIN TỨC ==========' AS '';
SELECT tt.ma_tin_tuc, tt.tieu_de, tt.tom_tat, a.ten_hien_thi AS nguoi_dang, 
       tt.ngay_dang, tt.trang_thai, tt.luot_xem 
FROM tin_tuc tt
LEFT JOIN admin a ON tt.ma_admin_dang = a.ma_admin
ORDER BY tt.ngay_dang DESC;

-- 21. Hiển thị bảng Dữ liệu tìm kiếm
SELECT '========== BẢNG DỮ LIỆU TÌM KIẾM ==========' AS '';
SELECT dt.ma_tim_kiem, dt.tu_khoa, nd.ten_nguoi_dung, dt.thoi_gian_tim 
FROM du_lieu_tim_kiem dt
LEFT JOIN nguoi_dung nd ON dt.ma_nguoi_dung = nd.ma_nguoi_dung
ORDER BY dt.thoi_gian_tim DESC;

-- 22. Hiển thị bảng Đặt bàn
SELECT '========== BẢNG ĐẶT BÀN ==========' AS '';
SELECT * FROM dat_ban ORDER BY ngay_dat, gio_den;

-- ========================================
-- THỐNG KÊ TỔNG QUAN
-- ========================================
SELECT '========== THỐNG KÊ TỔNG QUAN ==========' AS '';

SELECT 
    'Tổng số Admin' AS Thong_ke, 
    COUNT(*) AS Gia_tri 
FROM admin
UNION ALL
SELECT 'Tổng số Người dùng', COUNT(*) FROM nguoi_dung
UNION ALL
SELECT 'Tổng số Danh mục', COUNT(*) FROM danh_muc
UNION ALL
SELECT 'Tổng số Món ăn', COUNT(*) FROM mon_an
UNION ALL
SELECT 'Tổng số Đơn hàng', COUNT(*) FROM don_hang
UNION ALL
SELECT 'Đơn hàng đã giao', COUNT(*) FROM don_hang WHERE trang_thai = 'delivered'
UNION ALL
SELECT 'Đơn hàng đang xử lý', COUNT(*) FROM don_hang WHERE trang_thai IN ('pending', 'confirmed', 'preparing')
UNION ALL
SELECT 'Tổng số Đánh giá', COUNT(*) FROM danh_gia_san_pham
UNION ALL
SELECT 'Số Tin nhắn Chatbot', COUNT(*) FROM lich_su_chatbot
UNION ALL
SELECT 'Số Đặt bàn', COUNT(*) FROM dat_ban;
