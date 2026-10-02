/*
 * TEST MÜHƏRRİKİ (QUIZ ENGINE)
 * ================================================================
 * KSQ, BSQ və MİQ testlərinin hamısı bu ortaq mühərrikdən istifadə edir.
 * Hər test səhifəsi (ksq.html, bsq.html, miq.html) yalnız öz sual
 * massivini və tənzimləmələrini ("config") təyin edir, sonra
 * initQuiz(config) funksiyasını çağırır.
 *
 * config formatı:
 *   testId        – testin unikal kodu (statistika üçün, məs. "sinaq1")
 *   containerId   – quiz-card elementinin id-si
 *   introId       – quiz-intro elementinin id-si
 *   questions     – [{ q, options:[...4], correct: index, note }]
 *   passScore     – neçə düzgün cavabdan keçid sayılır
 *   timeLimit     – (opsional) saniyə ilə ümumi vaxt limiti
 *   passMessage   – keçid mesajı
 *   failMessage   – kəsilmə mesajı
 *   navigator     – (opsional) true olarsa sual qutucuqları çıxır, istənilən suala
 *                   keçmək və cavabı dəyişmək olar, nəticə yalnız test bitəndə göstərilir
 *   sual obyektində img – (opsional) sualın altında göstəriləcək şəklin yolu
 */

// Statistika Worker-inin ünvanı (eyni worker "cloudflare-worker.js" faylıdır)
const TRACK_WORKER_URL = "https://blue-tooth-d236.cografiya.workers.dev/track";

// Ad/Soyad/Gmail tələb olunan testlərin nəticələrini yazan Google Apps Script
// Web App ünvanı. Qurulma təlimatı üçün "apps-script-leaderboard.gs" faylına bax.
// Deploy etdikdən sonra aldığın ".../exec" ünvanını aşağıya yapışdır.
const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzgs1iQFyBlLYT72WkYlk58S3hJ34eyjW78-ejV9ikc4rm7yQl-3Q8M9Fnps0HJTi1C/exec";

function isSheetConfigured() {
    return SHEET_WEBAPP_URL && SHEET_WEBAPP_URL.indexOf("YOUR_") !== 0;
}

// Gmail formatını sadə şəkildə yoxlayır (ad@gmail.com)
function isValidGmail(email) {
    return /^[^\s@]+@gmail\.com$/i.test(String(email || "").trim());
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

// Nəticəni (ad, soyad, gmail, bal) Google Sheet-ə göndərir. Sheet tərəfi
// preflight (CORS) problemi yaranmasın deyə "text/plain" başlığı ilə
// göndərilir və Apps Script tərəfində JSON kimi oxunur.
function submitResultToSheet(payload) {
    if (!isSheetConfigured()) return;
    fetch(SHEET_WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
    }).catch(() => { /* göndərilməsə də testi pozmasın */ });
}

// Liderlik lövhəsini həmin testin id-sinə görə Sheet-dən çəkib göstərir
function renderLeaderboard(containerEl, entries) {
    if (!entries || !entries.length) {
        containerEl.innerHTML = `<div class="leaderboard-empty">Hələ nəticə yoxdur — ilk olan sən ol!</div>`;
        return;
    }
    const medals = ["🥇", "🥈", "🥉"];
    containerEl.innerHTML = entries.map((e, i) => `
        <div class="leaderboard-row">
            <span class="lb-rank">${medals[i] || (i + 1)}</span>
            <span class="lb-name">${escapeHtml(e.name)} ${escapeHtml(e.surname)}</span>
            <span class="lb-score">${escapeHtml(e.score)} / ${escapeHtml(e.total)}</span>
        </div>
    `).join("");
}

function loadLeaderboard(testId, wrapEl) {
    if (!wrapEl || !testId) return;
    const containerEl = wrapEl.querySelector(".quiz-leaderboard");
    if (!containerEl) return;

    if (!isSheetConfigured()) {
        wrapEl.style.display = "none";
        return;
    }

    containerEl.innerHTML = `<div class="leaderboard-loading">Yüklənir...</div>`;

    fetch(`${SHEET_WEBAPP_URL}?leaderboard=${encodeURIComponent(testId)}`)
        .then(res => res.json())
        .then(data => renderLeaderboard(containerEl, data.entries))
        .catch(() => {
            wrapEl.style.display = "none";
        });
}

// Testin başlanması/bitməsini Worker-ə bildirir. Şəbəkə xətası olsa belə
// istifadəçinin təcrübəsinə mane olmamaq üçün nəticəni gözləmirik.
function trackQuizEvent(testId, action, extra) {
    if (!testId) return;
    const params = new URLSearchParams({ test: testId, action });
    if (extra) {
        Object.keys(extra).forEach(k => params.set(k, extra[k]));
    }
    fetch(`${TRACK_WORKER_URL}?${params.toString()}`, { method: "POST" })
        .catch(() => { /* statistika uğursuz olsa, testi pozmasın */ });
}

// "Testə başla" düyməsinin altında "X nəfər sınayıb" statistikasını göstərir
function loadUsageCount(testId, introEl) {
    const countEl = introEl && introEl.querySelector("#quizUsageCount");
    if (!countEl || !testId) return;

    fetch(TRACK_WORKER_URL)
        .then(res => res.json())
        .then(data => {
            const stat = data.perTest && data.perTest[testId];
            const count = stat ? stat.started : 0;
            countEl.textContent = count.toLocaleString("az-AZ");
        })
        .catch(() => {
            // Statistika çəkilməsə, sətri gizlət ki, boş "—" görünməsin
            const wrap = countEl.closest(".quiz-usage-stat");
            if (wrap) wrap.style.display = "none";
        });
}

function initQuiz(config) {

    const intro = document.getElementById(config.introId);
    const card = document.getElementById(config.containerId);

    loadUsageCount(config.testId, intro);

    if (config.leaderboard) {
        loadLeaderboard(config.testId, intro.querySelector(".quiz-leaderboard-wrap"));
    }

    const startBtn = card.parentElement.querySelector(".quiz-start-btn");
    const userForm = intro.querySelector(".quiz-user-form");
    const userInfo = { name: "", surname: "", email: "" };

    const progressFill = card.querySelector(".quiz-progress-fill");
    const progressLabel = card.querySelector(".quiz-progress-label");
    const questionEl = card.querySelector(".quiz-question");
    const optionsEl = card.querySelector(".quiz-options");
    const nextBtn = card.querySelector(".quiz-next-btn");
    const timerEl = card.querySelector(".quiz-timer");
    const resultEl = card.querySelector(".quiz-result");
    const quizBody = card.querySelector(".quiz-body");

    let current = 0;
    let score = 0;
    let answered = false;
    let answers = [];
    const useNav = !!config.navigator;
    let navEl = null, prevBtn = null, finishBtn = null;
    let timeLeft = config.timeLimit || 0;
    let timerHandle = null;

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ":" + (s < 10 ? "0" : "") + s;
    }

    function startTimer() {

        if (!config.timeLimit) return;

        timerEl.style.display = "flex";
        timerEl.innerHTML = "⏱ " + formatTime(timeLeft);

        timerHandle = setInterval(() => {

            timeLeft--;
            timerEl.innerHTML = "⏱ " + formatTime(Math.max(timeLeft, 0));

            if (timeLeft <= 30) {
                timerEl.classList.add("warn");
            }

            if (timeLeft <= 0) {
                clearInterval(timerHandle);
                finishQuiz();
            }

        }, 1000);
    }

    function renderQuestion() {

        answered = false;
        nextBtn.classList.remove("ready");
        nextBtn.textContent = (current === config.questions.length - 1) ? "Nəticəni gör →" : "Növbəti sual →";
        if (useNav) {
            nextBtn.classList.add("ready");
            nextBtn.textContent = (current === config.questions.length - 1) ? "Testi bitir ✓" : "Növbəti →";
        }

        const total = config.questions.length;
        const pct = Math.round((current / total) * 100);

        progressFill.style.width = pct + "%";
        progressLabel.textContent = "Sual " + (current + 1) + " / " + total;

        const item = config.questions[current];
        questionEl.textContent = item.q;
        if (item.img) {
            const im = document.createElement("img");
            im.src = item.img;
            im.alt = "Sual şəkli";
            im.className = "quiz-question-img";
            questionEl.appendChild(im);
        }

        const letters = ["A", "B", "C", "D", "E", "F"];

        optionsEl.innerHTML = item.options.map((opt, i) => {
            return `
                <div class="quiz-option" data-index="${i}">
                    <span class="letter">${letters[i]}</span>
                    <span>${opt}</span>
                </div>
            `;
        }).join("");

        optionsEl.querySelectorAll(".quiz-option").forEach(el => {

            if (useNav) {
                if (answers[current] === parseInt(el.dataset.index, 10)) el.classList.add("selected");
                el.addEventListener("click", () => {
                    answers[current] = parseInt(el.dataset.index, 10);
                    optionsEl.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
                    el.classList.add("selected");
                    updateNav();
                });
                return;
            }

            el.addEventListener("click", () => {

                if (answered) return;
                answered = true;

                const chosen = parseInt(el.dataset.index, 10);
                const correct = item.correct;

                optionsEl.querySelectorAll(".quiz-option").forEach(o => o.classList.add("is-disabled"));

                if (chosen === correct) {
                    el.classList.add("correct");
                    score++;
                } else {
                    el.classList.add("wrong");
                    optionsEl.querySelector(`[data-index="${correct}"]`).classList.add("correct");
                }

                nextBtn.classList.add("ready");

            });

        });

        if (useNav) {
            if (prevBtn) prevBtn.style.visibility = current === 0 ? "hidden" : "visible";
            updateNav();
        }

    }

    // ---- Sual qutucuqları (navigator) ----
    function buildNav() {
        if (navEl) navEl.remove();
        navEl = document.createElement("div");
        navEl.className = "quiz-nav";
        navEl.innerHTML = config.questions.map((_, i) =>
            `<button type="button" class="quiz-nav-box" data-i="${i}">${i + 1}</button>`
        ).join("");
        navEl.addEventListener("click", (e) => {
            const b = e.target.closest(".quiz-nav-box");
            if (!b) return;
            current = parseInt(b.dataset.i, 10);
            renderQuestion();
        });
        quizBody.insertBefore(navEl, questionEl);

        if (!prevBtn) {
            prevBtn = document.createElement("button");
            prevBtn.type = "button";
            prevBtn.className = "quiz-prev-btn";
            prevBtn.textContent = "← Əvvəlki";
            prevBtn.addEventListener("click", () => {
                if (current > 0) { current--; renderQuestion(); }
            });
            finishBtn = document.createElement("button");
            finishBtn.type = "button";
            finishBtn.className = "quiz-finish-btn";
            finishBtn.textContent = "Testi bitir";
            finishBtn.addEventListener("click", tryFinish);
            const row = document.createElement("div");
            row.className = "quiz-nav-actions";
            row.appendChild(prevBtn);
            row.appendChild(nextBtn);
            row.appendChild(finishBtn);
            quizBody.appendChild(row);
        }
    }

    function updateNav() {
        if (!navEl) return;
        navEl.querySelectorAll(".quiz-nav-box").forEach((b, i) => {
            b.classList.toggle("answered", answers[i] !== null && answers[i] !== undefined);
            b.classList.toggle("current", i === current);
        });
        const left = answers.filter(a => a === null || a === undefined).length;
        progressLabel.textContent = "Sual " + (current + 1) + " / " + config.questions.length +
            " · Cavablanan: " + (config.questions.length - left);
        progressFill.style.width = Math.round(((config.questions.length - left) / config.questions.length) * 100) + "%";
    }

    function tryFinish() {
        const left = answers.filter(a => a === null || a === undefined).length;
        if (left > 0 && !confirm(left + " sual cavablandırılmayıb. Testi bitirmək istəyirsiniz?")) return;
        finishQuiz();
    }

    function finishQuiz() {

        if (timerHandle) clearInterval(timerHandle);

        if (useNav) {
            score = 0;
            config.questions.forEach((it, i) => { if (answers[i] === it.correct) score++; });
        }

        quizBody.style.display = "none";
        resultEl.classList.add("active");

        const total = config.questions.length;
        const passed = score >= config.passScore;

        trackQuizEvent(config.testId, "complete", {
            score: score,
            total: total,
            passed: passed ? "1" : "0"
        });

        if (config.collectUserInfo) {
            submitResultToSheet({
                testId: config.testId,
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.email,
                score: score,
                total: total,
                passed: passed
            });

            if (config.leaderboard) {
                setTimeout(() => {
                    loadLeaderboard(config.testId, intro.querySelector(".quiz-leaderboard-wrap"));
                }, 1500);
            }
        }

        resultEl.innerHTML = `
            <div class="quiz-result-score">${score}<span> / ${total}</span></div>
            <div class="quiz-result-verdict ${passed ? "pass" : "fail"}">
                ${passed ? "✓ Test uğurla keçildi" : "✗ Keçid balı toplanmadı"}
            </div>
            <p class="desc">${passed ? config.passMessage : config.failMessage}</p>
            <div class="quiz-result-actions">
                <button class="quiz-start-btn" id="retryBtn">↻ Yenidən başla</button>
                <a href="testler.html" class="quiz-btn-secondary">← Bütün testlər</a>
            </div>
        `;

        document.getElementById("retryBtn").addEventListener("click", () => {
            resetQuiz();
        });

    }

    function resetQuiz() {

        current = 0;
        score = 0;
        timeLeft = config.timeLimit || 0;

        if (config.shuffle) {
            config.questions = shuffle(config.questions);
        }

        resultEl.classList.remove("active");
        resultEl.innerHTML = "";
        quizBody.style.display = "block";
        timerEl.classList.remove("warn");

        answers = config.questions.map(() => null);
        if (useNav) buildNav();

        renderQuestion();
        startTimer();

    }

    nextBtn.addEventListener("click", () => {

        if (!nextBtn.classList.contains("ready")) return;

        if (useNav && current === config.questions.length - 1) { tryFinish(); return; }

        current++;

        if (current >= config.questions.length) {
            finishQuiz();
        } else {
            renderQuestion();
        }

    });

    function launchQuiz() {
        intro.style.display = "none";
        card.classList.add("active");
        trackQuizEvent(config.testId, "start");
        resetQuiz();
    }

    startBtn.addEventListener("click", () => {

        if (config.collectUserInfo && userForm) {
            startBtn.style.display = "none";
            userForm.style.display = "flex";
            const firstInput = userForm.querySelector("input");
            if (firstInput) firstInput.focus();
            return;
        }

        launchQuiz();
    });

    if (userForm) {

        const formError = userForm.querySelector(".quiz-form-error");

        userForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name = userForm.querySelector('[name="ad"]').value.trim();
            const surname = userForm.querySelector('[name="soyad"]').value.trim();
            const email = userForm.querySelector('[name="email"]').value.trim();

            if (!name || !surname) {
                formError.textContent = "Zəhmət olmasa ad və soyadınızı daxil edin.";
                formError.style.display = "block";
                return;
            }

            if (!isValidGmail(email)) {
                formError.textContent = "Zəhmət olmasa etibarlı bir Gmail ünvanı daxil edin (məs: [email protected]).";
                formError.style.display = "block";
                return;
            }

            formError.style.display = "none";
            userInfo.name = name;
            userInfo.surname = surname;
            userInfo.email = email;

            launchQuiz();
        });
    }

}
