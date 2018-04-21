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
    var sort_label;
    var bubbleSortID;
    var submit_count = 0;
    var last_index;

    var item_array = []
    item_array = getRandomArray();
    last_index = item_array.length - 2

    document.addEventListener('DOMContentLoaded', init, false);
    
    function init(){
        var canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        var form = document.querySelector('form')
        form.addEventListener('submit', function(){initializeSort(last_index, event, submit_count);}, false);
        // Initialize a list of bar objects and then get their corresponding x and y values, 
        // then push them onto the list. 


      
        console.log(item_array);
       drawInitialArrayID = window.setInterval(drawInitialArray, 33);
       sort_label = document.querySelector('#sort_label');

       // Themes
       var light_theme_button = document.querySelector('#light_theme');
       var dark_theme_button = document.querySelector('#dark_theme');
       light_theme_button.addEventListener('click', function(){changeTheme("light")}, false);
       dark_theme_button.addEventListener('click', function(){changeTheme("dark")}, false);

        var refresh_button = document.querySelector('#refresh');
        refresh_button.addEventListener('click', reload, false)
    }
    function initializeSort(last_index, event, submit_count){
        event.preventDefault();
        var sort_type = document.querySelector('#sort_type');
        sort_type_value = sort_type.value
        console.log(sort_type_value);
        console.log(last_index)

        if (sort_type_value === "bubble_sort"){
            sort_label.innerHTML = "Bubble Sort"
            clearInterval(drawInitialArrayID);
            if (submit_count > 0){
                submit_count += 1;
                console.log("checking if submit count is bigger than zero" + submit_count)
                clearInterval(bubbleSortID);
                drawInitialArrayID = window.setInterval(drawInitialArray, 33);
                for (var i = 0; i < item_array.length - 1; i += 1){
                    bubbleSortID = window.setInterval(function(){bubbleSort(last_index)}, 600);
                }
            }
            else{
                submit_count += 1;
                console.log("checking if submit count is equal to zero" + submit_count)
                bubbleSortID = window.setInterval(function(){bubbleSort(last_index)}, 100);

            }
        }
        // else if (sort_type_value === "selection_sort"){
        //     sort_label.innerHTML = "Selection Sort"
        //     clearInterval(drawInitialArrayID);
        //     // window.setInterval(selectionSort, 30);

        //     clearInterval(drawInitialArrayID);
        //     if (submit_count > 0){
        //         submit_count += 1;
        //         console.log("checking if submit count is bigger than zero" + submit_count)
        //         clearInterval(bubbleSortID);
        //         drawInitialArrayID = window.setInterval(drawInitialArray, 33);
        //         bubbleSortID = window.setInterval(function(){bubbleSort(last_index)}, 1000);
        //     }
        //     else{
        //         submit_count += 1;
        //         console.log("checking if submit count is equal to zero" + submit_count)
        //         for (var i = 0; i < item_array.length; i += 1){
        //             bubbleSortID = window.setTimeout(bubbleSort, 1000);
        //             window.setTimeout(timeSleep, 2000);
        //         }
        //     }
        // }

    }

    function getRandomArray(){
        item_array = []
        for (var i = 0; i < 35; i += 1){
            var item = {
                x: x + 20,
                y: 400,
                length: getRandomNumber(2, 360),
                color: "black",
                soundfile: "01.mp3"
            }
            x = x + 20;
            item_array.push(item);
            
        }
        for (var i = 0; i < 35; i += 1){
            var item = item_array[i];
            var colorAndSoundfile = getColor(item.length);
            item.color = colorAndSoundfile[1]
            item.soundfile = colorAndSoundfile[0]
            
        }

        return item_array;
    }
    function drawInitialArray(){
        context.clearRect(0, 0, width, height);
        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = item_array[i].color;
            context.lineWidth = 30;
            context.beginPath();
            context.moveTo(item_array[i].x, item_array[i].y);
            var endpoint = item_array[i].y - item_array[i].length;
            context.lineTo(item_array[i].x, endpoint);
            context.stroke();
        }
    }

    function bubbleSort(last_index){
        console.log("lastindex at start of function for bubblesort is " + last_index)
        context.clearRect(0, 0, width, height);
        last_index = last_index - 1
        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = item_array[i].color;
            context.lineWidth = 30;
            context.beginPath();
            context.moveTo(item_array[i].x, item_array[i].y);
            var endpoint = item_array[i].y - item_array[i].length;
            context.lineTo(item_array[i].x, endpoint);
            context.stroke();
        }
                    
            

        current_item_index = current_item_index + 1;
        console.log("current item index" + current_item_index)




        context.strokeStyle = "white";
        context.lineWidth = 30;
        context.moveTo(item_array[current_item_index].x, item_array[current_item_index].y);
        var endpoint = item_array[current_item_index].y - item_array[current_item_index].length;
        context.lineTo(item_array[current_item_index].x, endpoint);
        context.stroke();
        if (current_item_index < last_index){


            next_item_index = current_item_index + 1;
                                // AUDIO 
                                // var acontext = new AudioContext();

                                // var o = acontext.createOscillator();
                    
                                // o.type = "sine";
                                // var frequency = item_array[next_item_index].length + 200;
                                // console.log("freq" + frequency)
                                // o.frequency.value = frequency
                                // o.connect(acontext.destination)
                                // o.start()
                                // o.stop(acontext.currentTime + 0.047)
                                // console.log("Playing sound")
                                
                                var soundfile = item_array[next_item_index].soundfile;
                                var soundfile_url = "FX/" + soundfile
                                var audio = new Audio(soundfile_url);
                                console.log("Playing the sound FKT" + soundfile_url)
                                audio.play();

            if (item_array[next_item_index].length < item_array[current_item_index].length){
                var temp = item_array[next_item_index].length
                item_array[next_item_index].length = item_array[current_item_index].length;
                item_array[current_item_index].length = temp;

                var temp_color = item_array[next_item_index].color
                item_array[next_item_index].color = item_array[current_item_index].color;
                item_array[current_item_index].color = temp_color;
                last_index = last_index - 1
                console.log(last_index)

                var temp_soundfile = item_array[next_item_index].soundfile
                item_array[next_item_index].soundfile = item_array[current_item_index].soundfile;
                item_array[current_item_index].soundfile = temp_soundfile;

            }

        }
        else if (iteration < item_array.length - 2){
            iteration += 1;
            current_item_index = 0;
            next_item_index = 0;
            console.log("iterator called.")
            console.log(item_array)
            last_index = last_index - 1
            console.log(last_index)
            window.setTimeout(function(){timeSleep}, 20000)
        }
        else {
            last_index = last_index - 1
        }

        window.setTimeout(function(){timeSleep}, 20000)

    }


    function iterateArray(){
        for (var i = 0; i < item_array.length - 1; i += 1){
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 12;
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

    function getColor(length){
        var color;
        var soundfile;
        console.log("Length is" + length);
        if (length < 30){
            color = "darkred";
            soundfile = "100HZ.wav"
        }
        else if (length < 45){
            color = "firebrick";
            soundfile = "120HZ.wav"
        }
        else if (length < 60){
            color = "red";
            soundfile = "135HZ.wav"

        }
        else if (length < 75){
            color = "orangered";
            soundfile = "150HZ.wav"
        }
        else if (length < 90){
            color = "darkorange";
            soundfile = "170HZ.wav"

        }
        else if (length < 105){
            color = "coral";
            soundfile = "185HZ.wav"

        }
        else if (length < 120){
            color = "orange";
            soundfile = "200HZ.wav"

        }
        else if (length < 135){
            color = "gold";
            soundfile = "230HZ.wav"

        }
        else if (length < 150){
            color = "yellow";
            soundfile = "260HZ.wav"

        }
        else if (length < 165){
            color = "greenyellow";
            soundfile = "290HZ.wav"

        }
        else if (length < 180){
            color = "chartreuse"
            soundfile = "320HZ.wav"

        }
        else if (length < 195){
            color = "limegreen"
            soundfile = "350HZ.wav"

        }
        else if (length < 210){
            color = "lawngreen"
            soundfile = "380HZ.wav"

        }
        else if (length < 225){
            color = "mediumspringgreen"
            soundfile = "410HZ.wav"

        }
        else if (length < 240){
            color = "mediumseagreen"
            soundfile = "440HZ.wav"

        }
        else if (length < 255){
            color = "blue"
            soundfile = "450HZ.wav"

        }
        else if (length < 265){
            color = "dodgerblue"
            soundfile = "460HZ.wav"

        }
        else if (length < 275){
            color = "deepskyblue"
            soundfile = "480HZ.wav"

        }
        else if (length < 285){
            color = "hotpink"
            soundfile = "490HZ.wav"

        }
        else if (length < 300){
            color = "magenta"
            soundfile = "510HZ.wav"

        }
        else if (length < 330){
            color = "violet"
            soundfile = "520HZ.wav"

        }
        else if (length < 345){
            color = "slateblue"
            soundfile = "540HZ.wav"

        }
        else if (length < 360){
            color = "blueviolet"
            soundfile = "550HZ.wav"

        }

        var colors = ['red', 'yellow', 'orange', 'lightcoral', 'orangered', 'green', 'blue', 'hotpink', 'blue'];
        console.log(color, soundfile)
        // var randomNumber = getRandomNumber(0, colors.length - 1);
        // var randomColor = colors[randomNumber];
        return [soundfile, color]
    }
    // if (length < 30){
    //     color = "darkred";
    //     soundfile = "261.63HZ.wav"
    // }
    // else if (length < 45){
    //     color = "firebrick";
    //     soundfile = "277.18HZ.wav"
    // }
    // else if (length < 60){
    //     color = "red";
    //     soundfile = "293.66HZ.wav"

    // }
    // else if (length < 75){
    //     color = "orangered";
    //     soundfile = "311.13HZ.wav"
    // }
    // else if (length < 90){
    //     color = "darkorange";
    //     soundfile = "329.63HZ.wav"

    // }
    // else if (length < 105){
    //     color = "coral";
    //     soundfile = "349.23.wav"

    // }
    // else if (length < 120){
    //     color = "orange";
    //     soundfile = "369.99.wav"

    // }
    // else if (length < 135){
    //     color = "gold";
    //     soundfile = "392HZ.wav"

    // }
    // else if (length < 150){
    //     color = "yellow";
    //     soundfile = "415.3HZ.wav"

    // }
    // else if (length < 165){
    //     color = "greenyellow";
    //     soundfile = "440.00HZ.wav"

    // }
    // else if (length < 180){
    //     color = "chartreuse"
    //     soundfile = "466.16HZ.wav"

    // }
    // else if (length < 195){
    //     color = "limegreen"
    //     soundfile = "493.88HZ.wav"

    // }
    // else if (length < 210){
    //     color = "lawngreen"
    //     soundfile = "523.25HZ.wav"

    // }
    // else if (length < 225){
    //     color = "mediumspringgreen"
    //     soundfile = "HZ.wav"

    // }
    // else if (length < 240){
    //     color = "mediumseagreen"
    //     soundfile = "440HZ.wav"

    // }
    // else if (length < 255){
    //     color = "blue"
    //     soundfile = "450HZ.wav"

    // }
    // else if (length < 265){
    //     color = "dodgerblue"
    //     soundfile = "460HZ.wav"

    // }
    // else if (length < 275){
    //     color = "deepskyblue"
    //     soundfile = "480HZ.wav"

    // }
    // else if (length < 285){
    //     color = "hotpink"
    //     soundfile = "490HZ.wav"

    // }
    // else if (length < 300){
    //     color = "magenta"
    //     soundfile = "510HZ.wav"

    // }
    // else if (length < 330){
    //     color = "violet"
    //     soundfile = "520HZ.wav"

    // }
    // else if (length < 345){
    //     color = "slateblue"
    //     soundfile = "540HZ.wav"

    // }
    // else if (length < 360){
    //     color = "blueviolet"
    //     soundfile = "550HZ.wav"

    // }
    


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function timeSleep() {
        console.log('Taking a break...');
        await sleep(2000);
        console.log('Two second later');
      }

    function changeTheme(theme){
        console.log("changeTheme caled")
        var html_element = document.querySelector('html');
        var nav_element = document.querySelector('nav');
        var logo_element = document.querySelectorAll('.logo');
        var canvas_element = document.querySelectorAll('canvas');

        if (theme === "dark"){
            html_element.style.backgroundColor = "black"
            html_element.style.color = "white"
            nav_element.style.color = "white"
            logo_element.style.color = "white"
            canvas_element.style.borderColor = "white"

        }

        if (theme === "light"){
            html_element.style.backgroundColor = "white"
            html_element.style.color = "black"
            body_element.style.color = "black"
            nav_element.style.color = "black"
            logo_element.style.color = "green"
        }
    }

    function reload(){
        location.reload();
    }


})();