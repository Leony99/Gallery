import $ from 'jquery';
import {addCallback} from '../core/includes';

//Filter the images by the selected city button
function filterByCity(city) {
    $('[wm-city]').each(function() {
        if ($(this).attr('wm-city') === city || city === 'null') {
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(500);
        } else {
            $(this).fadeOut(0, () => {
                $(this).parent().addClass('d-none');
            });
        }
    });
}

//Function to create the buttons
function cityButtons(element) {
    //Add each city to a set(to not create duplicates)
    const cities = new Set;
    $('[wm-city]').each(function(i, el) {
        cities.add($(el).attr('wm-city'));
    });

    //Create an array of buttons for each city
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-primary', 'rounded-pill', 'px-3']).html(city);
        btn.on('click', (e) => {
            $('.btn.active').removeClass('active');
            $(e.target).addClass('active');
            filterByCity(city);
        });
        return btn;
    });

    //Create a button to show all cities and add it to the array
    const btnAll = $('<button>').addClass(['btn', 'btn-primary','rounded-pill', 'px-3', 'active']).html('All');
    btnAll.on('click', (e) => {
        $('.btn.active').removeClass('active');
        $(e.target).addClass('active');
        filterByCity('null');
    });
    btns.unshift(btnAll);

    //Add the buttons to the element
    $(element).html(btns);

    return element;
};

addCallback(() => {
    cityButtons($('[wm-city-buttons]'));
});