var VehicleConfiguration = function() {
    this.variantStyleId;
    this.variantName;
    this.variantPrice;
    this.interiorName;
    this.interiorPrice;
    this.exteriorName;
    this.exteriorPrice;
    this.package;
    this.accessories = [];
    this.serviceName;
    this.servicePrice;
    this.warrantyName;
    this.warrantyPrice;

    this.getPrice = function() {
        return this.variantPrice || 0 + this.interiorPrice || 0 + this.interiorPrice || 0 + this.exteriorPrice || 0;
    }
}
