angular.module('mc-dashboard').filter('searchProductFilter', function() {
    return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);
            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (prop === 'properties'){
                        for (var key in item[''+prop]) {
                            if (JSON.stringify(item.properties[key]).toLowerCase().indexOf(text)!==-1){
                                itemMatches = true;
                                break
                            }

                        }
                    }
                    else if( prop === 'categories'){
                        var category = item.category.id;
                        var obj = item.category;
                        while(true){
                            if (JSON.stringify(category).toLowerCase().indexOf(text)!==-1){
                                itemMatches = true;
                                break;
                            }
                            obj = obj.father;
                            if (obj){
                                category = obj.id;
                            }
                            else
                                break;
                        }
                    }
                    else{
                        if (!itemMatches && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});