# 🎨 Hướng Dẫn Import Design vào Figma

## Phương Án 1: Import Screenshot (Khuyên Dùng)

### Bước 1: Chụp Screenshot
1. Mở file `ai-reader-mobile-figma.html` trong trình duyệt
2. Zoom 100% để đảm bảo chất lượng
3. Chụp từng phần:
   - Design System (Color Palette + Typography)
   - 4 Mobile Screens
   - Component Library

### Bước 2: Import vào Figma
1. Mở Figma Desktop hoặc Web
2. Tạo File mới
3. Kéo thả các ảnh screenshot vào Canvas
4. Sử dụng làm reference để vẽ lại components

---

## Phương Án 2: Sử dụng Plugin HTML to Figma

### Plugins Figma Hữu Ích:
1. **html.to.design** (Khuyên dùng nhất)
   - Link: https://www.figma.com/community/plugin/1159123024924461424/html-to-design
   - Cách dùng:
     - Install plugin trong Figma
     - Copy toàn bộ code HTML
     - Paste vào plugin
     - Plugin sẽ tự động convert

2. **Builder.io - Figma to Code**
   - Link: https://www.figma.com/community/plugin/747985167520967365/builder-io-figma-to-code-react-vue-tailwind-more
   - Import code HTML/CSS trực tiếp

---

## Phương Án 3: Tạo Figma File Từ Template

### Design Tokens để Copy vào Figma:

#### 🎨 Colors
```
Primary Gradient: Linear (#667eea → #764ba2, 135°)
Success Gradient: Linear (#11998e → #38ef7d, 135°)
Warning Gradient: Linear (#f093fb → #f5576c, 135°)
Info Gradient: Linear (#4facfe → #00f2fe, 135°)
Background White: #FFFFFF
Light Background: #F8F9FF
Border: #E0E0E0
Text Primary: #333333
Text Secondary: #666666
Text Tertiary: #999999
```

#### 📝 Typography
```
Heading 1: 3.5em / 56px - Bold (700)
Heading 2: 2em / 32px - SemiBold (600)
Body Large: 1.4em / 22.4px - Regular (400)
Button Text: 1.2em / 19.2px - Bold (700)
Caption: 0.85em / 13.6px - Regular (400)
```

#### 📐 Spacing
```
Section Padding: 20-30px
Card Gap: 15-20px
Button Height: 50-60px
Border Radius Small: 10px
Border Radius Medium: 15px
Border Radius Large: 20-30px
```

#### 🎯 Touch Targets
```
Minimum Size: 44x44px
Button Padding: 18-20px vertical, 20-40px horizontal
Icon Size: 24-32px
Gap Between Buttons: 12-15px
```

#### 📱 Mobile Frame
```
Width: 375px (iPhone standard)
Height: 812px
Border Radius: 30px
Status Bar Height: 50px
Bottom Nav Height: 70px
```

---

## Phương Án 4: Sử dụng Figma Community Template

### Tìm Templates Tương Tự:
1. Mở Figma Community: https://www.figma.com/community
2. Tìm kiếm: "Mobile App UI Kit Elderly" hoặc "Senior Friendly Mobile UI"
3. Duplicate template và customize theo design của bạn

### Template Khuyên Dùng:
- **iOS UI Kit** - Apple Design Resources
- **Material Design Mobile Kit**
- **Elderly Friendly UI Components**

---

## Phương Án 5: Vẽ Lại Trong Figma (Khuyên Dùng Nhất)

### Workflow Chuyên Nghiệp:

#### 1. Setup File Structure
```
📁 Trợ Lý AI - Mobile App
  ├── 🎨 Design System
  │   ├── Colors
  │   ├── Typography
  │   ├── Spacing
  │   └── Icons
  ├── 📱 Components
  │   ├── Buttons
  │   ├── Cards
  │   ├── Input Fields
  │   └── Navigation
  └── 📱 Screens
      ├── 01 - Home/Upload
      ├── 02 - Processing
      ├── 03 - Result
      └── 04 - History
```

#### 2. Tạo Components
- Button Primary (Auto Layout)
- Button Secondary (Auto Layout)
- Card Component (Auto Layout)
- Bottom Navigation (Component Set)

#### 3. Sử dụng Auto Layout
- Padding: 20px, 15px, 12px
- Gap: 12px, 15px, 20px
- Direction: Vertical/Horizontal

#### 4. Create Variants
- Button States: Default, Hover, Pressed, Disabled
- Navigation States: Active, Inactive

---

## 🔗 Links & Resources

### Online Tools:
1. **Figma** (Main): https://www.figma.com
2. **html.to.design**: https://www.figma.com/community/plugin/1159123024924461424
3. **Penpot** (Open Source Alternative): https://penpot.app

### Tutorial Videos:
- "How to Import HTML to Figma" - YouTube
- "Figma Auto Layout Tutorial" - YouTube
- "Mobile App Design in Figma" - YouTube

### Icon Libraries:
- **FontAwesome for Figma**: https://www.figma.com/community/file/1068990664249035811
- **Iconify**: https://www.figma.com/community/plugin/735098390272716381

---

## 📝 Checklist để Import thành công:

- [ ] Cài đặt Figma Desktop hoặc sử dụng Web version
- [ ] Install plugin "html.to.design"
- [ ] Chụp screenshot các màn hình từ file HTML
- [ ] Tạo file Figma mới
- [ ] Setup Design System (Colors, Typography)
- [ ] Tạo Mobile Frame (375x812px)
- [ ] Vẽ 4 screens chính
- [ ] Tạo components có thể reuse
- [ ] Setup Auto Layout
- [ ] Test prototype flow
- [ ] Export design specs

---

## 💡 Pro Tips:

1. **Sử dụng Styles**: Tạo Color Styles và Text Styles để dễ quản lý
2. **Auto Layout**: Sử dụng Auto Layout cho mọi component
3. **Components**: Tạo components để reuse
4. **Constraints**: Set constraints để responsive
5. **Prototype**: Link các screens để tạo interactive prototype
6. **Export**: Export assets với @2x, @3x cho iOS

---

## 🎯 Kết Quả Mong Đợi:

Sau khi import và setup xong, bạn sẽ có:
- ✅ Design System hoàn chỉnh
- ✅ 4 mobile screens đẹp
- ✅ Components library
- ✅ Interactive prototype
- ✅ Developer handoff ready

---

## 📞 Support:

Nếu cần support thêm, tham khảo:
- Figma Help Center: https://help.figma.com
- Figma Community Forum: https://forum.figma.com
- YouTube: "Figma Tutorial for Beginners"
