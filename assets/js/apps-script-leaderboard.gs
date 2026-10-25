/**
 * ============================================================
 * cografiya.org — MİQ nəticələri üçün Google Apps Script Web App
 * ============================================================
 *
 * NƏ ÜÇÜNDÜR?
 * Bu skript sənin Google Sheet-inə bağlanır və iki iş görür:
 *   1) doPost  — sayt tərəfindən göndərilən (ad, soyad, gmail, bal)
 *                məlumatını sətir kimi Sheet-ə əlavə edir.
 *   2) doGet   — "?leaderboard=miq" sorğusu gələndə həmin testin
 *                liderlik lövhəsini (ən yüksək bal, ad üzrə təkrarsız)
 *                JSON formatında qaytarır.
 *
 * QURULMA ADDIMLARI:
 *   1. Yeni bir Google Sheet aç (və ya mövcud olanı istifadə et).
 *   2. Menyudan: Uzantılar (Extensions) → Apps Script.
 *   3. Açılan editordakı bütün nümunə kodu sil, bunun yerinə bu
 *      faylın tam məzmununu yapışdır.
 *   4. Yuxarıdan "Yadda saxla" (💾) düyməsini bas.
 *   5. Sağ yuxarıda "Yerləşdir" (Deploy) → "Yeni yerləşdirmə"
 *      (New deployment) düyməsini bas.
 *   6. "Tip seç" hissəsində dişli çarxa bas → "Veb tətbiq" (Web app).
 *   7. Tənzimləmələr:
 *        - Execute as:      Me (özün)
 *        - Who has access:  Anyone (hər kəs)
 *   8. "Deploy" düyməsinə bas, Google icazə istəyəcək — öz hesabınla
 *      təsdiqlə (bu sənin öz skriptindir, təhlükəsizdir).
 *   9. Sənə verilən Web App URL-ni (".../exec" ilə bitən) kopyala.
 *  10. Bu URL-ni "testler.js" faylındakı SHEET_WEBAPP_URL sabitinin
 *      yerinə yapışdır:
 *
 *          const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/.../exec";
 *
 * QEYD: Sheet-i kodu dəyişəndən sonra hər dəfə YENİ bir "Deploy"
 * versiyası çıxarmaq lazımdır (və ya mövcud deploy-u "Manage
 * deployments" → qələm ikonu → "New version" ilə yeniləmək).
 * ============================================================
 */

const SHEET_NAME = "Nəticələr";
const HEADERS = ["Tarix", "Test", "Ad", "Soyad", "Gmail", "Bal", "Maksimum", "Nəticə"];
const LEADERBOARD_LIMIT = 10;

function getSheet_() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        sheet.appendRow(HEADERS);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }
    return sheet;
}

function jsonOutput_(obj) {
    return ContentService
        .createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
}

// Sayt bu ünvana POST edir (adətən text/plain başlığı ilə, CORS
// preflight problemi yaranmasın deyə), biz gövdəni JSON kimi oxuyuruq.
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = getSheet_();

        sheet.appendRow([
            new Date(),
            data.testId || "",
            data.name || "",
            data.surname || "",
            data.email || "",
            data.score,
            data.total,
            data.passed ? "Keçdi" : "Kəsildi"
        ]);

        return jsonOutput_({ status: "ok" });

    } catch (err) {
        return jsonOutput_({ status: "error", message: String(err) });
    }
}

// "?leaderboard=miq" sorğusu ilə çağırılır, həmin testin ən yaxşı
// nəticələrini (hər gmail üçün ən yüksək bal, yalnız bir dəfə) qaytarır.
function doGet(e) {

    const testId = e.parameter && e.parameter.leaderboard;
    if (!testId) {
        return jsonOutput_({ status: "error", message: "leaderboard parametri yoxdur" });
    }

    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    values.shift(); // başlıq sətrini at

    const bestByEmail = {};

    values.forEach(row => {
        const [date, rowTestId, name, surname, email, score, total] = row;
        if (String(rowTestId) !== String(testId)) return;

        const key = (email || (name + " " + surname)).toString().toLowerCase();
        const existing = bestByEmail[key];

        if (!existing || Number(score) > Number(existing.score)) {
            bestByEmail[key] = {
                name: name,
                surname: surname,
                score: Number(score),
                total: Number(total),
                date: date
            };
        }
    });

    const entries = Object.values(bestByEmail)
        .sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date))
        .slice(0, LEADERBOARD_LIMIT)
        .map(e => ({ name: e.name, surname: e.surname, score: e.score, total: e.total }));

    return jsonOutput_({ status: "ok", entries: entries });
}
