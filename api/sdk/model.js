const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    S = (data[0] - 29.5) / 4.610176932
    K = (data[1] - 359.5449438) / 93.43143058
    return [S, K]
}

function denormalized(data){
    O = (data[0] * 0.481371845) + 0.364641854
    L = (data[1] * 0.496121923) + 0.5625
    return [O, L]
}


async function predict(data){
    let in_dim = 2;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Islahuddin41420110058/BISMILLAH-1-BISA/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
