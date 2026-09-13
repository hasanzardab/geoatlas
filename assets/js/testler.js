/*
 * TEST MÜHƏRRİKİ (QUIZ ENGINE)
 * ================================================================
 * KSQ, BSQ və MİQ testlərinin hamısı bu ortaq mühərrikdən istifadə edir.
 * Hər test səhifəsi (ksq.html, bsq.html, miq.html) yalnız öz sual
 * massivini və tənzimləmələrini ("config") təyin edir, sonra
 * initQuiz(config) funksiyasını çağırır.
 *
 * config formatı:
 *   containerId   – quiz-card elementinin id-si
 *   introId       – quiz-intro elementinin id-si
 *   questions     – [{ q, options:[...4], correct: index, note }]
 *   passScore     – neçə düzgün cavabdan keçid sayılır
 *   timeLimit     – (opsional) saniyə ilə ümumi vaxt limiti
 *   passMessage   – keçid mesajı
 *   failMessage   – kəsilmə mesajı
 */

function initQuiz(config) {

    const intro = document.getElementById(config.introId);
    const card = document.getElementById(config.containerId);

    const startBtn = card.parentElement.querySelector(".quiz-start-btn");

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

        const total = config.questions.length;
        const pct = Math.round((current / total) * 100);

        progressFill.style.width = pct + "%";
        progressLabel.textContent = "Sual " + (current + 1) + " / " + total;

        const item = config.questions[current];
        questionEl.textContent = item.q;

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

    }

    function finishQuiz() {

        if (timerHandle) clearInterval(timerHandle);

        quizBody.style.display = "none";
        resultEl.classList.add("active");

        const total = config.questions.length;
        const passed = score >= config.passScore;

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

        renderQuestion();
        startTimer();

    }

    nextBtn.addEventListener("click", () => {

        if (!nextBtn.classList.contains("ready")) return;

        current++;

        if (current >= config.questions.length) {
            finishQuiz();
        } else {
            renderQuestion();
        }

    });

    startBtn.addEventListener("click", () => {
        intro.style.display = "none";
        card.classList.add("active");
        resetQuiz();
    });

}
