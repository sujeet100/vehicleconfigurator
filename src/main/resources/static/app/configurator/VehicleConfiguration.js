var VehicleConfiguration = function() {
    this.variantStyleId;
    this.variantName;
    this.variantPrice;
    this.interiorColorName;
    this.interiorColorPrice;
    this.exteriorColorName;
    this.exteriorColorPrice;
    this.package;
    this.accessories = [];
    this.serviceName;
    this.servicePrice;
    this.warrantyName;
    this.warrantyPrice;
    this.total;

    this.getPrice = function() {
        var accessoriestotal = 0;
        if(this.accessories.length){
            _.each(this.accessories, function(accessory){
                accessoriestotal = accessoriestotal + accessory.price;
                console.log(accessoriestotal);
            })

        }
        return (this.variantPrice || 0) + (this.interiorColorPrice || 0) + (this.exteriorColorPrice || 0) + (accessoriestotal);
    }

    this.setValue = function(attr, value) {
        //console.log(attr);
        //console.log(value);
        //console.log(_.reduce(this.accessories, function(a, b){ return a.price + b.price}));
        this[attr] = value;
        this.total = this.getPrice();
        console.log(this.total);
    }
}
