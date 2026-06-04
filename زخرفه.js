let selectedProduct = "";
let selectedQuality = "";
let selectedColor = "";

let historyStack = [];

/* =========================
   خريطة الألوان الحقيقية
========================= */
const colorMap = {
    "أبيض": "#ffffff",
    "أسود": "#000000",
    "أحمر": "#ff0000",
    "أزرق": "#0066ff",
    "أخضر": "#008000",
    "أصفر": "#ffd500",
    "رمادي": "#808080",
    "بني": "#8b4513",
    "بيج": "#d9c7a4",
    "بنفسجي": "#8000ff",
    "وردي": "#ff69b4",
    "برتقالي": "#ff7b00",
    "كحلي": "#001f5b",
    "زيتي": "#556b2f",
    "ذهبي": "#d4a24c",
    "فضي": "#c0c0c0",
    "سماوي": "#87ceeb",
    "تركوازي": "#40e0d0",
    "نبيتي": "#800020",
    "ليموني": "#dfff00",
    "لافندر": "#b57edc",
    "طوبي": "#b22222",
    "رمادي فاتح": "#d3d3d3",
    "رمادي غامق": "#555555",
    "عنابي": "#6d071a",
    "كبدي": "#5c1f1f",
    "بني غامق": "#3e2723"
};

/* =========================
   تحديث الملخص
========================= */
function updateSummary(){
    document.getElementById("summaryName").innerText = document.getElementById("name").value || "-";
    document.getElementById("summaryPhone").innerText = document.getElementById("phone").value || "-";
    document.getElementById("summaryCategory").innerText = document.getElementById("category").value || "-";
    document.getElementById("summaryType").innerText = selectedProduct + (selectedQuality ? " - " + selectedQuality : "");
    document.getElementById("summaryColor").innerText = selectedColor || "-";
    document.getElementById("summarySize").innerText = document.getElementById("size").value || "-";
    document.getElementById("summaryPickup").innerText = document.getElementById("pickup").value || "-";
    let babyQty = document.getElementById("babyQty");

let detailsText = document.getElementById("details").value || "";

if(selectedProduct === "مواليد" && babyQty){
    detailsText =
    "عدد القطع: " + (babyQty.value || "-") +
    (detailsText ? "\n" + detailsText : "");
}

document.getElementById("summaryDetails").innerText =
detailsText || "-";
}

function scrollToForm(){
    document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
}

function pushState(html){
    historyStack.push(html);
}

function goBack(){
    if(historyStack.length > 1){
        historyStack.pop();
        document.getElementById("productsBox").innerHTML = historyStack[historyStack.length - 1];
    }
}

/* =========================
   الأقسام
========================= */
function showCategoryProducts(){
    let category = document.getElementById("category").value;
    let box = document.getElementById("productsBox");

    historyStack = [];
    selectedProduct = "";
    selectedQuality = "";
    selectedColor = "";

    box.innerHTML = "";

    if(category === "جملة"){
        box.innerHTML = `
        <div class="product-card" onclick="openProduct('تيشيرت')">
            <img src="images/تيشرت-جمله.PNG">
            <p>تيشيرت</p>
        </div>

        <div class="product-card" onclick="openProduct('كابات')">
            <img src="images/كابات.PNG">
            <p>كابات</p>
        </div>

        <div class="product-card" onclick="openProduct('يلقات')">
            <img src="images/يلقات.PNG">
            <p>يلقات</p>
        </div>`;

    }else if(category === "تجزئة"){

    box.innerHTML = `
 <div class="product-card" onclick="showTshirtColors()">
    <img src="images/تيشيرت-تجزئه.PNG">
    <p>تيشيرت</p>
</div>

<div class="product-card" onclick="showHoodieColors()">
    <img src="images/هودي.PNG">
    <p>هودي</p>
</div>

<div class="product-card" onclick="showAnimeHoodieColors()">
    <img src="images/2026_06_01_19_38_IMG_4074.JPG">
    <p>بلوفرات انمي</p>
</div>
<div class="product-card" onclick="showBabyEmbroidery()">
    <img src="images/مواليد (1).JPG">
    <p>مواليد</p>
</div>
<div class="product-card" onclick="showCapsColors()">
    <img src="images/كابات.PNG">
    <p>كابات</p>
</div>`;
}

    pushState(box.innerHTML);
    updateSummary();
}
function showBabyEmbroidery() {
    document.getElementById("sizeContainer").style.display = "none";
    document.getElementById("size").value = "";

    selectedProduct = "مواليد";
    selectedQuality = "";
    selectedColor = "";

    let html = `
        <button class="back-btn" onclick="goBack()">
            رجوع
        </button>

        <div style="width:100%;">

            <p style="
                text-align:center;
                margin-bottom:15px;
                font-weight:bold;
                color:#d4a24c;
            ">
                العميل يوفر القماش ويتم التطريز عليه
            </p>

            <input
                type="number"
                id="babyQty"
                min="1"
                placeholder="عدد القطع"
                onkeyup="updateSummary()"
                onchange="updateSummary()">
        </div>
    `;

    document.getElementById("productsBox").innerHTML = html;

    pushState(html);

    updateSummary();
}

/* =========================
   الجملة
========================= */
function openProduct(product){

    selectedProduct = product;
    selectedQuality = "";
    selectedColor = "";

    let box = document.getElementById("productsBox");
    let html = "";

    if(product === "تيشيرت"){

        html = `
        <div class="product-card quality-card" onclick="openQuality('تيشيرت','ممتازة')">
            <p>خامة ممتازة</p>
        </div>

        <div class="product-card quality-card" onclick="openQuality('تيشيرت','متوسطة')">
            <p>خامة متوسطة</p>
        </div>

        <button class="back-btn" onclick="goBack()">رجوع</button>`;

    }else{
        html = getColorsHTML();
    }

    box.innerHTML = html;
    pushState(html);
    updateSummary();
}

function openQuality(product, quality){

    selectedProduct = product;
    selectedQuality = quality;

    let html = getColorsHTML();

    document.getElementById("productsBox").innerHTML = html;

    pushState(html);

    updateSummary();
}

/* =========================
   إنشاء دوائر الألوان
========================= */
function getColorsHTML(){

    let colors = Object.keys(colorMap);

    let html = `
    <button class="back-btn" onclick="goBack()">رجوع</button>

    <div class="colors-grid">
    `;

    colors.forEach(color => {

        html += `
        <div 
            class="color-circle"
            data-name="${color}"
            style="background:${colorMap[color]}"
            onclick="selectColor('${color}', this)">
        </div>`;
    });

    html += `</div>`;

    return html;
}

/* =========================
   تجزئة
========================= */

function showTshirtColors(){
    document.getElementById("sizeContainer").style.display = "block";

    selectedProduct = "تيشيرت";
    selectedQuality = "";
    selectedColor = "";

    const colors = [
        "أبيض",
        "أسود"
    ];

    renderSpecificColors(colors);
}

function showHoodieColors(){
    document.getElementById("sizeContainer").style.display = "block";

    selectedProduct = "هودي";
    selectedQuality = "";
    selectedColor = "";

    const colors = [
        "أبيض",
        "أسود"
    ];

    renderSpecificColors(colors);
}

function showCapsColors() {
    document.getElementById("sizeContainer").style.display = "block";

    selectedProduct = "كابات";
    selectedQuality = "";
    selectedColor = "";

    const colors = [
        "بيج",
        "أسود",
        "كبدي",
        "رمادي",
        "بني غامق",
        "أبيض"
    ];

    renderSpecificColors(colors);
}

function showAnimeHoodieColors() {
    document.getElementById("sizeContainer").style.display = "block";

    selectedProduct = "بلوفرات انمي";
    selectedQuality = "";
    selectedColor = "";

    const colors = [
        "أبيض",
        "أسود",
        "فضي",
        "رمادي",
        "بيج"
    ];

    renderSpecificColors(colors);
}

/* =========================
   عرض الألوان
========================= */

function renderSpecificColors(colors) {

    let html = `
        <button class="back-btn" onclick="goBack()">
            رجوع
        </button>

        <div class="colors-grid">
    `;

    colors.forEach(color => {

        html += `
            <div
                class="color-circle"
                data-name="${color}"
                style="background:${colorMap[color]}"
                onclick="selectColor('${color}', this)">
            </div>
        `;
    });

    html += `
        </div>
    `;

    document.getElementById("productsBox").innerHTML = html;

    pushState(html);
    updateSummary();
}

/* =========================
   اختيار اللون
========================= */
function selectColor(color, element){

    selectedColor = color;

    document.querySelectorAll(".color-circle").forEach(item => {
        item.classList.remove("active");
    });

    element.classList.add("active");

    updateSummary();
}

/* =========================
   واتساب
========================= */
function sendWhatsApp(){
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert(){
    document.getElementById("customAlert").style.display = "none";
}

function continueWhatsApp(){

    closeAlert();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let category = document.getElementById("category").value;
    let size = document.getElementById("size").value;
    let details = document.getElementById("details").value;
    let pickup = document.getElementById("pickup").value;

    let message =
    "✨ *طلب جديد من موقع زخرفة* ✨\n\n" +
    "👤 *الاسم:* " + (name || "لم يذكر") + "\n" +
    "📱 *الجوال:* " + (phone || "لم يذكر") + "\n" +
    "-------------------------\n" +
    "📂 *القسم:* " + (category || "لم يذكر") + "\n" +
    "👕 *المنتج:* " + (selectedProduct || "لم يحدد") + "\n" +
    "🌟 *الجودة:* " + (selectedQuality || "لم تحدد") + "\n" +
    "🎨 *اللون:* " + (selectedColor || "لم يحدد") + "\n" +
    "📐 *المقاس:* " + (size || "لم يذكر") + "\n" +
    "-------------------------\n" +
    "📍 *موقع الاستلام:* \n" + (pickup || "لم يحدد") + "\n\n" +
    "📝 *تفاصيل إضافية:* \n" + (details || "لا توجد تفاصيل إضافية");

    let number = "967784471471";

    let url =
    "https://api.whatsapp.com/send?phone=" +
    number +
    "&text=" +
    encodeURIComponent(message);

    window.open(url, "_blank");
}
const slides = document.querySelectorAll(".anime-slide");

let current = 0;

function updateSlider() {

    slides.forEach(slide => {
        slide.classList.remove("left","center","right");
    });

    slides[current].classList.add("center");

    slides[(current + 1) % slides.length].classList.add("right");

    slides[(current - 1 + slides.length) % slides.length].classList.add("left");
}

updateSlider();

setInterval(() => {

    current++;

    if(current >= slides.length){
        current = 0;
    }

    updateSlider();

}, 3000);
const portfolioCards =
document.querySelectorAll(".portfolio-card");

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

});

portfolioCards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(80px)";
card.style.transition=".8s";

observer.observe(card);

});
/* =========================
   سلايدر الأعمال السابقة
========================= */

const portfolioImages = {

    0: [ // مواليد
        "images/مواليد (1).JPG",
        "images/مواليد (2).JPG",
        "images/مواليد (3).JPG",
        "images/مواليد (4).JPG",
        "images/مواليد (5).JPG",
        "images/مواليد (6).JPG",
        "images/مواليد (7).JPG",
        "images/مواليد (8).JPG",
        "images/مواليد (9).JPG"
    ],

    1: [ // شركات
        "images/شركات (1).JPG",
        "images/شركات (2).JPG",
        "images/شركات (3).JPG",
        "images/شركات (4).JPG",
        "images/شركات (5).JPG",
        "images/شركات (6).JPG"
    ],

    2: [ // تيشيرت وهودي
        "images/تيشيرت وهودي (1).JPG",
        "images/تيشيرت وهودي (2).JPG",
        "images/تيشيرت وهودي (3).JPG",
        "images/تيشيرت وهودي (4).JPG",
        "images/تيشيرت وهودي (5).JPG",
        "images/تيشيرت وهودي (6).JPG",
        "images/تيشيرت وهودي (7).JPG",
        "images/تيشيرت وهودي (8).JPG"
    ],

    3: [ // كابات
        "images/كابات (1).JPG",
        "images/كابات (2).JPG",
        "images/كابات (3).JPG",
        "images/كابات (4).JPG",
        "images/كابات (5).JPG",
        "images/كابات (6).JPG",
        "images/كابات (7).JPG",
        "images/كابات (8).JPG",
        "images/كابات (9).JPG"
       
    ]

};

document.querySelectorAll(".portfolio-card").forEach((card, index) => {

    const img = card.querySelector("img");

    if (!portfolioImages[index]) return;

    let current = 0;

    setInterval(() => {

        current++;

        if (current >= portfolioImages[index].length) {
            current = 0;
        }

        img.src = portfolioImages[index][current];

    }, 3000);

});


updateSummary();