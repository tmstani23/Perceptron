function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}



class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

    }

    feedforward(input_array) {
        
        //Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        //Activation Function
        hidden.map(sigmoid);
        //Generating the output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        //Sending it back to the caller.
        return output.toArray();
    }

    train(inputs, targets) {
        let outputs = this.feedforward(inputs);
        //Convert array to matrix object:
        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);
        //Calculate the error:
        //Error = Targets- Outputs
        let output_errors = Matrix.subtract(targets, outputs);
        
        //Calculate the hidden layer error:
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        // targets.print();
        // outputs.print();
        // error.print();
        // console.log(outputs.data[0]);
        // console.log(targets.data[0]);
        // console.log(error.data[0]);
        
    }
}

   
