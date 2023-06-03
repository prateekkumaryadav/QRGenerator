const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const fosrm = document

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;

    // console.log(url,size);
    if(url == ""){
        alert("Please enter a URL");
    }else if(size == 0){
        alert("Please select a Size");
    }else if(color == "none"){
        alert("Please select a Color");
    }else{
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size, color);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            },40)
        },1400);
    }
};

const generateQRCode = (url, size, color) =>{
    const qrcode = new QRCode('qrcode',{
        text:url,
        width: size,
        height: size,
        colorDark : color,
    });
};

const showSpinner = () =>{
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () =>{
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-800 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = "Save Image";
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);