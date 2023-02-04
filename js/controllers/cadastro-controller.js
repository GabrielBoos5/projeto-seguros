angular.module('seguro').controller("CadastroController", function($scope, $routeParams, $location){
   
var data = new Date();
var dataMais1  = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate() + 1);

$scope.cotacao = {
    iniciovigencia : dataMais1,
    n_cotacao : __getProximoNumero()
};
const cotacoesStore = new storage("cotacoes") 

$scope.cpfErro = false;
$scope.dataErro = false;
$scope.mensagem = '';


$scope.submeter = function(){
    if($routeParams.cotacaoId){
      validaFormularioEditado()
      cotacoesStore.tradeObject(cotacoesStore.listObjects(), $scope.cotacao, cotacoesStore.getObject("n_cotacao" ,$routeParams.cotacaoId))
    } else if(validaFormulario()) {
      $location.path("/lista")
    }
}

$scope.voltar = function(){
    $scope.cotacao.n_cotacao = __getAntigoNumero();
}


$scope.elaborarProposta = function(){
  if($routeParams.cotacaoId){
    if(verificaSePossuiProposta()){ 
      __getAntigoNumero()    
      $location.path("/proposta/" + verificaSePossuiProposta().n_proposta)
    } else {
      validaFormularioEditado()
      __getAntigoNumero()
      const novaProposta = angular.copy($scope.cotacao)
      novaProposta.n_proposta = $scope.cotacao.n_cotacao;
      delete novaProposta.n_cotacao
      var propostaStore = new storage("propostas")
      propostaStore.insertObject(novaProposta)
      $location.path("/proposta/" + novaProposta.n_proposta)
    }    
  } else if(validaFormulario()){
    const novaProposta = angular.copy($scope.cotacao)
    novaProposta.n_proposta = $scope.cotacao.n_cotacao;
    delete novaProposta.n_cotacao
    var propostaStore = new storage("propostas")
    propostaStore.insertObject(novaProposta)
    $location.path("/proposta/" + novaProposta.n_proposta)
  }
}


function validaFormulario (){
  let valido = false ;

  if($scope.formulario.$valid){
   
    if (validaCPF($scope.cotacao.cpf) ) { 
        console.log("CPF repetido");
        $scope.cpfErro = true;

      } else if(validaData($scope.cotacao.terminovigencia, $scope.cotacao.iniciovigencia)){
        console.log("Data Inválida");
        $scope.dataErro = true;
        
     } else {
        cotacoesStore.insertObject($scope.cotacao);
        $scope.formulario.$setUntouched();
        $scope.mensagem = 'A cotação foi cadastrada com sucesso'
        valido = true
       
      }
  } 
  return valido
}

function validaFormularioEditado(){
  let valido = false ;

  if($scope.formulario.$valid){
   
      if(validaData($scope.cotacao.terminovigencia, $scope.cotacao.iniciovigencia)){
        console.log("Data Inválida");
        $scope.dataErro = true;
        
     } else {
      
        $scope.formulario.$setUntouched();
        $scope.mensagem = 'A cotação foi editada com sucesso'
        valido = true
       
      }
  } 
  return valido
}

  if ($routeParams.cotacaoId){
    $scope.cotacao = cotacoesStore.getObject("n_cotacao" ,$routeParams.cotacaoId )
     if($scope.cotacao.iniciovigencia && $scope.cotacao.terminovigencia ){
      $scope.cotacao.iniciovigencia = new Date($scope.cotacao.iniciovigencia);
      $scope.cotacao.terminovigencia = new Date($scope.cotacao.terminovigencia);

     }
     
  } 

  function verificaSePossuiProposta (){
    const inventory = JSON.parse(localStorage.getItem("propostas"))
    const result = inventory.find(({ n_proposta }) => n_proposta == $routeParams.cotacaoId);
    
    return result
  
  }
  
})