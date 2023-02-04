function cpfFormatador() {
  var input = document.getElementById("cpf")
  let inputlength = input.value.length
  
  if( inputlength === 3 || inputlength ===7){
    input.value += '.'
  } else if (inputlength === 11){
    input.value += '-'
  }

}

function getStorageData(key) {
    const data = localStorage.getItem(key);
  
    return JSON.parse(data) || [];
   
  }
  
  function validaCPF(cpf) {
    return getStorageData("cotacoes")
      .find((p) => p.cpf == cpf);
  }