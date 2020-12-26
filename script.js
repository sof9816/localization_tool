function add(keyStd = null) {
  let enTxt = document.getElementById("EnglishText");
  let arTxt = document.getElementById("ArabicText");
  if (enTxt.value == "" || arTxt.value == "") {
    return;
  }
  let ext = ",\n";
  document.getElementById("English").value += enTxt.value + ext;
  document.getElementById("Keys").value += enTxt.value.substring(0, 5) + ext;
  document.getElementById("Arabic").value += arTxt.value + ext;

  document.getElementById("EnglishText").value = "";
  document.getElementById("ArabicText").value = "";
}

function clear() {
  document.getElementById("EnglishText").value = "";
  document.getElementById("ArabicText").value = "";
  document.getElementById("English").value = "";
  document.getElementById("Keys").value = "";
  document.getElementById("Arabic").value = "";
  document.getElementById("LocalizeEn").value = "";
  document.getElementById("LocalizeAr").value = "";
  document.getElementById("localize").style.height = "0";
  document.getElementById("localize").style.opacity = "0";
}

function exportFun() {
  let en = document.getElementById("English").value;
  let keys = document.getElementById("Keys").value;
  let ar = document.getElementById("Arabic").value;
  let type = document.getElementById("select").value.toLowerCase();

  let iosEnString = "";
  let iosArString = "";

  let androidEnString = "";
  let androidArString = "";

  let webEnString = "";
  let webArString = "";
  let words = keys.split(",\n").length;

  for (let index = 0; index < words - 1; index++) {
    const english = en.split(",\n")[index];
    const key = keys.split(",\n")[index];
    const arabic = ar.split(",\n")[index];

    iosEnString += `"${key}" = "${english}";` + "\n";
    iosArString += `"${key}" = "${arabic}";` + "\n";

    androidEnString += `<string name="${key}">${english}</string>` + "\n";
    androidArString += `<string name="${key}">${arabic}</string>` + "\n";

    webEnString += `"${key}": "${english}",` + "\n";
    webArString += `"${key}": "${arabic}",` + "\n";
  }
  switch (type) {
    case "ios":
      document.getElementById("LocalizeEn").value = iosEnString;
      document.getElementById("LocalizeAr").value = iosArString;
      break;
    case "android":
      document.getElementById("LocalizeEn").value = androidEnString;
      document.getElementById("LocalizeAr").value = androidArString;
      break;
    default:
      document.getElementById("LocalizeEn").value = webEnString;
      document.getElementById("LocalizeAr").value = webArString;
      break;
  }
  document.getElementById("localize").style.height = "400px";
  document.getElementById("localize").style.opacity = "1";
}
//
function copyToClipboard(id) {
  const el = document.createElement("textarea");
  el.value = document.getElementById(id).value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

document.getElementById("clearInput").addEventListener("click", clear);
document.getElementById("addInput").addEventListener("click", add);
document.getElementById("exportInput").addEventListener("click", exportFun);

document
  .getElementById("LocalizeEn")
  .addEventListener("click", () => copyToClipboard("LocalizeEn"));
document
  .getElementById("LocalizeAr")
  .addEventListener("click", () => copyToClipboard("LocalizeAr"));

// Possible Key STD:
// Letter count
// First word
// First letter of each word
