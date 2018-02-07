console.log('chatbot script start');



function MessageCall() {
    console.log('ajax call');
    $.ajax({
        type: 'POST',
        cache: false,
        url: 'http://localhost:3000/message',
        data: createData(),
        headers:{"Content-Type":"application/json"},
        beforeSend: function () {
            $(this).html("Loading...");
        },
        success: function (data) {
            // Now lets return
            var msg =  jQuery.parseJSON(JSON.stringify(data));
           // console.dir(msg.messame.text);

            var d = new Date();
            var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

            var el = '';
            el += '<div class="answer_sec">';
            el += ' <div class="chat-con">';
            el += '     <div><a href="" class="profile_img"><img src="https://scontent-icn1-1.xx.fbcdn.net/v/t31.0-8/11222317_1623286951252223_1277740655362769123_o.jpg?oh=764951e472ce95cf972bdcb892fe642e&oe=5ADBEA3C" alt=""></div></a>';
            el += '     <p>'+msg.message+'</p>';
            el += '     <span>'+n+'</span>';
            el += ' </div>';
            el += '</div>';
            $('.chat-conversation').append(el);
        },
        error: function(html, status) {
            console.log(html.responseText);
            console.log(status);
        }
    });
}

function createData() {
    var msg = $('#messageIpt').val();
    var sendData = JSON.stringify({content:msg});
    console.log('입력 메세지 : ', sendData);
    var sendmsg = $('#messageIpt').val()
    var d = new Date();
    var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

    //question 입력
    var el = '';
    el += '<div class="question_sec">';
    el += ' <div class="chat-con">';
    el += '     <span>'+n+'</span>';
    el += '     <p>'+msg+'</p>';
    el += '     <div><a href="" class="profile_img"><img src="https://scontent-icn1-1.xx.fbcdn.net/v/t31.0-8/11222317_1623286951252223_1277740655362769123_o.jpg?oh=764951e472ce95cf972bdcb892fe642e&oe=5ADBEA3C" alt=""></div></a>';
    el += ' </div>';
    el += '</div>';
    $('.chat-conversation').append(el);
    $('#messageIpt').val('').focus();
    return sendData;
}

$('#messageIpt').on('keydown', function(e) {
    console.log(e.keyCode)
    if (e.keyCode == 13) {
        MessageCall();
    }
});