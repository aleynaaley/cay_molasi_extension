# 🫖 Çay Molası Hatırlatıcısı

**Türk geliştirici kültürüne özel VS Code extension'ı!**

Uzun kodlama seansları sırasında çay molası vermeyi unutuyorsun? Bu extension tam sana göre! Belirli aralıklarla sevimli Türkçe mesajlarla çay molası hatırlatır ve sağlıklı kodlama alışkanlıkları geliştirmene yardımcı olur.Türk kültürü ve benim önemli bir parçası olan çaya gereken değerin bir gün verilmesi dileğiyle :)

## ✨ Özellikler

- 🕐 **Özelleştirilebilir Süre**: 5-120 dakika arası çay molası aralıkları
- 🎯 **Akıllı Hatırlatıcı**: Kodlama yaparken nazikçe hatırlatır
- 📊 **Status Bar Entegrasyonu**: Geri sayım ve durum göstergesi
- 🎭 **Eğlenceli Türkçe Mesajlar**: "Çay demlenme süresi geldi!", gibi
- ⚙️ **Kolay Ayarlar**: Mesajları ve süreyi kolayca özelleştir
- 🎮 **Esnek Kontrol**: Başlat, durdur, ertelemek istediğin gibi

## 🚀 Kurulum

### VS Code Marketplace'den (Yakında)
1. VS Code Extensions paneline git (`Ctrl+Shift+X`)
2. "Çay Molası Hatırlatıcısı" ara
3. Install'a tıkla

### Manual Kurulum (.vsix dosyası ile)
1. Bu repository'den `.vsix` dosyasını indir
2. VS Code Extensions paneli → `...` menü → `Install from VSIX...`
3. İndirdiğin `.vsix` dosyasını seç

## 📖 Kullanım

### Hızlı Başlangıç
1. `Ctrl+Shift+P` ile Command Palette'i aç
2. "Çay Molası Başlat" yazıp Enter'a bas
3. Status bar'da geri sayımı izle
4. Çay molası zamanı geldiğinde bildirim alacaksın!

### Komutlar
- **Çay Molası Başlat**: Timer'ı başlatır (varsayılan: 25 dakika)
- **Çay Molası Durdur**: Aktif timer'ı durdurur
- **Çay Molası Ayarları**: Hızlı ayarlar menüsünü açar

### Status Bar
Sağ alt köşede çay fincanı ikonu (🫖) ile:
- Kalan süreyi gösterir
- Tıklayarak ayarlara erişebilirsin
- Çay zamanı geldiğinde parlak renkte uyarır

## ⚙️ Ayarlar

### VS Code Settings ile
`File > Preferences > Settings` → "çay molası" ara

**Mevcut Ayarlar:**
- `cayMolasi.sure`: Hatırlatma süresi (dakika, varsayılan: 25)
- `cayMolasi.mesajlar`: Özel hatırlatma mesajları listesi


## 🎭 Varsayılan Mesajlar

Extension şu eğlenceli mesajlarla hatırlatır:
- "Çay demlenme süresi geldi! ☕"
- "Çayını al, kodu bırak! ✨"
- "Bi çay içsek ne olur ki? 😄"

## 🔧 Geliştirme

### Gereksinimler
- Node.js 14+
- VS Code 1.74.0+
- TypeScript


### Build
```bash
npm run package
```


## 🙏 Teşekkürler

Bu extension, Türkiye'deki geliştirici kültürü ve benim çay sevgisimden ilham alınarak yapılmıştır. Sağlıklı kodlama alışkanlıkları geliştirmek ve çay molası kültürünü dijitalleştirmek amacıyla oluşturuldu.

**İyi çaylar, iyi kodlar! 🫖💻**

---