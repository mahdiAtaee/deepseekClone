const { detectOne } = require('langdetect');
/**
 * تشخیص اینکه زبان پیام فارسی هست یا نه
 * @param {string} text - متن ورودی کاربر
 * @returns {string} - "fa" یا "en"
 */
function detectLanguage(text: string): "fa" | "en" {
    const langCode = detectOne(text);

    if (langCode === "fas") return "fa";
    else return "en";
}

export default detectLanguage