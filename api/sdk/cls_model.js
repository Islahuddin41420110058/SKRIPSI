const tf = require('@tensorflow/tfjs-node');

function normalized(data){ 
    S = (data[0] - 29.5) / 4.610176932
    K = (data[1] - 359.5449438) / 93.43143058
    O = (data[2] - 0.364641854) / 0.481371845
    L = (data[3] - 0.5625) / 0.496121923
    
    return [S, K, O, L]
}

const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]). reduce(compareFn)[1]
const argMax = argFact((min, el) => (el[0] > min[0] ? el : min ))

function ArgMax(res){
    label = "POMPA OFF"
    cls_data = []
    for(i=0; i<res.length; i++){
        cls_data[i] = res[i]
    }
    console.log(cls_data, argMax(cls_data));
    
    if(argMax(cls_data) == 1){
      label = "POMPA ON" 
    }if(argMax(cls_data) == 0){
        label = "KIPAS ON"
    return label
}
    

async function classify(data){
    let in_dim = 4; // 
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Islahuddin41420110058/SKRIPSI/main/public/cls_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return ArgMax( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    classify: classify 
}
  
