var calls = [];

window.onload = () => {
    var calledNumbers = document.querySelector('.called_numbers table');
    
    // populate table
    for(var i = 0; i < 5; i++) {
        let innerHTML = '';
        for(var j = 0; j < 15; j++) {
            let currentNumber = j + i * 15 + 1;
            innerHTML += `<td class="call"><input type="checkbox" id="call_${currentNumber}"><label for="call_${currentNumber}" class="call_label" data-call="${currentNumber}">${currentNumber}</label></td>`
        }
        calledNumbers.querySelectorAll('tr')[i].innerHTML += innerHTML;
    }

    document.addEventListener('click', (e) => {
        // Call table
        if(e.target.className.match('call_label')) {
            if(e.target.parentElement.className.match('selected')) {
                e.target.parentElement.className = e.target.parentElement.className.replace('selected', '').trim();
                for(var i = 0; i < calls.length; i++) {
                    if(calls[i] == e.target.dataset.call) {
                        calls.splice(i, 1);
                    }
                }
            } else {
                e.target.parentElement.className += ' selected';
                calls.push(e.target.dataset.call);
            }
            updateRecents();
        }

        // Pattern table
        if(e.target.className.match('pattern_tile')) {
            if(e.target.className.match('selected')) {
                e.target.className = e.target.className.replace('selected', '').trim();
            } else {
                e.target.className += ' selected';
            }
        }
    });

    document.addEventListener('keydown', e => {
        if(e.keyCode == 192) {
            document.querySelectorAll('.called_numbers td:not(.header)').forEach(elem => {
                elem.className = elem.className.replace('selected', '').trim();
            });
            calls = [];
            updateRecents();
        }
    });

}

function updateRecents() {
    let recents = document.querySelector('.recent_numbers');
    let current = recents.querySelector('.current_number .call');
    let prev = recents.querySelector('.prev_number .call');

    if(calls[calls.length - 1]) {
        current.innerHTML = getLetter(calls[calls.length - 1]) + calls[calls.length - 1];
    } else {
        current.innerHTML = '';
    }

    if(calls[calls.length - 2]) {
        prev.innerHTML = getLetter(calls[calls.length - 2]) + calls[calls.length - 2];
    } else {
        prev.innerHTML = '';
    }
}

function getLetter(num) {
    if(0 <= num && num <= 15)  return '<strong>B</strong>';
    if(16 <= num && num <= 30) return '<strong>I</strong>';
    if(31 <= num && num <= 45) return '<strong>N</strong>';
    if(46 <= num && num <= 60) return '<strong>G</strong>';
    if(61 <= num && num <= 75) return '<strong>O</strong>';
}