# 🎨 HƯỚNG DẪN CHI TIẾT: Import HTML vào Figma bằng Plugin

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Phương Pháp 1: html.to.design](#phương-pháp-1-htmltodesign)
3. [Phương Pháp 2: Figma Import](#phương-pháp-2-figma-import)
4. [Phương Pháp 3: Manual Import](#phương-pháp-3-manual-import)
5. [Tối Ưu Sau Import](#tối-ưu-sau-import)
6. [Troubleshooting](#troubleshooting)

---

## 🛠 Chuẩn Bị

### Yêu Cầu:
- ✅ Tài khoản Figma (miễn phí hoặc trả phí)
- ✅ Trình duyệt: Chrome, Firefox, hoặc Edge
- ✅ File HTML đã có: `ai-reader-mobile-figma.html`

### Download Figma:
- **Desktop**: https://www.figma.com/downloads/
- **Web**: https://www.figma.com (không cần cài đặt)

---

## 🚀 Phương Pháp 1: html.to.design (KHUYÊN DÙNG NHẤT)

### Bước 1: Install Plugin

#### 1.1. Mở Figma Desktop hoặc Web
```
https://www.figma.com
```

#### 1.2. Tạo File Mới
- Click **"New design file"**
- Hoặc nhấn: `Ctrl + N` (Windows) / `Cmd + N` (Mac)

#### 1.3. Install Plugin
**Cách 1: Từ Menu**
```
Menu → Plugins → Browse plugins in Community
```

**Cách 2: Direct Link**
```
https://www.figma.com/community/plugin/1159123024924461424/html-to-design
```

**Cách 3: Search**
- Menu → Plugins → Browse plugins
- Tìm kiếm: "html.to.design"
- Click **"Install"**

![Plugin Install](https://i.imgur.com/placeholder.png)

---

### Bước 2: Prepare HTML Code

#### 2.1. Mở File HTML
- Mở file `ai-reader-mobile-figma.html` bằng **Notepad** hoặc **VS Code**

#### 2.2. Copy Toàn Bộ Code
**Option A: Từ Editor**
```
Ctrl + A (Select All)
Ctrl + C (Copy)
```

**Option B: Từ Browser**
- Mở file HTML trong Chrome/Firefox
- Right-click → **"View Page Source"** (Ctrl + U)
- Select All → Copy

#### 2.3. Clean Code (Optional)
Nếu code quá dài, bạn có thể copy từng section:
```html
<!-- Copy riêng từng phần -->
1. Design System Section
2. Screen 1: Home/Upload
3. Screen 2: Processing
4. Screen 3: Result & Read
5. Screen 4: History
```

---

### Bước 3: Import vào Figma

#### 3.1. Run Plugin
**Cách 1: Từ Menu**
```
Menu → Plugins → html.to.design → Run
```

**Cách 2: Quick Run**
```
Right-click trên canvas → Plugins → html.to.design
```

**Cách 3: Keyboard Shortcut**
```
Ctrl + / (hoặc Cmd + /)
Gõ: "html.to.design"
Nhấn Enter
```

#### 3.2. Plugin Interface
Plugin sẽ mở với giao diện:
```
┌─────────────────────────────────────┐
│  html.to.design                     │
├─────────────────────────────────────┤
│                                     │
│  [Paste HTML/CSS here]             │
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │  <!-- Paste code here -->    │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  Settings:                          │
│  ☑ Import Styles                   │
│  ☑ Import Images                   │
│  ☑ Responsive                      │
│                                     │
│  [   Import to Figma   ]           │
│                                     │
└─────────────────────────────────────┘
```

#### 3.3. Paste Code
- Click vào text area
- Paste code HTML: `Ctrl + V`
- Check settings:
  - ✅ **Import Styles** (colors, fonts)
  - ✅ **Import Images** (nếu có)
  - ✅ **Responsive** (auto layout)

#### 3.4. Import
- Click button: **"Import to Figma"**
- Đợi 10-30 giây (tùy độ dài code)
- Plugin sẽ tạo layers tự động

---

### Bước 4: Kiểm Tra Kết Quả

#### 4.1. Layers Panel
Check layers được tạo:
```
📁 Page 1
  ├── 📱 Mobile Frame 1
  │   ├── Status Bar
  │   ├── Header
  │   ├── Content
  │   └── Bottom Nav
  ├── 📱 Mobile Frame 2
  └── 🎨 Design System
```

#### 4.2. Verify Elements
Kiểm tra các thành phần:
- ✅ Colors đúng không?
- ✅ Font sizes đúng không?
- ✅ Spacing đúng không?
- ✅ Border radius đúng không?

---

## 🎯 Phương Pháp 2: Figma Import Plugin

### Plugin Alternative: "Figma Import"

#### Bước 1: Install Plugin
```
https://www.figma.com/community/plugin/735098390272716381/figma-import
```

#### Bước 2: Prepare File
**Option A: Import từ URL**
- Host file HTML lên server (GitHub Pages, Netlify)
- Copy URL

**Option B: Import từ File**
- Save HTML file local
- Plugin sẽ đọc file

#### Bước 3: Run Plugin
```
Menu → Plugins → Figma Import → Run
```

#### Bước 4: Choose Method
**URL Import:**
```
┌─────────────────────────────┐
│  Import from URL:           │
│  ┌───────────────────────┐  │
│  │ https://your-url.com │  │
│  └───────────────────────┘  │
│  [    Import    ]           │
└─────────────────────────────┘
```

**File Import:**
```
┌─────────────────────────────┐
│  Import from File:          │
│  [  Choose File  ]          │
│                             │
│  Selected: ai-reader.html   │
│  [    Import    ]           │
└─────────────────────────────┘
```

---

## 📝 Phương Pháp 3: Manual Import (Screenshot + Trace)

### Nếu Plugin Không Hoạt Động:

#### Bước 1: Take Screenshots
```bash
# Mở file HTML trong browser
# Zoom: 100%
# Resolution: 1920x1080 hoặc cao hơn
```

**Screenshot từng section:**
1. Design System (Color palette)
2. Mobile Screen 1
3. Mobile Screen 2
4. Mobile Screen 3
5. Mobile Screen 4

#### Bước 2: Import Screenshots vào Figma
```
Drag & Drop ảnh vào Figma canvas
hoặc
Menu → File → Place Image (Ctrl + Shift + K)
```

#### Bước 3: Trace Elements
- Đặt screenshot làm background layer
- Lock layer screenshot
- Vẽ lại từng element phía trên
- Sử dụng design tokens để match chính xác

---

## 🎨 Tối Ưu Sau Import

### Bước 1: Clean Up Layers

#### 1.1. Rename Layers
```
Bad:  Rectangle 1, Rectangle 2, Rectangle 3
Good: btn-primary, card-header, mobile-frame
```

#### 1.2. Group Related Elements
```
📁 Screen 1 - Home
  ├── 📱 Mobile Frame
  ├── 🎨 Header
  │   ├── Title
  │   └── Icon
  ├── 📦 Upload Section
  │   ├── Upload Zone
  │   └── Buttons
  └── 🔽 Bottom Nav
```

#### 1.3. Delete Unnecessary Layers
- Xóa các `<div>` rỗng
- Xóa các layer duplicate
- Xóa text placeholder

---

### Bước 2: Setup Auto Layout

#### 2.1. Convert to Auto Layout
```
Select element → Right-click → Add Auto Layout
hoặc
Shift + A
```

#### 2.2. Configure Auto Layout
**Vertical Stack:**
```
Direction: Vertical ↓
Spacing: 15px
Padding: 20px (all sides)
Alignment: Center
```

**Horizontal Stack:**
```
Direction: Horizontal →
Spacing: 12px
Padding: 20px 0px
Alignment: Center
```

#### 2.3. Nested Auto Layout
```
📦 Card (Auto Layout Vertical)
  ├── 🖼 Image (Fixed)
  ├── 📝 Text (Hug)
  └── 🔘 Buttons (Auto Layout Horizontal)
      ├── Button 1
      └── Button 2
```

---

### Bước 3: Create Components

#### 3.1. Button Component
**Create Component:**
```
Select button → Right-click → Create Component
hoặc
Ctrl + Alt + K (Windows)
Cmd + Option + K (Mac)
```

**Create Variants:**
```
Select all button components
Right-click → Combine as Variants
```

**Variants:**
```
📦 Button Component
  ├── 🟣 Primary
  ├── ⚪ Secondary
  ├── 🟢 Success
  ├── 🟠 Warning
  └── 🔵 Info
```

#### 3.2. Card Component
```
📦 Card Component
  ├── 🖼 Image Slot
  ├── 📝 Text Slot
  └── 🔘 Action Buttons
```

#### 3.3. Mobile Frame Component
```
📱 Mobile Frame (375 x 812px)
  ├── Status Bar (Component)
  ├── Content (Slot)
  └── Bottom Nav (Component)
```

---

### Bước 4: Create Styles

#### 4.1. Color Styles
**Create từ design tokens:**
```
Primary/Gradient → Gradient #667eea → #764ba2
Primary/Solid → #667eea
Success/Gradient → Gradient #11998e → #38ef7d
Success/Solid → #11998e
...
```

**Cách tạo:**
```
1. Select element có màu
2. Click vào màu trong Properties panel
3. Click icon "+" để tạo Style
4. Name: "Primary/Gradient"
5. Save
```

#### 4.2. Text Styles
```
Heading 1 → 56px, Bold 700
Heading 2 → 32px, SemiBold 600
Body Large → 22.4px, Regular 400
Button → 19.2px, Bold 700
Caption → 13.6px, Regular 400
```

**Cách tạo:**
```
1. Select text
2. Click "..." trong Text properties
3. Create new style
4. Name: "Heading 1"
5. Save
```

#### 4.3. Effect Styles (Shadows)
```
Shadow/Small → Drop Shadow (0, 3px, 10px, rgba(0,0,0,0.1))
Shadow/Medium → Drop Shadow (0, 4px, 15px, rgba(0,0,0,0.1))
Shadow/Large → Drop Shadow (0, 10px, 40px, rgba(0,0,0,0.2))
```

---

### Bước 5: Setup Constraints

#### 5.1. Responsive Constraints
**Mobile Frame:**
```
Width: Fixed 375px
Height: Fixed 812px
```

**Content Inside:**
```
Left & Right: Scale
Top & Bottom: Scale
or
Left & Right: Left & Right (stretch)
```

#### 5.2. Test Responsiveness
```
Resize container → Elements adjust automatically
```

---

## 🔗 Tạo Prototype Flow

### Bước 1: Create Connections

#### 1.1. Link Screens
```
Screen 1 (Home) → Screen 2 (Processing)
Screen 2 (Processing) → Screen 3 (Result)
Screen 3 (Result) → Screen 4 (History)
Screen 4 (History) → Screen 1 (Home)
```

#### 1.2. Add Hotspots
**Cách tạo connection:**
```
1. Click "Prototype" tab (top-right)
2. Select button/element
3. Drag connector (+) to target screen
4. Configure interaction
```

#### 1.3. Configure Interactions
```
Trigger: On Click
Action: Navigate to
Destination: Screen 2
Animation: Slide Left
Duration: 300ms
Easing: Ease Out
```

---

### Bước 2: Add Interactions

#### 2.1. Button States
**Hover:**
```
Default State → Hover State
Trigger: While Hovering
Action: Change to (Hover variant)
Animation: Instant
```

**Pressed:**
```
Hover State → Pressed State
Trigger: While Pressing
Action: Change to (Pressed variant)
Animation: Instant
```

#### 2.2. Micro-interactions
**Loading Spinner:**
```
Animation: Rotation
Duration: 1000ms
Loop: Infinite
```

**Progress Bar:**
```
Animation: Width 0% → 100%
Duration: 2000ms
Easing: Ease In Out
```

---

### Bước 3: Test Prototype

#### 3.1. Preview Mode
```
Click "Present" button (top-right)
hoặc
Ctrl + Alt + Enter (Windows)
Cmd + Option + Enter (Mac)
```

#### 3.2. Test Flow
- Click các buttons
- Verify animations
- Check transitions
- Test all paths

---

## 📤 Export & Handoff

### Developer Handoff

#### Bước 1: Enable Dev Mode
```
Click "Dev Mode" (top-right)
hoặc
Shift + D
```

#### Bước 2: Inspect Elements
```
Select element → Dev panel shows:
- CSS Properties
- Colors (HEX, RGB)
- Dimensions
- Spacing
- Typography
```

#### Bước 3: Export Code
```
Copy as:
- CSS
- iOS (Swift)
- Android (XML)
- React Native
```

#### Bước 4: Export Assets
```
Select element → Export settings:
- Format: PNG, SVG, JPG
- Scale: @1x, @2x, @3x
- Export
```

---

## 🐛 Troubleshooting

### Problem 1: Plugin Không Install Được

**Solution:**
```
1. Check internet connection
2. Refresh Figma page
3. Try incognito mode
4. Clear browser cache
5. Try Figma Desktop app
```

---

### Problem 2: Code Không Import Được

**Solution:**
```
1. Kiểm tra HTML syntax có đúng không
2. Remove các script tags
3. Simplify CSS (remove animations)
4. Import từng section riêng lẻ
5. Thử plugin khác
```

**Code Cleaning:**
```html
<!-- Remove this -->
<script>...</script>

<!-- Keep only -->
<div class="...">
  <style>...</style>
  <!-- HTML content -->
</div>
```

---

### Problem 3: Styles Không Giữ Được

**Solution:**
```
1. Plugin có thể không support CSS variables
2. Convert CSS variables thành giá trị cụ thể:
   
   Bad:  color: var(--primary);
   Good: color: #667eea;

3. Hoặc tạo styles manually sau import
```

---

### Problem 4: Layout Bị Vỡ

**Solution:**
```
1. Remove absolute positioning
2. Use flexbox/grid
3. Add Auto Layout manually sau import
4. Adjust constraints
```

---

### Problem 5: Images Không Hiển Thị

**Solution:**
```
1. Convert images to base64
2. Use inline SVG thay vì <img>
3. Host images online
4. Import images manually sau
```

---

## 📚 Resources & Links

### Plugins:
- **html.to.design**: https://www.figma.com/community/plugin/1159123024924461424
- **Figma Import**: https://www.figma.com/community/plugin/735098390272716381
- **Anima**: https://www.figma.com/community/plugin/857346721138427857

### Learning Resources:
- **Figma Tutorial**: https://www.youtube.com/figma
- **Figma Learn**: https://help.figma.com/hc/en-us
- **Community**: https://forum.figma.com

### Icon Libraries:
- **Font Awesome**: https://www.figma.com/community/file/1068990664249035811
- **Material Icons**: https://www.figma.com/community/file/878585965681562011
- **Iconify**: https://www.figma.com/community/plugin/735098390272716381

---

## ✅ Checklist Hoàn Thành

### Pre-Import:
- [ ] Figma account created
- [ ] Plugin installed
- [ ] HTML code prepared
- [ ] Code cleaned (remove scripts)

### Import:
- [ ] Code pasted vào plugin
- [ ] Settings configured
- [ ] Import successful
- [ ] All screens imported

### Post-Import:
- [ ] Layers renamed
- [ ] Elements grouped
- [ ] Auto Layout added
- [ ] Components created
- [ ] Styles created
- [ ] Constraints set

### Prototype:
- [ ] Screens connected
- [ ] Interactions added
- [ ] Animations configured
- [ ] Prototype tested

### Handoff:
- [ ] Dev Mode enabled
- [ ] Assets exported
- [ ] Code snippets copied
- [ ] Documentation created

---

## 🎯 Kết Quả Cuối Cùng

Sau khi hoàn thành, bạn sẽ có:

✅ **Design System** hoàn chỉnh với:
- Color styles
- Text styles
- Effect styles (shadows)
- Grid layouts

✅ **Components Library**:
- Buttons (với variants)
- Cards
- Mobile frame
- Navigation

✅ **4 Mobile Screens**:
- Home/Upload
- Processing
- Result & Read
- History

✅ **Interactive Prototype**:
- Screen flows
- Button interactions
- Animations
- Transitions

✅ **Developer Handoff**:
- CSS exports
- Asset exports
- Specifications
- Documentation

---

## 🎓 Pro Tips

1. **Always backup**: Duplicate file trước khi import
2. **Import in chunks**: Import từng section thay vì cả file
3. **Use components**: Tạo components để reuse
4. **Organize layers**: Name và group đúng cách
5. **Test thoroughly**: Test prototype trên mobile device
6. **Document**: Viết notes cho developer
7. **Version control**: Sử dụng Figma version history

---

## 💬 Support

Nếu gặp vấn đề, tham khảo:
- 🔗 Figma Community Forum
- 📧 Email: support@figma.com
- 💬 Discord: Figma Community
- 📺 YouTube: "Figma Tutorial"

---

**Happy Designing! 🎨✨**

Created by: AI Assistant
Date: October 9, 2025
Version: 1.0
