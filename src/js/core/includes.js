import $ from 'jquery';

//Create a list of callbacks to be called when the html is loaded
const callbacksList = [];
//The function to add a callback to the list
export function addCallback(callback) {
    if(!callbacksList.includes(callback)) {
        callbacksList.push(callback);
    }
}

//Load all includes
function loadIncludes(parent) {
    if (!parent) {
        parent = $('body');
    }

    $(parent).find('[wm-include]').each(function(i, el) {
        const url = $(el).attr('wm-include');

        $.ajax({
            url,
            success(data) {
                $(el).html(data);
                $(el).removeAttr('wm-include');

                callbacksList.forEach(callback => {
                    callback(data);
                });
                loadIncludes(el);
            }
        })
    });
}
loadIncludes();