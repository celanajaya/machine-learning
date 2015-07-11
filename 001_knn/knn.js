
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(arr) {
	this.points = this.points.concat(arr);
};

KNN.prototype._distance = function(arr1, arr2) {
	var vectorSub = arr1.map(function(el, index){
		return arr1[index] - arr2[index];
	})
	return Math.sqrt(vectorSub.reduce(function(prev, cur){
		return prev + cur * cur;
	}, 0));
};

KNN.prototype._distances = function(vector, trainingData){
	var self = this;
	return trainingData.map(function(element){
		return [self._distance(vector, element[0]), element[1]];
	})
};

KNN.prototype._sorted = function(distances){
	return distances.sort(function(first, second){
		return first[0] - second[0];
	}).map(function(element){
		return element[1];
	});
};

KNN.prototype._majority = function(k, sortedCat) {
	var obj = {};
	for (var i = 0; i < k; i++) {
		if (!obj[sortedCat[i]]) obj[sortedCat[i]] = 1;
		else obj[sortedCat[i]]++;
	}
	var greatest = sortedCat[0]
	for (key in obj) {
		if (obj[key] > obj[greatest]){
			greatest = key;
		}
	}
	return Number(greatest);
};

KNN.prototype.predictSingle = function(vector){
	var distances = this._distances(vector, this.points);
	var sortedDistances = this._sorted(distances);
	return this._majority(this.kSize, sortedDistances);
};

KNN.prototype.predict = function(vectorArr){
	var self = this
	return vectorArr.map(function(vector){
		return self.predictSingle(vector);
	});
}

KNN.prototype.score = function(testingData){
	var self = this;
	var count = 0;
	testingData.forEach(function(datum){
		if (datum[1] === self.predictSingle(datum[0])) count++
	});
	return count / testingData.length;
}


module.exports = KNN