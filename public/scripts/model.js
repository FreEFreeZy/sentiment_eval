const uploadInput = document.getElementById("uploadFile");
const validateInput = document.getElementById("validateFile");
const output = document.getElementById("output");
const resultsTable = document.getElementById("resultsTable");
const tableHeader = document.getElementById("tableHeader");
const tableBody = document.getElementById("tableBody");

let fileId = null;
let currentData = null;

// upload
document.getElementById("btnUpload").addEventListener("click", async () => {
  if (!uploadInput.files.length) return alert("Выберите файл!");
  const formData = new FormData();
  formData.append("file", uploadInput.files[0]);

  const res = await fetch("/upload", { method: "POST", body: formData });
  const data = await res.json();
  fileId = data.file_id;
  output.textContent = `Файл загружен`;
  document.getElementById("btnPredict").disabled = false;
  document.getElementById("btnDownload").disabled = false;
});

// predict
document.getElementById("btnPredict").addEventListener("click", async () => {
  if (!fileId) return;
  const res = await fetch(`/predict?file_id=${fileId}`);
  currentData = await res.json();
  output.textContent = JSON.stringify(currentData, null, 2);
  renderTable(currentData.predictions || []);
});

// download
document.getElementById("btnDownload").addEventListener("click", async () => {
  if (!fileId) return;
  const res = await fetch(`/download/${fileId}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileId}.csv`;
  a.click();
  a.remove();
});

// evaluate
document.getElementById("btnEvaluate").addEventListener("click", async () => {
  if (!validateInput.files.length) return alert("Выберите файл!");
  const formData = new FormData();
  formData.append("file", validateInput.files[0]);

  const res = await fetch("/evaluate", { method: "POST", body: formData });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
});

// table render
function renderTable(data) {
  if (!data.length) return resultsTable.style.display = "none";
  resultsTable.style.display = "table";

  tableHeader.innerHTML = "";
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    tableHeader.appendChild(th);
  });

  tableBody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}
