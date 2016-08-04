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
    this.serviceDesription;
    this.servicePrice;
    this.warrantyName;
    this.warrantyDescription;
    this.warrantyPrice;
    this.total;

    this.getPrice = function() {
        var accessoriestotal = 0;
        if(this.accessories.length){
            _.each(this.accessories, function(accessory){
                accessoriestotal = accessoriestotal + accessory.price;
            })

        }
        return (this.variantPrice || 0) + (this.interiorColorPrice || 0) + (this.exteriorColorPrice || 0) + (accessoriestotal) + (this.warrantyPrice || 0) + (this.servicePrice || 0);
    }

    this.setValue = function(attr, value) {
        this[attr] = value;
        this.total = this.getPrice();
    }
}
