(function() {
    var canvas;
    var context;
    var width;
    var height;
    var x = 0;
    var y = 250;
    var size = 10;
    var current_item_index = -1;
    var next_item_index = -1;
    var iteration = 0;
    var drawInitialArrayID;
    var acontext = new AudioContext();
    var sort_label;


    var item_array = []
    document.addEventListener('DOMContentLoaded', init, false);
    
    function init(){
        var canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        var form = document.querySelector('form')
        form.addEventListener('submit', function(){initializeSort(event);}, false);
        // Initialize a list of bar objects and then get their corresponding x and y values, 
        // then push them onto the list. 

        for (var i = 0; i < 35; i += 1){
            var item = {
                x: x + 20,
                y: 200,
                length: getRandomNumber(2, 100),
                color: getRandomColor()
            }
            x = x + 20;
            item_array.push(item);
            
        }
        console.log(item_array);
       var drawInitialArrayID = window.setInterval(drawInitialArray, 33);
       sort_label = document.querySelector('#sort_label');

    }
    function drawInitialArray(){
        context.clearRect(0, 0, width, height);
        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = item_array[i].color;
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(item_array[i].x, item_array[i].y);
            var endpoint = item_array[i].y - item_array[i].length;
            context.lineTo(item_array[i].x, endpoint);
            context.stroke();
        }
    }

    function initializeSort(event){
        event.preventDefault();
        var sort_type = document.querySelector('#sort_type');
        sort_type_value = sort_type.value
        console.log(sort_type_value);
        if (sort_type_value === "bubble_sort"){
            clearInterval(drawInitialArrayID);
            window.setInterval(draw, 300);
        }
        else if (sort_type_value === "selection_sort"){
            clearInterval(drawInitialArrayID);
            window.setInterval(draw, 300);
        }

    }



    function draw(){
        context.clearRect(0, 0, width, height);

        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = item_array[i].color;
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(item_array[i].x, item_array[i].y);
            var endpoint = item_array[i].y - item_array[i].length;
            context.lineTo(item_array[i].x, endpoint);
            context.stroke();
        }

        if (current_item_index < item_array.length - 2){
            current_item_index = current_item_index + 1;
            context.strokeStyle = "black";
            context.lineWidth = 4;
            context.moveTo(item_array[current_item_index].x, item_array[current_item_index].y);
            var endpoint = item_array[current_item_index].y - item_array[current_item_index].length;
            context.lineTo(item_array[current_item_index].x, endpoint);
            context.stroke();
            
            // AUDIO 
            var o = acontext.createOscillator()

            o.type = "sawtooth"
            var frequency = item_array[current_item_index].length + 200;
            o.frequency.value = frequency
            o.connect(acontext.destination)
            o.start()

            next_item_index = current_item_index + 1;
            if (item_array[next_item_index].length < item_array[current_item_index].length){
                var temp = item_array[next_item_index].length
                item_array[next_item_index].length = item_array[current_item_index].length;
                item_array[current_item_index].length = temp;

                var temp_color = item_array[next_item_index].color
                item_array[next_item_index].color = item_array[current_item_index].color;
                item_array[current_item_index].color = temp_color;

            }

        }
        else if (iteration < item_array.length - 2){
            iteration += 1;
            current_item_index = 0;
            next_item_index = 0;
            console.log("iterator called.")
            console.log(item_array)

        }
        else {
     
        }



        
    }

    function iterateArray(){
        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 7;
            context.beginPath();
            context.moveTo(item_array[i].x, item_array[i].y);
            var endpoint = item_array[i].y - item_array[i].length;
            context.lineTo(item_array[i].x, endpoint);
            context.stroke();
        }
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor(){
        var colors = ['red', 'yellow', 'orange', 'lightcoral', 'orangered', 'green', 'blue', 'hotpink', 'blue'];

        var randomNumber = getRandomNumber(0, colors.length - 1);
        var randomColor = colors[randomNumber];
        return randomColor
    }


})();