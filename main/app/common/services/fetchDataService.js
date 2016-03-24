'use strict';
angular.module('share.ws.demo')
    .factory('FetchDataService',function() {
        function _extractTraduction(data){
            console.log(data.header.columnsHeader);
            var i = 0;
            var trads ={};
            angular.forEach(data.header.columnsHeader,function(column){

                trads[column.code] = column.desc;
                i++
            });
            return trads;
        }

        function _extractValues(data){
            var documents = [];
            console.log(data);
            data.documents.forEach(function(document){
                var newDocument =  {};
                newDocument.docIdxGed = document.docIdxGed;
                var i = 0;
                angular.forEach(document.fields,function(field){
                    newDocument[data.header.columnsHeader[i].code] = field.translation ? field.translation : field.value ;
                    i++;
                });
                documents.push(newDocument);
            });
            return documents;
        }

        return {
            extractTraduction:_extractTraduction,
            extractValues:_extractValues
        }


    });