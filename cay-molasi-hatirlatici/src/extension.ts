import * as vscode from 'vscode';

let cayMolasiTimer: NodeJS.Timeout | null = null;
let statusBarItem: vscode.StatusBarItem;
let baslangicZamani: Date | null = null;
let cayMolasiAktif = false;

export function activate(context: vscode.ExtensionContext) {
    console.log('Çay Molası Extension aktif edildi! 🫖');

    // Status bar item oluştur
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'cayMolasi.ayarlar';
    context.subscriptions.push(statusBarItem);
    
    // Komutları kaydet
    let baslat = vscode.commands.registerCommand('cayMolasi.baslat', () => {
        cayMolasiBaslat();
    });
    
    let durdur = vscode.commands.registerCommand('cayMolasi.durdur', () => {
        cayMolasiDurdur();
    });
    
    let ayarlar = vscode.commands.registerCommand('cayMolasi.ayarlar', () => {
        ayarlariGoster();
    });

    context.subscriptions.push(baslat, durdur, ayarlar);
    
    // Extension başladığında otomatik başlat
    cayMolasiBaslat();
}

function cayMolasiBaslat() {
    if (cayMolasiAktif) {
        vscode.window.showInformationMessage('Çay molası zaten aktif! 🫖');
        return;
    }

    const config = vscode.workspace.getConfiguration('cayMolasi');
    const sure = config.get<number>('sure') || 25;
    
    cayMolasiAktif = true;
    baslangicZamani = new Date();
    
    // Status bar'ı güncelle
    statusBarGuncelle();
    
    // Timer'ı başlat
    cayMolasiTimer = setTimeout(() => {
        cayMolasiHatirlatici();
    }, sure * 60 * 1000); // dakikayı milisaniyeye çevir
    
    vscode.window.showInformationMessage(`Çay molası ${sure} dakika sonra hatırlatılacak! 🫖`);
}

function cayMolasiDurdur() {
    if (cayMolasiTimer) {
        clearTimeout(cayMolasiTimer);
        cayMolasiTimer = null;
    }
    
    cayMolasiAktif = false;
    baslangicZamani = null;
    statusBarGuncelle();
    
    vscode.window.showInformationMessage('Çay molası durduruldu! 😴');
}

function cayMolasiHatirlatici() {
    const config = vscode.workspace.getConfiguration('cayMolasi');
    const mesajlar = config.get<string[]>('mesajlar') || ['Çay zamanı! 🫖'];
    
    // Rastgele mesaj seç
    const rastgeleMesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];
    
    // Notification göster
    const secenekler = ['Çay İçiyorum! 🫖', 'Biraz Daha Kodlayayım 🖥️', '5 Dakika Sonra'];
    
    vscode.window.showInformationMessage(rastgeleMesaj, ...secenekler).then(selection => {
        if (selection === 'Çay İçiyorum! 🫖') {
            // 5 dakika çay molası
            vscode.window.showInformationMessage('Afiyet olsun! 5 dakika sonra tekrar başlayalım! 🫖');
            setTimeout(() => {
                vscode.window.showInformationMessage('Çay molası bitti! Kodlamaya dönelim! 💻');
                cayMolasiBaslat(); // Yeniden başlat
            }, 5 * 60 * 1000);
        } else if (selection === '5 Dakika Sonra') {
            // 5 dakika sonra tekrar hatırlatır
            cayMolasiTimer = setTimeout(() => {
                cayMolasiHatirlatici();
            }, 5 * 60 * 1000);
        } else {
            // "Biraz Daha Kodlayayım" - normal süreyle devam et
            cayMolasiBaslat();
        }
    });
}

function statusBarGuncelle() {
    if (!cayMolasiAktif) {
        statusBarItem.text = "🫖 Çay Molası: Kapalı";
        statusBarItem.tooltip = "Çay molası başlatmak için tıkla ";
        statusBarItem.show();
        return;
    }
    
    if (!baslangicZamani) return;
    
    const config = vscode.workspace.getConfiguration('cayMolasi');
    const sure = config.get<number>('sure') || 25;
    
    const gecenSure = Math.floor((Date.now() - baslangicZamani.getTime()) / 1000 / 60);
    const kalanSure = sure - gecenSure;
    
    if (kalanSure > 0) {
        statusBarItem.text = `🫖 Çay molası: ${kalanSure}dk`;
        statusBarItem.tooltip = `${kalanSure} dakika sonra çay molası hatırlatılacak`;
    } else {
        statusBarItem.text = "🫖 Çay zamanı!";
        statusBarItem.tooltip = "🎉 Çay molası zamanı geldi!";
    }
    
    statusBarItem.show();
}

function ayarlariGoster() {
    const secenekler = ['Süreyi Değiştir', 'Mesajları Düzenle', 'Başlat', 'Durdur'];
    
    vscode.window.showQuickPick(secenekler, {
        placeHolder: 'Ne yapmak istiyorsun?'
    }).then(selection => {
        if (selection === 'Başlat') {
            cayMolasiBaslat();
        } else if (selection === 'Durdur') {
            cayMolasiDurdur();
        } else if (selection === 'Süreyi Değiştir') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'cayMolasi.sure');
        } else if (selection === 'Mesajları Düzenle') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'cayMolasi.mesajlar');
        }
    });
}

// Her 30 saniyede status bar'ı güncelle
setInterval(() => {
    if (cayMolasiAktif) {
        statusBarGuncelle();
    }
}, 30000);

export function deactivate() {
    if (cayMolasiTimer) {
        clearTimeout(cayMolasiTimer);
    }
}

/* burada ne yapıyoruz

✅ Çay molası timer'ı başlatır/durdurur
✅ Status bar'da geri sayım gösterir
✅ Rastgele Türkçe mesajlar gösterir
✅ "Çay içiyorum" deyince 5dk mola verir
✅ Ayarlar menüsü var

*/