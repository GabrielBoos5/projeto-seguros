angular.module('seguro').controller("ApoliceController", function($scope, $routeParams, $location){
    
    if (!$routeParams.apoliceId) $location.path("/lista")


    const apoliceStore = new storage("apolices")
    $scope.apolice = apoliceStore.getObject("n_apolice" ,$routeParams.apoliceId )
    $scope.apolice.valorpago = 0.05 * $scope.apolice.risco
    $scope.apolice.iniciovigencia = new Date($scope.apolice.iniciovigencia);
    $scope.apolice.terminovigencia = new Date($scope.apolice.terminovigencia);

    const listaApolice = new storage("apolices")
    $scope.apolices = listaApolice.listObjects()
 
       
})