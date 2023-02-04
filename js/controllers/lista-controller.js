angular.module('seguro').controller("ListaController", function($scope){
    $scope.filtro = '';
    $scope.mensagem = '';

    const lista = new storage("cotacoes");
    $scope.cotacoes = lista.listObjects()
    
    const listaProposta = new storage("propostas")
    $scope.propostas = listaProposta.listObjects()

    const listaApolice = new storage("apolices")
    $scope.apolices = listaApolice.listObjects()
    
   
    
    $scope.remover = function(cotacao){
        lista.removeObjectFromArray(cotacao, $scope.cotacoes)
        listaProposta.removeObjectFromArray(cotacao, $scope.propostas)
        listaApolice.removeObjectFromArray(cotacao, $scope.apolices)
        $scope.mensagem = "A cotação foi deletada com sucesso"

    }

})