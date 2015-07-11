
//Again, I'll start this off with the very beginning of the constructor function.
function KMeans(options){
	if (options == undefined){options = {};}
	this.minClusterMove = options.minClusterMove || 0.0001;
	this.clusterAttempts = 10;
	this.points = [];
}

KMeans.prototype.train = function(vectors) {
	this.points = this.points.concat(vectors);
};

KMeans.prototype.clusters = function(){
	return
}

KMeans.prototype._distance = function(vector1, vector2) {
	return Math.sqrt(vector1.reduce(
		function(prev, curr, index){
			return prev + Math.pow(vector1[index] - vector2[index], 2) }, 0))
};

KMeans.prototype._max = function(arr, func) {
	return arr.sort(function(prev, curr){
		return func(curr) - func(prev);
	})[0];
};


module.exports = KMeans