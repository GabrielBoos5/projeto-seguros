angular.module('seguro').controller("PropostaController", function($scope, $routeParams, $location){
    
    if (!$routeParams.propostaId) $location.path("/lista")


    const propostaStore = new storage("propostas")
    $scope.proposta = propostaStore.getObject("n_proposta" ,$routeParams.propostaId )
    $scope.proposta.valorpago = 0.05 * $scope.proposta.risco
    $scope.proposta.iniciovigencia = new Date($scope.proposta.iniciovigencia);
    $scope.proposta.terminovigencia = new Date($scope.proposta.terminovigencia);
    
    $scope.elaborarApolice = function(){
    
    if(verificaSeJaPossuiApolice()){
        $location.path("/apolice/" + verificaSeJaPossuiApolice().n_apolice)
    } else {
    const novaApolice = angular.copy($scope.proposta)
    novaApolice.n_apolice = $scope.proposta.n_proposta;
    delete novaApolice.n_proposta
    var apoliceStore = new storage("apolices")
    apoliceStore.insertObject(novaApolice)
    $location.path("/apolice/" + novaApolice.n_apolice)
    }
    }    
    
    function verificaSeJaPossuiApolice (){
        const inventory = JSON.parse(localStorage.getItem("apolices"))
        const result = inventory.find(({ n_apolice }) => n_apolice == $routeParams.propostaId) ;        
        return result
      }
})